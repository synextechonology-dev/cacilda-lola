import type { Cardapio } from "./tipos";

/**
 * Cardápio geral, transcrito do cardápio oficial (Canva) em 26/09/2026.
 * Preços em reais. Para mudar um preço, altere só o número.
 */
export const cardapioGeral: Cardapio = {
  id: "geral",
  nome: "Cardápio geral",
  grupos: [
    {
      id: "salgados",
      nome: "Salgados e petiscos",
      secoes: [
        {
          id: "salgados",
          titulo: "Salgados",
          nota: "Tem mais opções na vitrine. Pergunte no balcão.",
          itens: [
            {
              id: "coxinha-pernil",
              nome: "Coxinha de Pernil com Requeijão",
              preco: 10.5,
              destaque: true,
              descricao:
                "Nossa releitura do salgado mais amado: massa leve, crocante e dourada, com recheio de pernil preparado lentamente e desfiado à mão, no tempero especial da casa.",
            },
            { id: "coxinha-costela", nome: "Coxinha de Costela com Cream Cheese", preco: 12 },
            { id: "coxinha-frango", nome: "Coxinha de Frango com Requeijão", preco: 10.5 },
            { id: "pao-queijo", nome: "Pão de Queijo", preco: 6 },
            { id: "pao-batata", nome: "Pão de Batata com Requeijão", preco: 10.5 },
            { id: "bauruzinho", nome: "Bauruzinho", preco: 10.5 },
            { id: "doguinho", nome: "Doguinho", preco: 10.5 },
            { id: "esfiha-carne", nome: "Esfiha de Carne", preco: 10.5 },
            { id: "esfiha-calabresa", nome: "Esfiha de Calabresa", preco: 10.5 },
            { id: "croissant-presunto", nome: "Croissant de Presunto e Queijo", preco: 14.5 },
            { id: "croissant-4queijos", nome: "Croissant de Quatro Queijos", preco: 14.5 },
            { id: "croissant-frango", nome: "Croissant de Frango com Requeijão", preco: 14.5 },
            { id: "croissant-chocolate", nome: "Croissant de Chocolate", preco: 14.5 },
            { id: "pastel-palmito", nome: "Pastel de Forno de Palmito", preco: 12.5 },
          ],
        },
        {
          id: "saladas",
          titulo: "Saladas",
          itens: [
            {
              id: "salada-caesar",
              nome: "Caesar",
              preco: 30,
              descricao: "Alface americana, peito de frango, croutons, molho caesar e parmesão ralado.",
            },
            {
              id: "salada-dona-lola",
              nome: "Dona Lola",
              preco: 40,
              descricao: "Rosbife caseiro, rúcula, tomate cereja, lascas de parmesão e molho balsâmico.",
            },
            {
              id: "salada-dona-cacilda",
              nome: "Dona Cacilda",
              preco: 30,
              destaque: true,
              descricao:
                "Mix de folhas frescas, cenoura, repolho roxo, mix de queijos, bacon, tortilha crocante e molho de iogurte.",
            },
          ],
        },
        {
          id: "aperitivos",
          titulo: "Aperitivos",
          itens: [
            { id: "batata-tradicional", nome: "Batata Frita Tradicional", preco: 35 },
            { id: "batata-queijo-bacon", nome: "Batata Frita com Queijo e Bacon", preco: 45 },
            { id: "batata-costela", nome: "Batata Frita com Costela Desfiada", preco: 45 },
            { id: "bolinho-costela", nome: "Bolinho de Costela Desfiada", preco: 45 },
            { id: "coxinha-asa", nome: "Coxinha da Asa", preco: 65, destaque: true },
          ],
        },
      ],
    },
    {
      id: "lanches",
      nome: "Lanches e focaccias",
      secoes: [
        {
          id: "lanches-vo-cacilda",
          titulo: "Lanches da Vó Cacilda",
          intro:
            "Pão caseiro feito na receita tradicional da família: saboroso, fofinho e leve.",
          itens: [
            { id: "pao-manteiga", nome: "Pão Simples ou na Chapa com Manteiga", preco: 8 },
            { id: "pao-geleia", nome: "Pão com Geleia de Morango", preco: 10 },
            { id: "pao-nutella", nome: "Pão com Nutella", preco: 14 },
            { id: "pao-meio-meio", nome: "Pão ½ Manteiga ½ Nutella", preco: 12 },
            { id: "pao-presunto", nome: "Pão com Presunto, Queijo Muçarela e Tomate", preco: 15 },
            {
              id: "pao-salame",
              nome: "Pão com Salame Italiano, Queijo Prato, Rúcula e Tomate",
              preco: 22,
              destaque: true,
            },
          ],
        },
        {
          id: "sanduiches",
          titulo: "Sanduíches naturais",
          itens: [
            { id: "natural-atum", nome: "Patê de Atum, Cenoura, Alface e Tomate", preco: 15.5 },
            { id: "natural-frango", nome: "Patê de Frango, Cenoura, Alface e Tomate", preco: 15.5 },
          ],
        },
        {
          id: "tortas",
          titulo: "Tortas salgadas",
          itens: [
            { id: "torta-frango", nome: "Torta de Frango com Requeijão", preco: 15 },
            { id: "torta-pernil", nome: "Torta de Pernil com Requeijão", preco: 18 },
            { id: "torta-fraldinha", nome: "Torta de Fraldinha", preco: 20 },
            { id: "torta-alho-poro", nome: "Torta de Alho Poró e Abobrinha", preco: 15 },
          ],
        },
        {
          id: "focaccia",
          titulo: "Focaccia",
          intro:
            "Fatia generosa de pão rústico, assado devagar até ficar dourado e crocante por fora, macio e aerado por dentro. Vai azeite extravirgem, alecrim e sal grosso.",
          itens: [
            {
              id: "focaccia-rosbife",
              nome: "Focaccia de Rosbife",
              preco: 30,
              descricao: "Com queijo prato, rúcula e molho balsâmico.",
            },
            {
              id: "focaccia-tomate",
              nome: "Focaccia de Tomate Confit",
              preco: 35,
              descricao: "Com lâminas de abobrinha, stracciatella e pesto de manjericão.",
            },
            {
              id: "focaccia-pernil",
              nome: "Focaccia de Pernil",
              preco: 30,
              descricao: "Com queijo prato e cebolas caramelizadas.",
            },
            {
              id: "focaccia-mortadela",
              nome: "Focaccia de Mortadela Ceratti",
              preco: 33,
              destaque: true,
              descricao: "Com cream cheese, rúcula, azeite e parmesão.",
            },
          ],
        },
        {
          id: "ovos",
          titulo: "Ovos mexidos",
          itens: [{ id: "ovos-mexidos", nome: "Ovos Mexidos", preco: 12, descricao: "3 ovos." }],
        },
        {
          id: "adicionais-lanches",
          titulo: "Adicionais",
          intro: "Para completar o lanche ou os ovos.",
          itens: [
            { id: "add-pao-vo", nome: "Pão da Vó Cacilda", preco: 4 },
            { id: "add-brioche", nome: "Pão Brioche Fatia", preco: 3 },
            { id: "add-bacon", nome: "Bacon", preco: 5 },
            { id: "add-molho-salsicha", nome: "Molho de Tomate com Salsicha", preco: 6 },
            { id: "add-geleia", nome: "Geleia", preco: 5 },
            { id: "add-manteiga", nome: "Manteiga", preco: 6 },
          ],
        },
      ],
    },
    {
      id: "doces",
      nome: "Doces e bolos",
      secoes: [
        {
          id: "delicias-doces",
          titulo: "Outras delícias doces",
          nota: "Tem mais opções na vitrine.",
          itens: [
            {
              id: "cinnamon-roll",
              nome: "Cinnamon Rolls",
              preco: 9,
              descricao:
                "Rolinho fofinho e levemente adocicado, com canela, açúcar caramelizado e cobertura cremosa.",
            },
            {
              id: "cannoli",
              nome: "Cannoli da Nonna",
              preco: 9,
              descricao:
                "Direto da tradição italiana: massa crocante em formato de canudo, com o recheio que você escolher. Nutella sai por R$ 13,00.",
              opcao: {
                rotulo: "Recheio",
                escolhas: [
                  { nome: "Creme" },
                  { nome: "Doce de leite" },
                  { nome: "Brigadeiro" },
                  { nome: "Nutella", preco: 13 },
                ],
              },
            },
            {
              id: "brownie",
              nome: "Brownie",
              preco: 12,
              descricao:
                "Nosso Brownie Super Fudge: macio, com textura única e chocolate intenso. Vai bem com café, com sorvete ou sozinho.",
            },
            {
              id: "brownie-sorvete",
              nome: "Brownie com Sorvete de Creme, Calda de Chocolate e Chantilly",
              preco: 25,
              destaque: true,
            },
          ],
        },
        {
          id: "cookies",
          titulo: "Cookies",
          intro: "Cookie artesanal, crocante por fora e macio por dentro.",
          itens: [
            { id: "cookie-classico", nome: "Clássico", preco: 10 },
            { id: "cookie-nutella", nome: "Nutella", preco: 13 },
            { id: "cookie-duplo", nome: "Duplo Chocolate", preco: 12 },
          ],
        },
        {
          id: "bolos",
          titulo: "Bolos da Vó Lola",
          nota: "Bolo inteiro: consulte a disponibilidade. Os sabores do dia ficam na vitrine.",
          itens: [
            {
              id: "bolo-supremo",
              nome: "Bolo Chocolate Supremo (fatia)",
              preco: 25,
              destaque: true,
              descricao:
                "Camadas de massa fofinha e bem úmida, recheio de chocolate nobre e ganache cremosa de chocolate meio amargo por cima.",
            },
            {
              id: "bolo-merengue",
              nome: "Bolo Merengue de Morango (fatia)",
              preco: 30,
              destaque: true,
              descricao:
                "Massa de baunilha fofinha, camadas de suspiro crocante, creme aveludado e muito morango. Finaliza com pedacinhos de chocolate branco.",
            },
            {
              id: "petit-ninho",
              nome: "Petit Ninho com Nutella",
              preco: 35,
              descricao: "Massa de baunilha com cobertura de brigadeiro de ninho e Nutella.",
            },
            {
              id: "petit-dois-amores",
              nome: "Petit Dois Amores",
              preco: 35,
              descricao: "Massa de chocolate com cobertura de brigadeiro e brigadeiro branco.",
            },
            {
              id: "petit-cenoura",
              nome: "Petit Cenoura",
              preco: 35,
              descricao: "Massa de cenoura com cobertura de brigadeiro.",
            },
            {
              id: "petit-chocolate",
              nome: "Petit Chocolate",
              preco: 35,
              descricao: "Massa de chocolate com cobertura de brigadeiro.",
            },
            { id: "petit-fuba", nome: "Petit Fubá com Goiabada", preco: 20 },
          ],
        },
      ],
    },
    {
      id: "bebidas",
      nome: "Cafés e bebidas",
      secoes: [
        {
          id: "bebidas-quentes",
          titulo: "Bebidas quentes",
          itens: [
            { id: "espresso", nome: "Café Espresso", preco: 6 },
            { id: "espresso-duplo", nome: "Café Espresso Duplo", preco: 10 },
            { id: "macchiato", nome: "Macchiato", preco: 7, descricao: "Espresso com espuma de leite." },
            { id: "latte", nome: "Café Latte", preco: 10, descricao: "Café, leite e espuma de leite." },
            {
              id: "cappuccino-casa",
              nome: "Cappuccino da Casa",
              preco: 14,
              descricao: "Café, leite, chocolate em pó e canela.",
            },
            {
              id: "cappuccino-submarino",
              nome: "Cappuccino Submarino",
              preco: 18,
              descricao: "Café, leite, chocolate em pó, canela e raspas de chocolate.",
            },
            { id: "chocolate-quente", nome: "Chocolate", preco: 15, descricao: "Leite e chocolate ao leite." },
          ],
        },
        {
          id: "bebidas-geladas",
          titulo: "Bebidas geladas",
          itens: [
            { id: "latte-gelado", nome: "Latte Gelado", preco: 17, descricao: "Café, leite e chantilly." },
            {
              id: "cappuccino-gelado",
              nome: "Cappuccino Gelado",
              preco: 17,
              descricao: "Café, leite, chocolate em pó, gelo, canela e chantilly.",
            },
            {
              id: "vienense",
              nome: "Café Vienense Cremoso",
              preco: 28,
              destaque: true,
              descricao: "Ganache de chocolate, café, sorvete de creme, canela e chantilly.",
            },
            {
              id: "freddo",
              nome: "Cappuccino Freddo",
              preco: 20,
              descricao: "Café, sorvete de creme, leite, canela e chantilly.",
            },
            {
              id: "freddo-nutella",
              nome: "Cappuccino Freddo Nutella",
              preco: 25,
              descricao: "Café, sorvete de creme, leite, borda de Nutella, canela e chantilly.",
            },
            {
              id: "freddo-doce-leite",
              nome: "Cappuccino Freddo Doce de Leite",
              preco: 22,
              descricao: "Café, sorvete de creme, leite, borda de doce de leite e chantilly.",
            },
            {
              id: "shake-chocolate",
              nome: "Milk Shake de Chocolate",
              preco: 25,
              descricao: "Sorvete, leite, calda de chocolate e chantilly.",
            },
            {
              id: "shake-creme",
              nome: "Milk Shake de Creme",
              preco: 25,
              descricao: "Sorvete, leite, calda de caramelo e chantilly.",
            },
            {
              id: "shake-morango",
              nome: "Milk Shake de Morango",
              preco: 25,
              descricao: "Sorvete, leite, calda de morango e chantilly.",
            },
          ],
        },
        {
          id: "adicionais-bebidas",
          titulo: "Adicionais das bebidas",
          itens: [
            { id: "add-nutella", nome: "Nutella", preco: 9 },
            { id: "add-chantilly", nome: "Chantilly", preco: 3 },
            { id: "add-doce-leite", nome: "Doce de Leite", preco: 4 },
          ],
        },
        {
          id: "bebidas",
          titulo: "Sucos e refrigerantes",
          itens: [
            {
              id: "soda-italiana",
              nome: "Soda Italiana",
              preco: 15,
              opcao: {
                rotulo: "Sabor",
                escolhas: [{ nome: "Frutas vermelhas" }, { nome: "Maçã verde" }, { nome: "Limão siciliano" }],
              },
            },
            { id: "suco-laranja", nome: "Suco Natural de Laranja", preco: 18 },
            { id: "suco-limao", nome: "Suco Natural de Limão", preco: 15 },
            {
              id: "suco-polpa",
              nome: "Suco Natural de Polpa",
              preco: 15,
              opcao: {
                rotulo: "Sabor",
                escolhas: [{ nome: "Maracujá" }, { nome: "Morango" }, { nome: "Abacaxi" }],
              },
            },
            { id: "agua", nome: "Água Mineral / Água com Gás", preco: 6 },
            { id: "refrigerante", nome: "Refrigerante Lata", preco: 8 },
            { id: "h2oh", nome: "H2OH! e Limoneto", preco: 9 },
          ],
        },
        {
          id: "alcoolicas",
          titulo: "Cervejas",
          nota: "Proibida a venda de bebidas alcoólicas para menores de 18 anos. Se beber, não dirija.",
          itens: [
            { id: "heineken", nome: "Heineken Long Neck", preco: 12, alcoolico: true },
            { id: "corona", nome: "Corona Long Neck", preco: 14, alcoolico: true },
            { id: "stella", nome: "Stella Artois Long Neck", preco: 12, alcoolico: true },
            { id: "stella-sg", nome: "Stella Artois Sem Glúten Long Neck", preco: 14, alcoolico: true },
            { id: "budweiser", nome: "Budweiser Long Neck", preco: 10.9, alcoolico: true },
          ],
        },
      ],
    },
  ],
};
