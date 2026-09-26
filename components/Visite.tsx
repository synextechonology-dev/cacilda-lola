"use client";

import { useEffect, useState } from "react";
import { embedMapa, linkMapa, linkRota, linkWhatsApp, site } from "@/data/site";
import { Rotulo } from "./Rotulo";
import s from "./Visite.module.css";

const SEMANA = [
  { dia: "Segunda", n: 1 },
  { dia: "Terça", n: 2 },
  { dia: "Quarta", n: 3 },
  { dia: "Quinta", n: 4 },
  { dia: "Sexta", n: 5 },
  { dia: "Sábado", n: 6 },
  { dia: "Domingo", n: 0 },
];

const hora = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
};

/** Dia da semana no fuso do bistrô (0 = domingo). */
function diaNoBistro() {
  const curto = new Intl.DateTimeFormat("en-US", { timeZone: site.horario.fuso, weekday: "short" }).format(new Date());
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(curto);
}

export function Visite() {
  const [hoje, setHoje] = useState<number | null>(null);
  useEffect(() => setHoje(diaNoBistro()), []);

  return (
    <section id="visite" className={`secao fundo-salvia ${s.visite}`} aria-labelledby="titulo-visite">
      <div className={`conteiner ${s.grade}`}>
        <div className={s.info} data-revelar>
          <p className={`rotulo-caixa ${s.kicker}`}>Como chegar</p>
          <h2 id="titulo-visite" className={`cursiva ${s.titulo}`}>
            Chegue com fome
          </h2>
          <p className={s.convite}>
            Estamos na Vila Saul, em Santa Cruz do Rio Pardo. Toque em “Traçar rota” e o Google Maps leva você da
            porta de casa até a nossa.
          </p>

          <address className={s.endereco}>
            <strong>{site.endereco.rua}</strong>
            <br />
            {site.endereco.bairro}, {site.endereco.cidade} ({site.endereco.uf})
            <br />
            CEP {site.endereco.cep}
          </address>

          <table className={s.horario}>
            <caption className="visualmente-oculto">Horário de funcionamento</caption>
            <tbody>
              {SEMANA.map(({ dia, n }) => {
                const h = site.horario.dias[n];
                const eHoje = hoje === n;
                return (
                  <tr key={dia} className={eHoje ? s.hoje : ""} aria-current={eHoje ? "date" : undefined}>
                    <th scope="row">
                      {dia}
                      {eHoje && <span className={s.hojeSelo}>hoje</span>}
                    </th>
                    <td>{h ? `${hora(h.abre)} às ${hora(h.fecha)}` : "Fechado"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={s.botoes}>
            <a className="botao botao-laranja" href={linkRota} target="_blank" rel="noopener noreferrer">
              Traçar rota até o bistrô
            </a>
            <a
              className="botao botao-contorno"
              href={linkWhatsApp("Olá! Vim pelo site do Cacilda & Lola.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </a>
            <a className="botao botao-contorno" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>

        <div className={s.mapaCaixa} data-revelar>
          <Rotulo className={s.mapa} raio={20} recuo={10} corFilete="var(--creme)" espessura={1.5}>
            <iframe
              title={`Mapa: ${site.nome} na ${site.endereco.rua}, ${site.endereco.bairro}`}
              src={embedMapa}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Rotulo>
          <a className={s.alfinete} href={linkMapa} target="_blank" rel="noopener noreferrer">
            <span className={`cursiva ${s.alfineteNome}`}>{site.nome}</span>
            <span className={s.alfineteRua}>
              {site.endereco.rua} · {site.endereco.bairro}
            </span>
            <span className={s.alfineteLink}>
              Abrir no Google Maps <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
