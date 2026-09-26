/**
 * Todas as informações do bistrô em um lugar só.
 * Campos com [colchetes] ou marcados com PREENCHER ainda precisam de confirmação.
 * Veja PREENCHER.md na raiz do projeto.
 */
export const site = {
  nome: "Cacilda & Lola",
  complemento: "café · bistrô",
  slogan: "O único bistrô em Santa Cruz, do almoço ao happy hour",
  assinatura: "Um cantinho com sabor de casa de vó.",
  dona: "Francine",

  whatsapp: {
    /** Só dígitos, com DDI e DDD. */
    numero: "5514997687855",
    exibicao: "(14) 99768-7855",
  },

  instagram: {
    url: "https://www.instagram.com/cacildaelola.cafebistro/",
    usuario: "@cacildaelola.cafebistro",
  },

  endereco: {
    rua: "Av. Dr. Pedro Camarinha, 1043",
    bairro: "Vila Saul",
    cidade: "Santa Cruz do Rio Pardo",
    uf: "SP",
    cep: "18908-040",
    /** Texto usado para o mapa e para o link "Como chegar". */
    busca: "Cacilda e Lola Café Bistrô, Av. Dr. Pedro Camarinha, 1043, Vila Saul, Santa Cruz do Rio Pardo - SP",
  },

  /**
   * Horário de funcionamento. 0 = domingo ... 6 = sábado.
   * Formato 24h, horário de Brasília.
   */
  horario: {
    fuso: "America/Sao_Paulo",
    dias: {
      0: null,
      1: { abre: "11:00", fecha: "19:00" },
      2: { abre: "11:00", fecha: "19:00" },
      3: { abre: "11:00", fecha: "19:00" },
      4: { abre: "11:00", fecha: "19:00" },
      5: { abre: "11:00", fecha: "19:00" },
      6: { abre: "11:00", fecha: "19:00" },
    } as Record<number, { abre: string; fecha: string } | null>,
    resumo: "Segunda a sábado, das 11h às 19h",
  },

  pedido: {
    /** null = "a combinar pelo WhatsApp". Ex.: 7 para R$ 7,00. PREENCHER */
    taxaEntrega: null as number | null,
    /** null = sem pedido mínimo. PREENCHER */
    pedidoMinimo: null as number | null,
    /** Bairros/área atendidos na entrega. PREENCHER */
    areaEntrega: "[Bairros ou raio de entrega]",
    formasPagamento: ["Pix", "Cartão (débito ou crédito)", "Dinheiro"],
  },

  /**
   * Os três momentos do dia no bistrô (seção "Do almoço ao happy hour").
   * `inicio` (24h) decide qual momento o site destaca como "agora".
   * PREENCHER: confirmar horários com a Francine.
   */
  momentos: [
    {
      hora: "11h",
      inicio: "11:00",
      nome: "Almoço",
      chamada: "Hora do almoço",
      texto:
        "Parmegiana dourada, lasanha da Nonna, tilápia grelhada, strogonoff. Prato quente, feito na hora, para a pausa do meio do dia valer a pena.",
      destino: "almoco",
      foto: "",
      legendaFoto: "Um prato do almoço servido na mesa",
    },
    {
      hora: "[15h]",
      inicio: "15:00",
      nome: "Café e bolo",
      chamada: "Hora do café com bolo",
      texto:
        "Cappuccino da casa e uma fatia generosa do bolo da Vó Lola. Se a vontade for de salgado, a coxinha de pernil está esperando na vitrine.",
      destino: "doces",
      foto: "",
      legendaFoto: "Café com uma fatia de bolo",
    },
    {
      hora: "[17h]",
      inicio: "17:00",
      nome: "Happy hour",
      chamada: "Hora do happy hour",
      texto:
        "Long neck trincando, batata com costela desfiada e coxinha da asa no meio da mesa. O jeito certo de encerrar o expediente.",
      destino: "salgados",
      foto: "",
      legendaFoto: "Mesa de happy hour com cerveja e petiscos",
    },
  ],

  credito: { nome: "Synex", url: "[https://link-da-synex]" },
};

export const linkWhatsApp = (texto?: string) =>
  `https://wa.me/${site.whatsapp.numero}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;

export const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.endereco.busca)}`;
/** Abre o Google Maps já traçando a rota de onde a pessoa está até o bistrô. */
export const linkRota = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.endereco.busca)}`;

export const embedMapa = `https://www.google.com/maps?q=${encodeURIComponent(site.endereco.busca)}&output=embed`;
