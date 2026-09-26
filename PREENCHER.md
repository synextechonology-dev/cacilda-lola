# O que falta preencher

Tudo que está aqui aparece no site entre [colchetes] ou como espaço de foto. Abra o site com `?revisao=1` no fim do endereço (ex.: `localhost:3000/?revisao=1`) para ver cada pendência marcada com um contorno rosa.

## 1. Perguntar para a Fancine

### Cardápio e pedidos
- [ ] **Preço dos sucos.** O cardápio geral diz laranja R$ 18 e limão R$ 15. O de almoço diz laranja R$ 12 e limão R$ 10. Qual vale? (`data/cardapio-geral.ts` e `data/cardapio-almoco.ts`)
- [ ] **Horário do almoço.** Das 11h até que horas? (`data/cardapio-almoco.ts`, campo `aviso`)
- [ ] **Sofioli:** o que é o prato e o que acompanha? (`data/cardapio-almoco.ts`)
- [ ] **Chopp.** A categoria do Instagram fala em chopp, mas o cardápio só tem long neck. Tem chopp? Se tiver, qual e quanto?
- [ ] **Petit Fubá com Goiabada** custa R$ 20 e os outros petits R$ 35. Está certo?
- [ ] **Taxa de entrega:** valor fixo, por bairro ou "a combinar"? (`data/site.ts` → `pedido.taxaEntrega`)
- [ ] **Área de entrega:** quais bairros ou até quantos km? (`data/site.ts` → `pedido.areaEntrega`)
- [ ] **Pedido mínimo** para entrega? (`data/site.ts` → `pedido.pedidoMinimo`)
- [ ] **Formas de pagamento:** Pix, cartão e dinheiro estão certos? Aceita vale-refeição? (`data/site.ts` → `pedido.formasPagamento`)
- [ ] O pedido pelo site pode ser feito para o almoço e para o cardápio geral ao mesmo tempo? Hoje pode.

### Um dia no bistrô
- [ ] Os horários dos três momentos (almoço 11h, café e bolo [15h], happy hour [17h]). (`data/site.ts` → `momentos`, campos `hora` e `inicio`)
  O campo `inicio` decide qual momento o site mostra como "agora" no topo da página e na régua do dia.

### Nossa história
O texto da seção já foi escrito só com o que o cardápio confirma (pão da Vó Cacilda na receita da família, bolos da Vó Lola). Mostrar para a Fancine e ajustar. (`components/Historia.tsx`)
- [ ] Confirmar a frase "A Fancine juntou essas receitas num endereço só".
- [ ] Quem foram (ou são) Cacilda e Lola e qual a relação com a Fancine.
- [ ] Como e quando o bistrô começou.
- [ ] O que ela quer que o cliente sinta ao entrar.
- [ ] 4 fotos antigas com ano e legenda (as duas, a cozinha, os primeiros dias, a inauguração ou outras). Preencher `ano` e `src` em `ALBUM` (`components/Historia.tsx`).

### O salão
- [ ] A casa recebe grupos e comemorações? O site hoje convida: "Vai reunir a turma ou comemorar alguma data? Chama a gente no WhatsApp". Se não fizer sentido, apagar esse parágrafo. (`components/Salao.tsx`)
- [ ] Tem área externa, wi-fi, espaço kids? Se tiver, vale uma frase. (`components/Salao.tsx`)

## 2. Fotos (ver `public/fotos/LEIA-ME.md`)
- [ ] 1 foto principal do salão ou da fachada (início do site)
- [ ] 3 fotos dos momentos: almoço, café e bolo, happy hour
- [ ] 5 fotos do espaço: fachada, salão, balcão e vitrine, cantinho do café, detalhe
- [ ] Fotos dos pratos em destaque (hoje 12 itens marcados com `destaque: true`; dá para diminuir)
- [ ] 4 fotos antigas para a história
- [ ] 1 imagem 1200x630 para quando o link for compartilhado (`public/og.jpg`)

## 3. Técnico
- [ ] Domínio final (`app/layout.tsx` → `URL_SITE`)
- [ ] Logo vetorial oficial (SVG), se existir. Hoje o logo é recriado em código a partir do manual (`components/Marca.tsx`, `app/icon.svg`)
- [ ] Link da Synex no rodapé (`data/site.ts` → `credito.url`)

## Já confirmado
WhatsApp (14) 99768-7855 · Instagram @cacildaelola.cafebistro · Av. Dr. Pedro Camarinha, 1043, Vila Saul, CEP 18908-040 · Segunda a sábado, 11h às 19h · Slogan "O único bistrô em Santa Cruz, do almoço ao happy hour" · Dona: Fancine · Cardápio geral e de almoço transcritos em 26/09/2026.
