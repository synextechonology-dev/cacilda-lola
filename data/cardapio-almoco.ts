import type { Cardapio } from "./tipos";

/**
 * Cardápio de almoço, transcrito do cardápio oficial (Canva) em 26/09/2026.
 * Os IDs começam com "alm-" para não colidir com o cardápio geral na comanda.
 *
 * ATENÇÃO: os sucos têm preço diferente do cardápio geral
 * (laranja R$ 12 aqui x R$ 18 lá; limão R$ 10 x R$ 15). Confirmar com a Francine.
 */
export const cardapioAlmoco: Cardapio = {
  id: "almoco",
  nome: "Almoço",
  // PREENCHER: horário em que o almoço é servido
  aviso: "Servido de segunda a sábado, das 11h às [14h].",
  grupos: [
    {
      id: "pratos",
      nome: "Pratos",
      secoes: [
        {
          id: "pratos-quentes",
          titulo: "Pratos quentes",
          itens: [
            { id: "alm-parmegiana-arroz", nome: "Parmegiana com arroz", preco: 44.9 },
            {
              id: "alm-parmegiana-fettuccine",
              nome: "Parmegiana com fettuccine",
              preco: 49.9,
              destaque: true,
            },
            { id: "alm-lasanha", nome: "Lasanha da Nonna", preco: 34.9, destaque: true },
            // PREENCHER: descrição do Sofioli (a arte original não tem)
            { id: "alm-sofioli", nome: "Sofioli", preco: 49.9, descricao: "[Descrição do prato]" },
            {
              id: "alm-fettuccine-camarao",
              nome: "Fettuccine de Camarão",
              preco: 74.9,
              destaque: true,
              descricao: "Molho cremoso de limão e parmesão.",
            },
            {
              id: "alm-tiras-carne",
              nome: "Tiras de carne acebolada",
              preco: 39.9,
              descricao: "Acompanha arroz, feijão, farofa e vinagrete.",
            },
            {
              id: "alm-tiras-frango",
              nome: "Tiras de frango acebolada",
              preco: 26.9,
              descricao: "Acompanha arroz, feijão, farofa e vinagrete.",
            },
            {
              id: "alm-tilapia",
              nome: "Tilápia grelhada",
              preco: 35.9,
              descricao: "Acompanha arroz e legumes.",
            },
            {
              id: "alm-strogonoff",
              nome: "Strogonoff de frango",
              preco: 29.9,
              descricao: "Acompanha arroz e batata chips.",
            },
          ],
        },
        {
          id: "alm-saladas",
          titulo: "Saladas",
          itens: [
            {
              id: "alm-salada-caesar",
              nome: "Caesar",
              preco: 30,
              descricao: "Alface americana, peito de frango, croutons, molho caesar e parmesão ralado.",
            },
            {
              id: "alm-salada-dona-lola",
              nome: "Dona Lola",
              preco: 40,
              descricao: "Rosbife caseiro, rúcula, tomate cereja, lascas de parmesão e molho balsâmico.",
            },
            {
              id: "alm-salada-dona-cacilda",
              nome: "Dona Cacilda",
              preco: 30,
              descricao:
                "Mix de folhas frescas, cenoura, repolho roxo, mix de queijos, bacon, tortilha crocante e molho de iogurte.",
            },
          ],
        },
      ],
    },
    {
      id: "alm-bebidas",
      nome: "Bebidas",
      secoes: [
        {
          id: "alm-bebidas-quentes",
          titulo: "Bebidas quentes",
          itens: [
            { id: "alm-espresso", nome: "Café Espresso", preco: 6 },
            { id: "alm-espresso-duplo", nome: "Café Espresso Duplo", preco: 10 },
            { id: "alm-macchiato", nome: "Macchiato", preco: 7, descricao: "Espresso com espuma de leite." },
            { id: "alm-latte", nome: "Café Latte", preco: 10, descricao: "Café, leite e espuma de leite." },
            {
              id: "alm-cappuccino-casa",
              nome: "Cappuccino da Casa",
              preco: 14,
              descricao: "Café, leite, chocolate em pó e canela.",
            },
            {
              id: "alm-cappuccino-submarino",
              nome: "Cappuccino Submarino",
              preco: 18,
              descricao: "Café, leite, chocolate em pó, canela e raspas de chocolate.",
            },
            { id: "alm-chocolate", nome: "Chocolate", preco: 15, descricao: "Leite e chocolate ao leite." },
          ],
        },
        {
          id: "alm-bebidas-geladas",
          titulo: "Bebidas geladas",
          itens: [
            { id: "alm-latte-gelado", nome: "Latte Gelado", preco: 17, descricao: "Café, leite e chantilly." },
            {
              id: "alm-cappuccino-gelado",
              nome: "Cappuccino Gelado",
              preco: 17,
              descricao: "Café, leite, chocolate em pó, gelo, canela e chantilly.",
            },
            {
              id: "alm-vienense",
              nome: "Café Vienense Cremoso",
              preco: 28,
              descricao: "Ganache de chocolate, café, sorvete de creme, canela e chantilly.",
            },
            {
              id: "alm-freddo",
              nome: "Cappuccino Freddo",
              preco: 20,
              descricao: "Café, sorvete de creme, leite, canela e chantilly.",
            },
            {
              id: "alm-freddo-nutella",
              nome: "Cappuccino Freddo Nutella",
              preco: 25,
              descricao: "Café, sorvete de creme, leite, borda de Nutella, canela e chantilly.",
            },
            {
              id: "alm-freddo-doce-leite",
              nome: "Cappuccino Freddo Doce de Leite",
              preco: 22,
              descricao: "Café, sorvete de creme, leite, borda de doce de leite e chantilly.",
            },
            {
              id: "alm-shake-chocolate",
              nome: "Milk Shake de Chocolate",
              preco: 25,
              descricao: "Sorvete, leite, calda de chocolate e chantilly.",
            },
            {
              id: "alm-shake-creme",
              nome: "Milk Shake de Creme",
              preco: 25,
              descricao: "Sorvete, leite, calda de caramelo e chantilly.",
            },
            {
              id: "alm-shake-morango",
              nome: "Milk Shake de Morango",
              preco: 25,
              descricao: "Sorvete, leite, calda de morango e chantilly.",
            },
          ],
        },
        {
          id: "alm-adicionais",
          titulo: "Adicionais das bebidas",
          itens: [
            { id: "alm-add-nutella", nome: "Nutella", preco: 9 },
            { id: "alm-add-chantilly", nome: "Chantilly", preco: 3 },
            { id: "alm-add-doce-leite", nome: "Doce de Leite", preco: 4 },
          ],
        },
        {
          id: "alm-sucos",
          titulo: "Sucos e refrigerantes",
          itens: [
            {
              id: "alm-soda-italiana",
              nome: "Soda Italiana",
              preco: 15,
              opcao: {
                rotulo: "Sabor",
                escolhas: [{ nome: "Frutas vermelhas" }, { nome: "Maçã verde" }, { nome: "Limão siciliano" }],
              },
            },
            { id: "alm-suco-laranja", nome: "Suco Natural de Laranja", preco: 12 },
            { id: "alm-suco-laranja-morango", nome: "Suco Natural de Laranja com Morango", preco: 18 },
            { id: "alm-suco-limao", nome: "Suco Natural de Limão", preco: 10 },
            {
              id: "alm-suco-polpa",
              nome: "Suco Natural de Polpa",
              preco: 15,
              opcao: {
                rotulo: "Sabor",
                escolhas: [
                  { nome: "Abacaxi" },
                  { nome: "Acerola" },
                  { nome: "Maracujá" },
                  { nome: "Morango" },
                  { nome: "Tangerina" },
                  { nome: "Detox" },
                ],
              },
            },
            { id: "alm-agua", nome: "Água Mineral / Água com Gás", preco: 6 },
            { id: "alm-refrigerante", nome: "Refrigerante Lata", preco: 8 },
            { id: "alm-h2oh", nome: "H2OH! e Limoneto", preco: 9 },
          ],
        },
        {
          id: "alm-cervejas",
          titulo: "Cervejas",
          nota: "Proibida a venda de bebidas alcoólicas para menores de 18 anos. Se beber, não dirija.",
          itens: [
            { id: "alm-heineken", nome: "Heineken Long Neck", preco: 12, alcoolico: true },
            { id: "alm-corona", nome: "Corona Long Neck", preco: 14, alcoolico: true },
            { id: "alm-stella", nome: "Stella Artois Long Neck", preco: 12, alcoolico: true },
            { id: "alm-stella-sg", nome: "Stella Artois Sem Glúten Long Neck", preco: 14, alcoolico: true },
            { id: "alm-budweiser", nome: "Budweiser Long Neck", preco: 10.9, alcoolico: true },
          ],
        },
      ],
    },
  ],
};
