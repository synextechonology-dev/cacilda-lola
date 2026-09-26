import { site } from "@/data/site";
import { reais } from "./formato";

export type LinhaComanda = {
  /** id do item + escolha, para "Cannoli (Nutella)" e "Cannoli (Creme)" virarem linhas separadas */
  chave: string;
  itemId: string;
  nome: string;
  escolha?: string;
  precoUnit: number;
  qtd: number;
  obs?: string;
  alcoolico?: boolean;
  cardapio: "geral" | "almoco";
};

export type TipoPedido = "retirada" | "entrega";

export type DadosPedido = {
  nome: string;
  tipo: TipoPedido;
  rua: string;
  bairro: string;
  complemento: string;
  referencia: string;
  quando: "agora" | "agendado";
  horario: string;
  pagamento: string;
  troco: string;
  observacoes: string;
  maioridade: boolean;
};

export const dadosVazios: DadosPedido = {
  nome: "",
  tipo: "retirada",
  rua: "",
  bairro: "",
  complemento: "",
  referencia: "",
  quando: "agora",
  horario: "",
  pagamento: "",
  troco: "",
  observacoes: "",
  maioridade: false,
};

export const subtotal = (linhas: LinhaComanda[]) =>
  linhas.reduce((soma, l) => soma + l.precoUnit * l.qtd, 0);

/** Código curto para a Fancine localizar o pedido na conversa: CL-2609-1432 */
export function codigoPedido(data = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `CL-${p(data.getDate())}${p(data.getMonth() + 1)}-${p(data.getHours())}${p(data.getMinutes())}`;
}

export type ErrosPedido = Partial<Record<keyof DadosPedido | "itens", string>>;

export function validar(d: DadosPedido, linhas: LinhaComanda[]): ErrosPedido {
  const e: ErrosPedido = {};
  if (linhas.length === 0) e.itens = "Sua comanda está vazia. Escolha um item no cardápio.";
  if (!d.nome.trim()) e.nome = "Escreva seu nome para a gente chamar você.";
  if (d.tipo === "entrega") {
    if (!d.rua.trim()) e.rua = "Informe a rua e o número para a entrega.";
    if (!d.bairro.trim()) e.bairro = "Informe o bairro.";
  }
  if (d.quando === "agendado" && !d.horario) e.horario = "Escolha o horário.";
  if (!d.pagamento) e.pagamento = "Escolha como vai pagar.";
  if (linhas.some((l) => l.alcoolico) && !d.maioridade)
    e.maioridade = "Para pedir cerveja, confirme que você tem 18 anos ou mais.";
  const min = site.pedido.pedidoMinimo;
  if (min && subtotal(linhas) < min) e.itens = `O pedido mínimo é de ${reais(min)}.`;
  return e;
}

/** Monta a mensagem que chega no WhatsApp do bistrô. */
export function montarMensagem(d: DadosPedido, linhas: LinhaComanda[], codigo: string) {
  const taxa = d.tipo === "entrega" ? site.pedido.taxaEntrega : 0;
  const sub = subtotal(linhas);
  const l: string[] = [];

  l.push(`*Novo pedido pelo site* (${codigo})`);
  l.push("");
  l.push(`*Cliente:* ${d.nome.trim()}`);
  l.push(`*Tipo:* ${d.tipo === "entrega" ? "Entrega" : "Retirada no balcão"}`);

  if (d.tipo === "entrega") {
    l.push(`*Endereço:* ${d.rua.trim()}, ${d.bairro.trim()}`);
    if (d.complemento.trim()) l.push(`*Complemento:* ${d.complemento.trim()}`);
    if (d.referencia.trim()) l.push(`*Referência:* ${d.referencia.trim()}`);
  }

  l.push(`*Quando:* ${d.quando === "agora" ? "O quanto antes" : `Para as ${d.horario}`}`);
  l.push("");
  l.push("*Itens*");
  for (const it of linhas) {
    const nome = it.escolha ? `${it.nome} (${it.escolha})` : it.nome;
    const origem = it.cardapio === "almoco" ? " [almoço]" : "";
    l.push(`${it.qtd}x ${nome}${origem}: ${reais(it.precoUnit * it.qtd)}`);
    if (it.obs?.trim()) l.push(`   obs.: ${it.obs.trim()}`);
  }
  l.push("");
  l.push(`Subtotal: ${reais(sub)}`);

  if (d.tipo === "entrega") {
    l.push(`Entrega: ${taxa == null ? "a combinar" : reais(taxa)}`);
    l.push(`*Total: ${reais(sub + (taxa ?? 0))}${taxa == null ? " + entrega" : ""}*`);
  } else {
    l.push(`*Total: ${reais(sub)}*`);
  }

  l.push("");
  let pagamento = `*Pagamento:* ${d.pagamento}`;
  if (d.pagamento === "Dinheiro") {
    pagamento += d.troco.trim() ? ` (troco para R$ ${d.troco.trim()})` : " (sem troco)";
  }
  l.push(pagamento);

  if (d.observacoes.trim()) {
    l.push(`*Observações:* ${d.observacoes.trim()}`);
  }

  if (linhas.some((x) => x.alcoolico)) l.push("Cliente confirmou ter 18 anos ou mais.");

  return l.join("\n");
}
