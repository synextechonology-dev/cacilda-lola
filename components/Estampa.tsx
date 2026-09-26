import s from "./Estampa.module.css";

/**
 * Estampa "&": o encontro de Cacilda e Lola (manual, elemento gráfico 04).
 * Um "&" laranja a cada três, os outros em sálvia.
 */
export function Estampa({ linhas = 3, colunas = 24, className = "" }: { linhas?: number; colunas?: number; className?: string }) {
  return (
    <div className={`${s.estampa} ${className}`} aria-hidden="true">
      {Array.from({ length: linhas }, (_, l) => (
        <div key={l} className={s.linha}>
          {Array.from({ length: colunas }, (_, c) => (
            <span key={c} className={`cursiva ${c % 3 === 0 ? s.laranja : ""}`}>
              &amp;
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
