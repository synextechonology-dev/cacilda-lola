import { Foto } from "./Foto";
import s from "./Historia.module.css";

/**
 * PREENCHER com a Francine: o texto e as fotos antigas.
 * Os parágrafos entre colchetes são o roteiro do que perguntar.
 */
const ALBUM = [
  { ano: "", legenda: "As duas que dão nome à casa", src: "" },
  { ano: "", legenda: "A cozinha onde as receitas nasceram", src: "" },
  { ano: "", legenda: "Os primeiros dias do bistrô", src: "" },
  { ano: "", legenda: "Portas abertas na Vila Saul", src: "" },
];

export function Historia() {
  return (
    <section id="historia" className={`secao fundo-creme ${s.historia}`} aria-labelledby="titulo-historia">
      <div className={`conteiner ${s.grade}`}>
        <div className={s.texto} data-revelar>
          <p className={`rotulo-caixa ${s.kicker}`}>Nossa história</p>
          <h2 id="titulo-historia" className={`cursiva ${s.titulo}`}>
            Duas receitas, uma casa
          </h2>

          {/* PREENCHER com a Francine: confirmar e completar (quem foram, quando começou). Ver PREENCHER.md */}
          <div className={s.corpo} data-provisorio>
            <p className={s.abre}>
              Todo bistrô tem uma receita que veio antes dele. O nosso tem duas.
            </p>
            <p>
              Cacilda e Lola dão nome à casa e ao que sai da cozinha. Da Vó Cacilda vem o pão caseiro, feito na
              receita tradicional da família: saboroso, fofinho e leve. Da Vó Lola vêm os bolos que ocupam a vitrine
              todos os dias, do Chocolate Supremo ao Merengue de Morango.
            </p>
            <p>
              A Francine juntou essas receitas num endereço só e abriu a porta para Santa Cruz. O resto é o que
              acontece aqui dentro todo dia: gente que vem almoçar, volta para o café e fica até o happy hour.
            </p>
          </div>

          {/* Elemento "filete + recado" do manual */}
          <aside className={s.recado}>
            <span className={s.fio} aria-hidden="true" />
            <p className={`cursiva ${s.recadoFrase}`}>feito com carinho</p>
            <p className={`rotulo-caixa ${s.recadoPe}`}>desde a primeira fornada</p>
          </aside>
        </div>

        <ol className={s.album} aria-label="Álbum de fotos da nossa história">
          {ALBUM.map((f, i) => (
            <li key={i} className={s.retrato} data-revelar style={{ ["--atraso" as string]: `${i * 0.1}s` }}>
              <figure>
                <div className={s.cantoneiras}>
                  <Foto legenda={f.legenda} src={f.src || undefined} proporcao="4 / 3" />
                </div>
                <figcaption data-provisorio>
                  {f.ano && <span className={`cursiva ${s.ano}`}>{f.ano}</span>}
                  {f.legenda}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
