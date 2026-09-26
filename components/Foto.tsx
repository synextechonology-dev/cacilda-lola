import s from "./Foto.module.css";

type Props = {
  /** O que deve aparecer na foto. Vira o alt quando a foto real entrar. */
  legenda: string;
  /** Caminho em /public, ex.: "/fotos/salao-1.jpg". Vazio = espaço reservado. */
  src?: string;
  /** Proporção largura/altura, ex.: "4 / 5". */
  proporcao?: string;
  tom?: "claro" | "escuro";
  className?: string;
  prioridade?: boolean;
};

/**
 * Foto real ou espaço reservado com a descrição do que fotografar.
 * Quando for para produção, dá para trocar o <img> por next/image.
 */
export function Foto({ legenda, src, proporcao = "4 / 5", tom = "claro", className = "", prioridade }: Props) {
  if (src) {
    return (
      <img
        className={`${s.foto} ${className}`}
        src={src}
        alt={legenda}
        style={{ aspectRatio: proporcao }}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`${s.foto} ${s.reservado} ${tom === "escuro" ? s.escuro : s.claro} ${className}`}
      style={{ aspectRatio: proporcao }}
      role="img"
      aria-label={`Foto em breve: ${legenda}`}
      data-provisorio
    >
      <span className={`cursiva ${s.e}`} aria-hidden="true">
        &amp;
      </span>
      <span className={s.texto}>
        <span className={s.emBreve}>foto em breve</span>
        {legenda}
      </span>
    </div>
  );
}
