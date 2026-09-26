"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cardapioGeral } from "@/data/cardapio-geral";
import { cardapioAlmoco } from "@/data/cardapio-almoco";
import type { Cardapio as TCardapio, Escolha, Grupo, Item } from "@/data/tipos";
import { valor } from "@/lib/formato";
import { useComanda } from "./ComandaContexto";
import { Foto } from "./Foto";
import { Rotulo } from "./Rotulo";
import s from "./Cardapio.module.css";

const CARDAPIOS: Record<"geral" | "almoco", TCardapio> = { geral: cardapioGeral, almoco: cardapioAlmoco };

function Preco({ v }: { v: number }) {
  return (
    <span className={s.preco}>
      <small>R$</small>
      {valor(v)}
    </span>
  );
}

function BotaoMais({ rotulo, onClick, expandido }: { rotulo: string; onClick: () => void; expandido?: boolean }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={`${s.mais} ${ok ? s.maisOk : ""}`}
      aria-label={rotulo}
      aria-expanded={expandido}
      onClick={() => {
        onClick();
        if (expandido === undefined) {
          setOk(true);
          setTimeout(() => setOk(false), 1100);
        }
      }}
    >
      <span aria-hidden="true">{ok ? "✓" : "+"}</span>
    </button>
  );
}

function LinhaItem({ item, cardapio }: { item: Item; cardapio: "geral" | "almoco" }) {
  const { adicionar } = useComanda();
  const [escolhendo, setEscolhendo] = useState(false);
  const temOpcao = !!item.opcao;

  const escolher = (e: Escolha) => {
    adicionar(item, cardapio, e);
    setEscolhendo(false);
  };

  return (
    <li className={s.item}>
      <div className={s.linha}>
        <span className={s.nome}>{item.nome}</span>
        <span className={s.pontos} aria-hidden="true" />
        <Preco v={item.preco} />
        <BotaoMais
          rotulo={temOpcao ? `Escolher ${item.opcao!.rotulo.toLowerCase()} de ${item.nome}` : `Adicionar ${item.nome} à comanda`}
          expandido={temOpcao ? escolhendo : undefined}
          onClick={() => (temOpcao ? setEscolhendo((v) => !v) : adicionar(item, cardapio))}
        />
      </div>
      {item.descricao && (
        <p className={s.descricao} {...(item.descricao.includes("[") ? { "data-provisorio": "" } : {})}>
          {item.descricao}
        </p>
      )}
      {temOpcao && escolhendo && (
        <div className={s.escolhas} role="group" aria-label={`${item.opcao!.rotulo} de ${item.nome}`}>
          <span className={s.escolhasRotulo}>{item.opcao!.rotulo}:</span>
          {item.opcao!.escolhas.map((e) => (
            <button key={e.nome} type="button" className={s.escolha} onClick={() => escolher(e)}>
              {e.nome}
              {e.preco !== undefined && e.preco !== item.preco && <span> · R$ {valor(e.preco)}</span>}
            </button>
          ))}
        </div>
      )}
    </li>
  );
}

