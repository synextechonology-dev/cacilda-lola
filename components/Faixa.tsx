import s from "./Faixa.module.css";

const PALAVRAS = [
  "almoço caprichado",
  "coxinha de pernil",
  "bolo da Vó Lola",
  "cappuccino da casa",
  "pão da Vó Cacilda",
  "focaccia quentinha",
  "cerveja gelada",
  "happy hour",
];

/** Faixa que corre entre o início e o resto do site, como fita de embrulho de padaria. */
export function Faixa() {
  const trilha = (oculto: boolean) => (
    <ul className={s.trilha} aria-hidden={oculto || undefined}>
      {PALAVRAS.map((p) => (
        <li key={p}>
          <span>{p}</span>
          <span className={`cursiva ${s.e}`} aria-hidden="true">
            &amp;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={s.faixa} role="presentation">
      <div className={s.rolo}>
        {trilha(true)}
        {trilha(true)}
      </div>
    </div>
  );
}
