# Fotos do site

Coloque aqui as fotos (JPG ou WebP, até ~400 KB cada, lado maior com 1600 px).
Depois preencha o caminho no lugar certo:

| Onde aparece | Arquivo sugerido | Onde preencher |
|---|---|---|
| Início (foto grande do salão) | `salao-principal.jpg` | `components/Hero.tsx` |
| Almoço / Café e bolo / Happy hour | `momento-almoco.jpg`, `momento-cafe.jpg`, `momento-happy.jpg` | `data/site.ts` → `momentos[].foto` |
| Destaques do cardápio | `prato-<id-do-item>.jpg` | `data/cardapio-*.ts` → campo `foto` do item |
| Galeria do salão (5 fotos) | `salao-1.jpg` ... `salao-5.jpg` | `components/Salao.tsx` → `FOTOS` |
| Álbum da história (4 fotos) | `historia-1.jpg` ... | `components/Historia.tsx` → `ALBUM` |
| Compartilhamento (WhatsApp/Instagram) | `/public/og.jpg` 1200x630 | já apontado em `app/layout.tsx` |

Caminho no código: `/fotos/nome-do-arquivo.jpg` (sem "public").
