const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 10.5 -> "R$ 10,50" (com espaço comum, para o WhatsApp não quebrar a linha estranho). */
export const reais = (valor: number) => brl.format(valor).replace(/ /g, " ");

/** 10.5 -> "10,50" (para o cardápio, onde o "R$" fica menor). */
export const valor = (v: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
