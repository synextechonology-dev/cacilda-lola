"use client";

import { site } from "@/data/site";
import { useAgora } from "@/lib/useAgora";
import { Foto } from "./Foto";
import { Rotulo } from "./Rotulo";
import s from "./UmDia.module.css";

const destino = (d: string) => (d === "almoco" ? "#almoco" : `#grupo-${d}`);
const minutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Régua do dia: da abertura ao fechamento de um dia útil
const dia = site.horario.dias[1]!;
const ABRE = minutos(dia.abre);
const FECHA = minutos(dia.fecha);
const pos = (hhmm: string) => (minutos(hhmm) - ABRE) / (FECHA - ABRE);

export function UmDia() {
  const agora = useAgora();

  return (
    <section id="dia" className={`secao fundo-creme ${s.dia}`} aria-labelledby="titulo-dia">
      <div className="conteiner">
        <header className={s.topo} data-revelar>
          <p className={`rotulo-caixa ${s.kicker}`}>Um dia no bistrô</p>
          <h2 id="titulo-dia" className={`cursiva ${s.titulo}`}>
            Do almoço ao happy hour
          </h2>
          <p className={s.sub}>
            Três momentos, uma casa só. A cozinha acorda com o almoço, a tarde cheira a café e bolo, e o fim do dia
            pede cerveja gelada. Escolha o seu momento. Ou fique para os três.
          </p>
        </header>

        {/* Régua do dia com o ponteiro do "agora" */}
        <div className={s.regua} aria-hidden="true" data-revelar>
          <div className={s.trilho}>
            <span
              className={s.preenchido}
              style={{ transform: `scaleX(${agora?.progresso ?? 0})` }}
            />
            {site.momentos.map((m, i) => (
              <span
                key={m.nome}
                className={`${s.marco} ${agora?.indice === i ? s.marcoAtivo : ""}`}
                style={{ left: `${pos(m.inicio) * 100}%` }}
              >
                <span className={`cursiva ${s.marcoHora}`}>{m.hora.replace(/[[\]]/g, "")}</span>
              </span>
            ))}
            <span className={s.fim} style={{ left: "100%" }}>
              <span className={`cursiva ${s.marcoHora}`}>{dia.fecha.slice(0, 2)}h</span>
            </span>
            {agora?.progresso != null && (
              <span className={s.ponteiro} style={{ left: `${agora.progresso * 100}%` }}>
                <span className={s.ponteiroRotulo}>agora · {agora.relogio}</span>
              </span>
            )}
          </div>
        </div>

        <ol className={s.linha}>
          {site.momentos.map((m, i) => {
            const ativo = agora?.indice === i;
            return (
              <li
                key={m.nome}
                className={`${s.momento} ${ativo ? s.ativo : ""}`}
                data-revelar
                style={{ ["--atraso" as string]: `${i * 0.12}s` }}
              >
                <div className={s.fotoCaixa}>
                  <Rotulo className={s.foto} raio={16} recuo={8} corFilete="var(--creme)">
                    <Foto legenda={m.legendaFoto} src={m.foto || undefined} proporcao="4 / 5" />
                  </Rotulo>
                  <p
                    className={`cursiva ${s.hora}`}
                    {...(m.hora.includes("[") ? { "data-provisorio": "" } : {})}
                  >
                    {m.hora.replace(/[[\]]/g, "")}
                  </p>
                  {ativo && <span className={`rotulo-caixa ${s.selo}`}>Acontecendo agora</span>}
                </div>
                <h3 className={s.nome}>{m.nome}</h3>
                <p className={s.texto}>{m.texto}</p>
                <a className={s.link} href={destino(m.destino)}>
                  Ver no cardápio <span aria-hidden="true">→</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
