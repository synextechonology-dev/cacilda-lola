"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { linkWhatsApp, site } from "@/data/site";
import { reais } from "@/lib/formato";
import { situacaoAgora, type Situacao } from "@/lib/horario";
import {
  codigoPedido,
  dadosVazios,
  montarMensagem,
  subtotal,
  validar,
  type DadosPedido,
  type ErrosPedido,
} from "@/lib/pedido";
import { useComanda } from "./ComandaContexto";
import s from "./Comanda.module.css";

function Erro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} className={s.erro} role="alert">
      {texto}
    </p>
  );
}

/** Botão flutuante + aviso "foi para a comanda" + gaveta com o pedido. */
export function Comanda() {
  const { linhas, quantidade, total, aberta, abrir, fechar, mudarQtd, anotar, limpar, aviso } = useComanda();
  const [dados, setDados] = useState<DadosPedido>(dadosVazios);
  const [erros, setErros] = useState<ErrosPedido>({});
  const [enviado, setEnviado] = useState<{ url: string; codigo: string } | null>(null);
  const [obsAberta, setObsAberta] = useState<Record<string, boolean>>({});
  const [situacao, setSituacao] = useState<Situacao | null>(null);
  const [avisoVisivel, setAvisoVisivel] = useState(false);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const gavetaRef = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  const temAlcool = linhas.some((l) => l.alcoolico);
  const taxa = dados.tipo === "entrega" ? site.pedido.taxaEntrega : 0;
  const sub = subtotal(linhas);

  const mensagem = useMemo(
    () => montarMensagem(dados, linhas, enviado?.codigo ?? "CL-0000-0000"),
    [dados, linhas, enviado]
  );

  const muda = <K extends keyof DadosPedido>(campo: K, v: DadosPedido[K]) => {
    setDados((d) => ({ ...d, [campo]: v }));
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }));
  };

  // Aviso rápido quando um item entra na comanda
  useEffect(() => {
    if (!aviso) return;
    setAvisoVisivel(true);
    const t = setTimeout(() => setAvisoVisivel(false), 2200);
    return () => clearTimeout(t);
  }, [aviso]);

  // Abrir/fechar: foco, Esc e trava de rolagem
  useEffect(() => {
    if (!aberta) return;
    focoAnterior.current = document.activeElement as HTMLElement;
    setSituacao(situacaoAgora());
    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();

    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "Tab" && gavetaRef.current) {
        const focaveis = gavetaRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, summary, [tabindex]:not([tabindex="-1"])'
        );
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        }
      }
    };
    window.addEventListener("keydown", tecla);
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = "";
      focoAnterior.current?.focus?.();
    };
  }, [aberta, fechar]);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const encontrados = validar(dados, linhas);
    setErros(encontrados);
    const primeiro = Object.keys(encontrados)[0];
    if (primeiro) {
      gavetaRef.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    const codigo = codigoPedido();
    const url = linkWhatsApp(montarMensagem(dados, linhas, codigo));
    setEnviado({ url, codigo });
    window.open(url, "_blank", "noopener");
  };

  const novaComanda = () => {
    limpar();
    setDados(dadosVazios);
    setEnviado(null);
    setObsAberta({});
  };

  const irAoCardapio = () => {
    fechar();
    document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <p className="visualmente-oculto" aria-live="polite">
        {aviso?.texto}
      </p>

      {quantidade > 0 && !aberta && (
        <div className={s.flutuante}>
          <p className={`${s.balao} ${avisoVisivel ? s.balaoVisivel : ""}`} aria-hidden="true">
            {aviso?.texto}
          </p>
          <button type="button" className={s.ticket} onClick={abrir}>
            <span className={s.ticketTitulo}>Ver comanda</span>
            <span className={s.ticketResumo}>
              {quantidade} {quantidade === 1 ? "item" : "itens"} · {reais(total)}
            </span>
          </button>
        </div>
      )}

      <div className={`${s.fundo} ${aberta ? s.fundoVisivel : ""}`} onClick={fechar} aria-hidden="true" />

      <div
        ref={gavetaRef}
        className={`${s.gaveta} ${aberta ? s.gavetaAberta : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-comanda"
        aria-hidden={!aberta}
        {...(!aberta ? { inert: true } : {})}
      >
        <div className={s.papel}>
          <header className={s.topo}>
            <div>
              <h2 id="titulo-comanda" className={`cursiva ${s.titulo}`}>
                Sua comanda
              </h2>
              <p className={s.marca}>Cacilda &amp; Lola</p>
            </div>
            <button ref={fecharRef} type="button" className={s.fechar} onClick={fechar}>
              Fechar
            </button>
          </header>

          {situacao && !situacao.aberto && !enviado && (
            <p className={s.fechado}>
              Estamos fechados agora. {situacao.detalhe}. Você pode mandar o pedido mesmo assim: ele chega no
              WhatsApp e a gente responde assim que abrir.
            </p>
          )}

          {enviado ? (
            <div className={s.enviado}>
              <p className={`cursiva ${s.enviadoTitulo}`}>Pedido montado!</p>
              <p>
                Abrimos o WhatsApp com a sua mensagem ({enviado.codigo}). Confira e toque em enviar. A confirmação e o
                tempo de preparo chegam por lá.
              </p>
              <div className={s.enviadoBotoes}>
                <a className="botao botao-verde" href={enviado.url} target="_blank" rel="noopener noreferrer">
                  Abrir o WhatsApp de novo
                </a>
                <button type="button" className="botao botao-contorno" onClick={novaComanda}>
                  Começar outra comanda
                </button>
              </div>
            </div>
          ) : linhas.length === 0 ? (
            <div className={s.vazia}>
              <p>Sua comanda está vazia. Escolha algo no cardápio e toque no +.</p>
              <button type="button" className="botao botao-verde" onClick={irAoCardapio}>
                Ver o cardápio
              </button>
            </div>
          ) : (
            <form className={s.form} onSubmit={enviar} noValidate>
              {/* ---------- Itens ---------- */}
              <ul className={s.linhas} aria-label="Itens da comanda">
                {linhas.map((l) => {
                  const nome = l.escolha ? `${l.nome} (${l.escolha})` : l.nome;
                  return (
                    <li key={l.chave} className={s.linha}>
                      <div className={s.qtd}>
                        <button
                          type="button"
                          onClick={() => mudarQtd(l.chave, -1)}
                          aria-label={l.qtd === 1 ? `Tirar ${nome} da comanda` : `Diminuir ${nome}`}
                        >
                          {l.qtd === 1 ? "×" : "−"}
                        </button>
                        <span aria-label={`${l.qtd} unidades`}>{l.qtd}</span>
                        <button type="button" onClick={() => mudarQtd(l.chave, 1)} aria-label={`Aumentar ${nome}`}>
                          +
                        </button>
                      </div>
                      <div className={s.linhaTexto}>
                        <span className={s.linhaNome}>{nome}</span>
                        {l.cardapio === "almoco" && <span className={s.selo}>almoço</span>}
                        {obsAberta[l.chave] || l.obs ? (
                          <input
                            className={s.obs}
                            type="text"
                            placeholder="Ex.: sem cebola, bem passado"
                            value={l.obs ?? ""}
                            onChange={(e) => anotar(l.chave, e.target.value)}
                            aria-label={`Observação para ${nome}`}
                            maxLength={120}
                          />
                        ) : (
                          <button
                            type="button"
                            className={s.obsLink}
                            onClick={() => setObsAberta((o) => ({ ...o, [l.chave]: true }))}
                          >
                            Adicionar observação
                          </button>
                        )}
                      </div>
                      <span className={s.linhaPreco}>{reais(l.precoUnit * l.qtd)}</span>
                    </li>
                  );
                })}
              </ul>
              <Erro id="erro-itens" texto={erros.itens} />

              {/* ---------- Retirada ou entrega ---------- */}
              <fieldset className={s.grupo}>
                <legend>Como você quer receber?</legend>
                <div className={s.segmentado}>
                  {(
                    [
                      ["retirada", "Retirar no balcão"],
                      ["entrega", "Entrega"],
                    ] as const
                  ).map(([v, t]) => (
                    <label key={v} className={dados.tipo === v ? s.marcado : ""}>
                      <input
                        type="radio"
                        name="tipo"
                        value={v}
                        checked={dados.tipo === v}
                        onChange={() => muda("tipo", v)}
                      />
                      {t}
                    </label>
                  ))}
                </div>

                {dados.tipo === "retirada" ? (
                  <p className={s.dica}>Retire na {site.endereco.rua}, {site.endereco.bairro}.</p>
                ) : (
                  <div className={s.campos}>
                    <label className={s.campo}>
                      <span>Rua e número</span>
                      <input
                        name="rua"
                        autoComplete="street-address"
                        value={dados.rua}
                        onChange={(e) => muda("rua", e.target.value)}
                        aria-invalid={!!erros.rua}
                        aria-describedby={erros.rua ? "erro-rua" : undefined}
                      />
                      <Erro id="erro-rua" texto={erros.rua} />
                    </label>
                    <label className={s.campo}>
                      <span>Bairro</span>
                      <input
                        name="bairro"
                        value={dados.bairro}
                        onChange={(e) => muda("bairro", e.target.value)}
                        aria-invalid={!!erros.bairro}
                        aria-describedby={erros.bairro ? "erro-bairro" : undefined}
                      />
                      <Erro id="erro-bairro" texto={erros.bairro} />
                    </label>
                    <label className={s.campo}>
                      <span>
                        Complemento <em>(opcional)</em>
                      </span>
                      <input
                        name="complemento"
                        placeholder="Apto, bloco, casa dos fundos"
                        value={dados.complemento}
                        onChange={(e) => muda("complemento", e.target.value)}
                      />
                    </label>
                    <label className={s.campo}>
                      <span>
                        Ponto de referência <em>(opcional)</em>
                      </span>
                      <input
                        name="referencia"
                        value={dados.referencia}
                        onChange={(e) => muda("referencia", e.target.value)}
                      />
                    </label>
                    <p className={s.dica}>
                      Taxa de entrega:{" "}
                      {site.pedido.taxaEntrega == null ? "a gente combina pelo WhatsApp" : reais(site.pedido.taxaEntrega)}.
                      <span data-provisorio> Entregamos em: {site.pedido.areaEntrega}.</span>
                    </p>
                  </div>
                )}
              </fieldset>

              {/* ---------- Quem e quando ---------- */}
              <fieldset className={s.grupo}>
                <legend>Seus dados</legend>
                <label className={s.campo}>
                  <span>Seu nome</span>
                  <input
                    name="nome"
                    autoComplete="name"
                    value={dados.nome}
                    onChange={(e) => muda("nome", e.target.value)}
                    aria-invalid={!!erros.nome}
                    aria-describedby={erros.nome ? "erro-nome" : undefined}
                  />
                  <Erro id="erro-nome" texto={erros.nome} />
                </label>

                <div className={s.campo}>
                  <span id="rotulo-quando">Para quando?</span>
                  <div className={s.segmentado} role="radiogroup" aria-labelledby="rotulo-quando">
                    {(
                      [
                        ["agora", "O quanto antes"],
                        ["agendado", "Escolher horário"],
                      ] as const
                    ).map(([v, t]) => (
                      <label key={v} className={dados.quando === v ? s.marcado : ""}>
                        <input
                          type="radio"
                          name="quando"
                          value={v}
                          checked={dados.quando === v}
                          onChange={() => muda("quando", v)}
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                  {dados.quando === "agendado" && (
                    <>
                      <input
                        className={s.hora}
                        type="time"
                        name="horario"
                        min="11:00"
                        max="19:00"
                        value={dados.horario}
                        onChange={(e) => muda("horario", e.target.value)}
                        aria-label="Horário desejado"
                        aria-invalid={!!erros.horario}
                      />
                      <Erro id="erro-horario" texto={erros.horario} />
                    </>
                  )}
                </div>
              </fieldset>

              {/* ---------- Pagamento ---------- */}
              <fieldset className={s.grupo}>
                <legend>Como vai pagar?</legend>
                <div className={s.opcoes}>
                  {site.pedido.formasPagamento.map((f) => (
                    <label key={f} className={dados.pagamento === f ? s.marcado : ""}>
                      <input
                        type="radio"
                        name="pagamento"
                        value={f}
                        checked={dados.pagamento === f}
                        onChange={() => muda("pagamento", f)}
                      />
                      {f}
                    </label>
                  ))}
                </div>
                <Erro id="erro-pagamento" texto={erros.pagamento} />
                {dados.pagamento === "Dinheiro" && (
                  <label className={s.campo}>
                    <span>
                      Troco para quanto? <em>(deixe em branco se não precisar)</em>
                    </span>
                    <input
                      name="troco"
                      inputMode="decimal"
                      placeholder="Ex.: 100"
                      value={dados.troco}
                      onChange={(e) => muda("troco", e.target.value.replace(/[^\d,]/g, ""))}
                    />
                  </label>
                )}
              </fieldset>

              <label className={s.campo}>
                <span>
                  Algum recado para a cozinha? <em>(opcional)</em>
                </span>
                <textarea
                  name="observacoes"
                  rows={2}
                  value={dados.observacoes}
                  onChange={(e) => muda("observacoes", e.target.value)}
                />
              </label>

              {temAlcool && (
                <label className={s.maioridade}>
                  <input
                    type="checkbox"
                    name="maioridade"
                    checked={dados.maioridade}
                    onChange={(e) => muda("maioridade", e.target.checked)}
                  />
                  Confirmo que tenho 18 anos ou mais.
                </label>
              )}
              <Erro id="erro-maioridade" texto={erros.maioridade} />

              {/* ---------- Total ---------- */}
              <dl className={s.total}>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{reais(sub)}</dd>
                </div>
                {dados.tipo === "entrega" && (
                  <div>
                    <dt>Entrega</dt>
                    <dd>{taxa == null ? "a combinar" : reais(taxa)}</dd>
                  </div>
                )}
                <div className={s.totalFinal}>
                  <dt>Total</dt>
                  <dd>
                    {reais(sub + (taxa ?? 0))}
                    {dados.tipo === "entrega" && taxa == null && <small> + entrega</small>}
                  </dd>
                </div>
              </dl>

              <button type="submit" className={`botao botao-laranja ${s.enviar}`}>
                Enviar pedido pelo WhatsApp
              </button>
              <p className={s.dica}>O WhatsApp abre com a mensagem pronta. É só conferir e tocar em enviar.</p>

              <details className={s.previa}>
                <summary>Ver como a mensagem chega</summary>
                <pre>{mensagem}</pre>
              </details>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
