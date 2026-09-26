import type { Metadata, Viewport } from "next";
import { Josefin_Sans, Pacifico } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico", display: "swap" });
const josefin = Josefin_Sans({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

// PREENCHER: domínio final do site
const URL_SITE = "https://www.cacildaelola.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: "Cacilda & Lola | Café e bistrô em Santa Cruz do Rio Pardo",
  description:
    "Almoço, cafés, bolos da Vó Lola, salgados e cerveja gelada na Vila Saul, em Santa Cruz do Rio Pardo. Veja o cardápio e faça seu pedido pelo WhatsApp.",
  openGraph: {
    title: "Cacilda & Lola, café e bistrô",
    description: site.slogan,
    locale: "pt_BR",
    type: "website",
    // PREENCHER: imagem 1200x630 em /public/og.jpg
    images: ["/og.jpg"],
  },
  // O favicon vem de app/icon.svg (monograma C&L)
};

export const viewport: Viewport = {
  themeColor: "#2e3a34",
  width: "device-width",
  initialScale: 1,
};

/** Dados estruturados para o Google entender que é um restaurante, com horário e cardápio. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.nome,
  description: site.slogan,
  url: URL_SITE,
  telephone: "+55 14 99768-7855",
  servesCuisine: ["Brasileira", "Café", "Confeitaria"],
  priceRange: "R$",
  menu: `${URL_SITE}/#cardapio`,
  sameAs: [site.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "19:00",
    },
  ],
};

/**
 * Roda antes da primeira pintura:
 * 1. marca a primeira visita da sessão para a animação de entrada (sem piscar);
 * 2. liga o modo revisão com ?revisao=1.
 */
const scriptInicial = `(function(){try{var h=document.documentElement;
if(/[?&]revisao=1/.test(location.search))h.setAttribute('data-revisao','');
var calmo=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!calmo)h.setAttribute('data-js','');
if(!calmo&&!sessionStorage.getItem('cacilda-lola:entrou')&&!location.hash)h.setAttribute('data-entrada','');
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${pacifico.variable} ${josefin.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicial }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
