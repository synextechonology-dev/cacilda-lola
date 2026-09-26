import { linkWhatsApp, site } from "@/data/site";
import { Foto } from "./Foto";
import s from "./Salao.module.css";

/** PREENCHER: fotos do espaço. Coloque os arquivos em /public/fotos e preencha "src". */
const FOTOS = [
  { legenda: "Fachada do bistrô", src: "", classe: s.grande },
  { legenda: "O salão com as mesas postas", src: "", classe: "" },
  { legenda: "Balcão e vitrine de doces", src: "", classe: "" },
  { legenda: "Cantinho do café", src: "", classe: "" },
  { legenda: "Detalhe da decoração", src: "", classe: "" },
];

export function Salao() {
  return (
    <section className={`secao fundo-verde ${s.salao}`} aria-labelledby="titulo-salao">
      <div className={`conteiner ${s.grade}`}>
        <header className={s.texto} data-revelar>
          <p className={`rotulo-caixa ${s.kicker}`}>O salão</p>
          <h2 id="titulo-salao" className={`cursiva ${s.titulo}`}>
            Puxe uma cadeira
          </h2>
          <p>
            Mesa posta, luz boa e aquele cheiro de café que faz a conversa render. Aqui dá para almoçar sem pressa,
            abrir o notebook com um cappuccino do lado ou juntar a turma quando o dia termina.
          </p>
          <p>
            A gente fica na {site.endereco.rua}, na {site.endereco.bairro}. A porta abre às 11h e a vitrine já
            está cheia.
          </p>
          <p className={s.provisorio} data-provisorio>
            Vai reunir a turma ou comemorar alguma data?{" "}
            <a href={linkWhatsApp("Olá! Queria combinar uma mesa para um grupo no Cacilda & Lola.")} target="_blank" rel="noopener noreferrer">
              Chama a gente no WhatsApp
            </a>{" "}
            e a gente se prepara para receber vocês.
          </p>
        </header>

        <ul className={s.fotos}>
          {FOTOS.map((f) => (
            <li key={f.legenda} className={f.classe} data-revelar>
              <Foto legenda={f.legenda} src={f.src || undefined} proporcao="auto" tom="escuro" className={s.foto} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
