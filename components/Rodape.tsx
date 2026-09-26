import { linkWhatsApp, site } from "@/data/site";
import { Estampa } from "./Estampa";
import { Marca } from "./Marca";
import s from "./Rodape.module.css";

export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className={s.rodape}>
      <Estampa className={s.estampa} linhas={2} colunas={40} />

      <div className={`conteiner ${s.chamada}`} data-revelar>
        <p className={`cursiva ${s.chamadaTitulo}`}>Bateu vontade?</p>
        <p className={s.chamadaTexto}>
          Monte seu pedido no cardápio e mande pelo WhatsApp. Ou venha até aqui: tem mesa esperando por você.
        </p>
        <div className={s.chamadaBotoes}>
          <a href="#cardapio" className="botao botao-laranja">
            Montar meu pedido
          </a>
          <a href={linkWhatsApp("Olá! Vim pelo site do Cacilda & Lola.")} className="botao botao-contorno" target="_blank" rel="noopener noreferrer">
            {site.whatsapp.exibicao}
          </a>
        </div>
      </div>

      <div className={`conteiner ${s.miolo}`}>
        <Marca tamanho="0.95rem" />
        <p className={`cursiva ${s.assinatura}`}>{site.assinatura}</p>

        <ul className={s.links}>
          <li>
            <a href="#cardapio">Cardápio</a>
          </li>
          <li>
            <a href="#historia">Nossa história</a>
          </li>
          <li>
            <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              {site.instagram.usuario}
            </a>
          </li>
        </ul>

        <p className={s.pe}>
          © {ano} {site.nome}. {site.endereco.cidade} ({site.endereco.uf}).
          <br />
          <span data-provisorio>
            Site feito pela <a href={site.credito.url}>{site.credito.nome}</a>
          </span>
        </p>
      </div>
    </footer>
  );
}
