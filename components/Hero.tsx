import { site } from "@/data/site";
import { Agora } from "./Agora";
import { Estampa } from "./Estampa";
import { Foto } from "./Foto";
import { Placa } from "./Placa";
import { Rotulo } from "./Rotulo";
import { Selo } from "./Selo";
import s from "./Hero.module.css";

/** Cada palavra do título entra em sequência (a animação espera a Entrada terminar). */
const TITULO = ["Entre.", "A", "casa", "é", "de", "vó."];

export function Hero() {
  return (
    <section id="inicio" className={`fundo-verde ${s.hero}`} aria-labelledby="titulo-inicio">
      <Estampa className={s.estampa} linhas={9} colunas={14} />

      <div className={`conteiner ${s.grade}`}>
        <div className={s.texto}>
          <p className={`rotulo-caixa ${s.local} ${s.sobe}`} style={{ ["--d" as string]: "0s" }}>
            <span className={s.soDesktop}>{site.complemento} · </span>Vila Saul · Santa Cruz do Rio Pardo
          </p>
          <h1 id="titulo-inicio" className={`cursiva ${s.titulo}`} aria-label={TITULO.join(" ")}>
            {TITULO.map((p, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`${s.palavra} ${i === 0 ? s.primeira : ""}`}
                style={{ ["--d" as string]: `${0.12 + i * 0.09}s` }}
              >
                {p}
              </span>
            ))}
          </h1>
          <p className={`${s.slogan} ${s.sobe}`} style={{ ["--d" as string]: "0.75s" }}>
            Almoço caprichado, café com o bolo da Vó Lola e cerveja gelada no fim da tarde.{" "}
            <strong>O único bistrô de Santa Cruz que vai do almoço ao happy hour.</strong>
          </p>

          <div className={s.sobe} style={{ ["--d" as string]: "0.9s" }}>
            <Agora />
          </div>

          <div className={`${s.botoes} ${s.sobe}`} style={{ ["--d" as string]: "1s" }}>
            <a href="#cardapio" className="botao botao-laranja">
              Ver o cardápio e pedir
            </a>
            <a href="#visite" className="botao botao-contorno">
              Como chegar
            </a>
          </div>

          <dl className={`${s.info} ${s.sobe}`} style={{ ["--d" as string]: "1.1s" }}>
            <div>
              <dt className="rotulo-caixa">Portas abertas</dt>
              <dd>{site.horario.resumo}</dd>
            </div>
            <div>
              <dt className="rotulo-caixa">Endereço</dt>
              <dd>
                {site.endereco.rua}, {site.endereco.bairro}
              </dd>
            </div>
          </dl>
        </div>

        <div className={s.vitrine}>
          <div className={s.placa}>
            <Placa />
          </div>
          <div className={s.quadro}>
            <Rotulo className={s.moldura} raio={22} recuo={11} corFilete="var(--creme)" espessura={1.5}>
              {/* PREENCHER: a foto mais bonita do salão ou da fachada */}
              <Foto legenda="O salão do bistrô, com as mesas postas" proporcao="4 / 5" tom="escuro" prioridade />
            </Rotulo>
          </div>
          <Selo className={s.selo} />
        </div>
      </div>

      <a href="#dia" className={s.rolar} aria-label="Descer para conhecer o bistrô">
        <span aria-hidden="true" />
      </a>
    </section>
  );
}
