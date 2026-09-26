import { site } from "@/data/site";

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

/** Dia da semana e minutos desde a meia-noite no fuso do bistrô. */
function agoraNoBistro(data = new Date()) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: site.horario.fuso,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(data);
  const pega = (t: string) => partes.find((p) => p.type === t)?.value ?? "0";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(pega("weekday"));
  return { dia, minutos: Number(pega("hour")) * 60 + Number(pega("minute")) };
}

const emMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const formataHora = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
};

export type Situacao = {
  aberto: boolean;
  /** Frase curta para a placa: "Fecha às 19h", "Abre amanhã às 11h"... */
  detalhe: string;
};

export function situacaoAgora(data = new Date()): Situacao {
  const { dia, minutos } = agoraNoBistro(data);
  const hoje = site.horario.dias[dia];

  if (hoje && minutos >= emMinutos(hoje.abre) && minutos < emMinutos(hoje.fecha)) {
    return { aberto: true, detalhe: `Fecha às ${formataHora(hoje.fecha)}` };
  }

  if (hoje && minutos < emMinutos(hoje.abre)) {
    return { aberto: false, detalhe: `Abre hoje às ${formataHora(hoje.abre)}` };
  }

  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    const h = site.horario.dias[d];
    if (h) {
      const quando = i === 1 ? "amanhã" : DIAS[d];
      return { aberto: false, detalhe: `Abre ${quando} às ${formataHora(h.abre)}` };
    }
  }
  return { aberto: false, detalhe: "Fechado" };
}

export type MomentoAgora = {
  /** Índice em site.momentos, ou -1 quando a casa está fechada. */
  indice: number;
  /** "15h20", no horário de Brasília. */
  relogio: string;
  /** Posição do "agora" entre a abertura e o fechamento de hoje (0 a 1), ou null se fechado. */
  progresso: number | null;
};

/**
 * Qual dos três momentos do dia (almoço, café, happy hour) está acontecendo agora.
 * Usa site.momentos[].inicio; o último momento vai até o fechamento.
 */
export function momentoAgora(data = new Date()): MomentoAgora {
  const { dia, minutos } = agoraNoBistro(data);
  const hoje = site.horario.dias[dia];
  const relogio = `${Math.floor(minutos / 60)}h${String(minutos % 60).padStart(2, "0")}`;

  if (!hoje) return { indice: -1, relogio, progresso: null };
  const abre = emMinutos(hoje.abre);
  const fecha = emMinutos(hoje.fecha);
  if (minutos < abre || minutos >= fecha) return { indice: -1, relogio, progresso: null };

  let indice = 0;
  site.momentos.forEach((m, i) => {
    if (minutos >= emMinutos(m.inicio)) indice = i;
  });
  return { indice, relogio, progresso: (minutos - abre) / (fecha - abre) };
}
