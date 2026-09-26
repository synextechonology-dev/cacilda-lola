import s from "./Selo.module.css";

/**
 * Selo redondo com texto girando em volta de um "&".
 * Ecoa o recado do manual ("feito com carinho / desde a primeira fornada").
 */
export function Selo({ texto = "feito com carinho · desde a primeira fornada · ", className = "" }) {
  return (
    <div className={`${s.selo} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={s.giro}>
        <defs>
          <path id="selo-circulo" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className={s.texto}>
          <textPath href="#selo-circulo" textLength="462">
            {texto}
          </textPath>
        </text>
      </svg>
      <span className={`cursiva ${s.e}`}>&amp;</span>
    </div>
  );
}
