import { Rotulo } from "./Rotulo";
import s from "./Marca.module.css";

type Props = {
  variante?: "principal" | "alternativa";
  /** Tamanho base; tudo escala a partir dele. */
  tamanho?: string;
  className?: string;
};

/**
 * Logo recriado em código a partir do manual (rótulo + "Cacilda & Lola" + "café · bistrô").
 * Se a Francine tiver o arquivo vetorial oficial (SVG), troque por ele aqui.
 */
export function Marca({ variante = "principal", tamanho = "1rem", className = "" }: Props) {
  const principal = variante === "principal";
  return (
    <span className={`${s.marca} ${className}`} style={{ fontSize: tamanho }}>
      <Rotulo
        className={`${s.placa} ${principal ? s.principal : s.alternativa}`}
        raio={11}
        recuo={5}
        espessura={1.1}
        corFilete={principal ? "var(--creme)" : "var(--laranja)"}
      >
        <span className={s.miolo}>
          <span className={`cursiva ${s.nome}`}>Cacilda &amp; Lola</span>
          <span className={s.linha} aria-hidden="true" />
          <span className={s.complemento}>café · bistrô</span>
        </span>
      </Rotulo>
    </span>
  );
}