function Destaques({ grupo, cardapio }: { grupo: Grupo; cardapio: "geral" | "almoco" }) {
  const { adicionar } = useComanda();
  const itens = grupo.secoes.flatMap((sec) => sec.itens.filter((i) => i.destaque)).slice(0, 4);
  if (itens.length === 0) return null;

  return (
    <ul className={s.destaques} aria-label={`Destaques de ${grupo.nome}`}>
      {itens.map((item) => (
        <li key={item.id} className={s.destaque}>
          <Rotulo raio={12} recuo={6} corFilete="var(--creme)">
            <Foto legenda={item.nome} src={item.foto} proporcao="1 / 1" />
          </Rotulo>
          <div className={s.destaqueInfo}>
            <span className={s.destaqueNome}>{item.nome}</span>
            <span className={s.destaquePe}>
              <Preco v={item.preco} />
              {!item.opcao && (
                <BotaoMais rotulo={`Adicionar ${item.nome} à comanda`} onClick={() => adicionar(item, cardapio)} />
              )}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

const PASSOS = [
  { n: "1", titulo: "Escolha", texto: "Toque no + ao lado do que der vontade." },
  { n: "2", titulo: "Confira", texto: "Na comanda, ajuste quantidades e deixe observações." },
  { n: "3", titulo: "Peça", texto: "Ela vira uma mensagem pronta no nosso WhatsApp." },
];

export function Cardapio() {
  const [aba, setAba] = useState<"geral" | "almoco">("geral");
  const [grupoAtivo, setGrupoAtivo] = useState<string>(cardapioGeral.grupos[0].id);
  const cardapio = CARDAPIOS[aba];
  const painelRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);

  // No celular a barra de folhas rola de lado: mantém o marcador ativo à vista
  useEffect(() => {
    const trilho = trilhoRef.current;
    const ativo = trilho?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!trilho || !ativo) return;
    const alvo = ativo.offsetLeft - (trilho.clientWidth - ativo.offsetWidth) / 2;
    trilho.scrollTo({ left: Math.max(0, alvo), behavior: "smooth" });
  }, [grupoAtivo, aba]);

  const irParaPainel = () =>
    requestAnimationFrame(() => painelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  // Links do site (#almoco, #grupo-doces...) abrem a aba e a folha certas
  const seguirHash = useCallback(() => {
    const h = window.location.hash.slice(1);
    if (h === "almoco") {
      setAba("almoco");
      setGrupoAtivo(cardapioAlmoco.grupos[0].id);
      return;
    }
    if (h.startsWith("grupo-")) {
      const id = h.slice(6);
      const dono = (Object.keys(CARDAPIOS) as ("geral" | "almoco")[]).find((k) =>
        CARDAPIOS[k].grupos.some((g) => g.id === id)
      );
      if (dono) {
        setAba(dono);
        setGrupoAtivo(id);
        irParaPainel();
      }
    }
  }, []);

  useEffect(() => {
    seguirHash();
    window.addEventListener("hashchange", seguirHash);
    return () => window.removeEventListener("hashchange", seguirHash);
  }, [seguirHash]);

  const trocarAba = (nova: "geral" | "almoco") => {
    setAba(nova);
    setGrupoAtivo(CARDAPIOS[nova].grupos[0].id);
  };

  const abrirFolha = (id: string, rolar = true) => {
    setGrupoAtivo(id);
    if (rolar) irParaPainel();
  };

  const indiceAtivo = Math.max(
    0,
    cardapio.grupos.findIndex((g) => g.id === grupoAtivo)
  );

  return (
    <section id="cardapio" className={`secao fundo-kraft ${s.cardapio}`} aria-labelledby="titulo-cardapio">
      <span id="almoco" className={s.ancora} aria-hidden="true" />
      <div className="conteiner">
        <header className={s.topo} data-revelar>
          <div>
            <p className={`rotulo-caixa ${s.kicker}`}>Da cozinha para a sua mesa</p>
            <h2 id="titulo-cardapio" className={`cursiva ${s.titulo}`}>
              Nosso cardápio
            </h2>
            <p className={s.sub}>
              Tudo o que sai da nossa cozinha, do pão de queijo ao Fettuccine de Camarão. Monte seu pedido aqui mesmo
              e retire no balcão ou receba em casa.
            </p>
          </div>
          <ol className={s.passos} aria-label="Como pedir pelo site">
            {PASSOS.map((p) => (
              <li key={p.n}>
                <span className={`cursiva ${s.passoN}`} aria-hidden="true">
                  {p.n}
                </span>
                <span>
                  <strong>{p.titulo}.</strong> {p.texto}
                </span>
              </li>
            ))}
          </ol>
        </header>

        <div className={s.abas} role="tablist" aria-label="Qual cardápio">
          {(["geral", "almoco"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`aba-${k}`}
              aria-selected={aba === k}
              aria-controls="painel-cardapio"
              className={`${s.aba} ${aba === k ? s.abaAtiva : ""}`}
              onClick={() => trocarAba(k)}
            >
              {CARDAPIOS[k].nome}
              {k === "almoco" && <span className={s.abaNota}>seg. a sáb., a partir das 11h</span>}
            </button>
          ))}
        </div>
      </div>

      <nav className={s.categorias} aria-label={`Folhas do ${cardapio.nome.toLowerCase()}`}>
        <div className={`conteiner ${s.categoriasTrilho}`} ref={trilhoRef}>
          {cardapio.grupos.map((g) => (
            <a
              key={g.id}
              href={`#grupo-${g.id}`}
              className={`${s.categoria} ${grupoAtivo === g.id ? s.categoriaAtiva : ""}`}
              aria-current={grupoAtivo === g.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                abrirFolha(g.id);
              }}
            >
              {g.nome}
            </a>
          ))}
        </div>
      </nav>

      <div
        id="painel-cardapio"
        role="tabpanel"
        aria-labelledby={`aba-${aba}`}
        className={`conteiner ${s.painel}`}
        ref={painelRef}
      >
        {cardapio.aviso && (
          <p className={s.aviso} {...(cardapio.aviso.includes("[") ? { "data-provisorio": "" } : {})}>
            {cardapio.aviso}
          </p>
        )}

        <div className={s.pilha}>
          {cardapio.grupos.map((g, gi) => {
            const anterior = cardapio.grupos[gi - 1];
            const proxima = cardapio.grupos[gi + 1];
            return (
              <article
                key={`${aba}-${g.id}`}
                id={`grupo-${g.id}`}
                data-grupo={g.id}
                className={s.folha}
                aria-labelledby={`t-${g.id}`}
                hidden={gi !== indiceAtivo}
              >
                <header className={s.folhaTopo}>
                  <span className={`cursiva ${s.folhaMarca}`}>Cacilda &amp; Lola</span>
                  <h3 id={`t-${g.id}`} className={`rotulo-caixa ${s.folhaGrupo}`}>
                    {g.nome}
                  </h3>
                  <span className={s.folhaPagina} aria-hidden="true">
                    folha {gi + 1} de {cardapio.grupos.length}
                  </span>
                </header>

                <Destaques grupo={g} cardapio={cardapio.id} />

                <div className={s.secoes}>
                  {g.secoes.map((sec) => (
                    <section key={sec.id} className={s.secao} aria-labelledby={`s-${sec.id}`}>
                      <h4 id={`s-${sec.id}`} className={`cursiva ${s.secaoTitulo}`}>
                        {sec.titulo}
                      </h4>
                      {sec.intro && <p className={s.intro}>{sec.intro}</p>}
                      <ul className={s.itens}>
                        {sec.itens.map((item) => (
                          <LinhaItem key={item.id} item={item} cardapio={cardapio.id} />
                        ))}
                      </ul>
                      {sec.nota && <p className={s.nota}>{sec.nota}</p>}
                    </section>
                  ))}
                </div>

                <footer className={s.virar}>
                  {anterior ? (
                    <button type="button" className={s.virarBotao} onClick={() => abrirFolha(anterior.id)}>
                      <span aria-hidden="true">←</span> {anterior.nome}
                    </button>
                  ) : (
                    <span />
                  )}
                  {proxima && (
                    <button
                      type="button"
                      className={`${s.virarBotao} ${s.virarProxima}`}
                      onClick={() => abrirFolha(proxima.id)}
                    >
                      <span className={s.virarDica}>Virar a página</span>
                      <span>
                        {proxima.nome} <span aria-hidden="true">→</span>
                      </span>
                    </button>
                  )}
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
