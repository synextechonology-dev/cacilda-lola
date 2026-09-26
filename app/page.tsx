import { Cabecalho } from "@/components/Cabecalho";
import { Cardapio } from "@/components/Cardapio";
import { Comanda } from "@/components/Comanda";
import { ComandaProvider } from "@/components/ComandaContexto";
import { Entrada } from "@/components/Entrada";
import { Faixa } from "@/components/Faixa";
import { Hero } from "@/components/Hero";
import { Historia } from "@/components/Historia";
import { Revelar } from "@/components/Revelar";
import { Rodape } from "@/components/Rodape";
import { Salao } from "@/components/Salao";
import { UmDia } from "@/components/UmDia";
import { Visite } from "@/components/Visite";

/**
 * Ordem das seções e seus fundos (alternados, seguindo o manual: 60 verde · 25 creme · 15 laranja):
 * Início (verde) · Faixa laranja · Do almoço ao happy hour (creme) · Cardápio (kraft, folhas creme)
 * · Salão (verde) · Nossa história (creme) · Como chegar (sálvia) · Rodapé (verde escuro)
 */
export default function Pagina() {
  return (
    <ComandaProvider>
      <Entrada />
      <Cabecalho />
      <main>
        <Hero />
        <Faixa />
        <UmDia />
        <Cardapio />
        <Salao />
        <Historia />
        <Visite />
      </main>
      <Rodape />
      <Comanda />
      <Revelar />
    </ComandaProvider>
  );
}
