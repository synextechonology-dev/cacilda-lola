# Cacilda & Lola: site do café e bistrô

Site de uma página para o Cacilda & Lola (café · bistrô), na Av. Dr. Pedro Camarinha, 1043, Vila Saul, Santa Cruz do Rio Pardo (SP). Dona: Francine. Projeto da agência Synex (João). Cliente em prospecção: o site precisa impressionar na primeira visita.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- CSS puro: `app/globals.css` (tokens da marca) + CSS Modules por componente. Sem Tailwind, sem biblioteca de UI.
- Fontes via `next/font/google`: Pacifico e Josefin Sans.
- Nenhum backend. O pedido vira uma mensagem de WhatsApp (`wa.me`), montada em `lib/pedido.ts`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

`?revisao=1` no endereço contorna em rosa todo conteúdo provisório (`data-provisorio`).

## Identidade visual (manual V1 · 2026), regras que o código segue
- Cores: Verde Cacilda `#2E3A34` (fundo principal e texto), Laranja Lola `#E2733A` (logo e destaques, em pequenas doses), Creme `#F5EDE0`, Terracota `#B8582A` (texto laranja sobre fundo claro), Sálvia `#5E6B63` (texto secundário), Kraft `#E9DFCE`. Proporção 60 verde, 25 creme, 15 laranja.
- Pacifico só em títulos curtos (até 6 palavras), nunca em caixa-alta. Josefin Sans organiza: cardápio, preços, endereço. Rótulos em caixa-alta com espaçamento 0,2 a 0,3em (`.rotulo-caixa`).
- Moldura "rótulo antigo" (cantos recortados + filete): componente `Rotulo`. Usada no logo, fotos, placa e mapa.
- Estampa "&" (um laranja a cada três): componente `Estampa`.
- Filete + recado ("feito com carinho / desde a primeira fornada"): na seção História.
- Cardápio segue o modelo A4 do manual: papel creme, seções em cursiva verde, itens com pontilhado até o preço, laranja só no nome da casa, uma vez por folha.
- Não distorcer o logo; não aplicar o logo sobre foto sem a moldura cheia.

## Mapa do projeto
- `data/site.ts`: contato, endereço, horário, config de pedido (taxa, mínimo, pagamento), momentos do dia. **Comece por aqui.**
- `data/cardapio-geral.ts`, `data/cardapio-almoco.ts`: cardápios (transcritos dos .docx do cliente). IDs do almoço começam com `alm-`.
- `data/tipos.ts`: tipos do cardápio (item com `opcao` para recheio/sabor, `destaque` para foto, `alcoolico` para exigir 18+).
- `lib/horario.ts`: aberto/fechado no fuso America/Sao_Paulo (placa do topo e aviso na comanda).
- `lib/pedido.ts`: validação e texto da mensagem do WhatsApp.
- `components/`:
  - `Entrada`: animação da primeira visita (rótulo vira porta). O script em `app/layout.tsx` decide antes da pintura; respeita `prefers-reduced-motion`; some ao tocar; roda uma vez por sessão.
  - `Cabecalho`, `Hero` (título palavra a palavra, `Placa` "Aberto/Fechado", `Selo` giratório e `Agora`: "São 15h20 na Vila Saul. Hora do café com bolo"), `Faixa` (fita laranja que corre), `UmDia` (régua do dia com o ponteiro do "agora"; carrossel no celular), `Cardapio` (abas geral/almoço, uma folha por vez com marcadores e "Virar a página", destaques com foto, escolha de recheio, "como pedir" em 3 passos), `Salao`, `Historia` (álbum com cantoneiras), `Visite` (mapa embed do Google sem chave, bilhete preso no mapa, "Traçar rota" e o dia de hoje destacado no horário), `Rodape` (chamada final "Bateu vontade?").
  - `Revelar`: blocos com `data-revelar` surgem ao rolar. Só esconde quando o `<head>` marcou `html[data-js]` (não marca com `prefers-reduced-motion`). Atraso opcional com a variável CSS `--atraso`.
  - `lib/horario.ts` → `momentoAgora()` e `lib/useAgora.ts`: qual momento do dia está acontecendo, no fuso de Brasília.
  - `ComandaContexto` (estado do pedido, salvo no localStorage) e `Comanda` (botão flutuante em forma de ticket + gaveta com o formulário).
- `PREENCHER.md`: tudo que ainda depende do cliente.

## Fundos das seções (alternados, de propósito)
Início verde · Faixa laranja · Do almoço ao happy hour creme · Cardápio kraft com folhas creme · Salão verde · Nossa história creme · Como chegar sálvia · Rodapé verde escuro. Manter a alternância ao criar seções novas.

## Convenções
- Textos do site em português do Brasil, frases curtas, voz da casa (acolhedora, sem exagero). Evitar travessão (—) nos textos visíveis.
- Botões dizem o que acontece ("Enviar pedido pelo WhatsApp", não "Enviar").
- Todo espaço de foto usa `<Foto legenda="o que fotografar" src="" />`. Quando houver a foto, preencher `src` (ou migrar para `next/image`).
- Máscara CSS corta `box-shadow`: em elementos com `Rotulo`, a sombra vai no pai com `filter: drop-shadow`.
- Não usar `backdrop-filter` no cabeçalho: quebra o menu fixo do celular.
- Acessibilidade: foco visível laranja, alvos de toque de 44px, gaveta com foco preso e Esc, `aria-live` quando um item entra na comanda.

## Próximos passos sugeridos
1. Preencher `PREENCHER.md` com a Francine e trocar as fotos.
2. Rodar `npm run build` e testar a mensagem do pedido num WhatsApp de teste antes de apontar para o número real.
3. Se o cardápio mudar com frequência, mover `data/cardapio-*.ts` para um CMS simples ou planilha.
4. Publicar na Vercel e configurar o domínio.
