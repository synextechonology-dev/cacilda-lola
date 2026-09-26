"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import s from "./Rotulo.module.css";

/**
 * Caminho do filete interno da moldura "rótulo antigo":
 * retângulo com cantos côncavos, concêntricos ao recorte externo.
 */
export function caminhoRotulo(w: number, h: number, raio: number, recuo: number, ox = 0, oy = 0) {
  const R = raio + recuo;
  const d = recuo;
  const c = Math.sqrt(Math.max(R * R - d * d, 0));
  const p = (x: number, y: number) => `${+(x + ox).toFixed(2)} ${+(y + oy).toFixed(2)}`;
  return [
    `M ${p(c, d)}`,
    `L ${p(w - c, d)}`,
    `A ${R} ${R} 0 0 0 ${p(w - d, c)}`,
    `L ${p(w - d, h - c)}`,
    `A ${R} ${R} 0 0 0 ${p(w - c, h - d)}`,
    `L ${p(c, h - d)}`,
    `A ${R} ${R} 0 0 0 ${p(d, h - c)}`,
    `L ${p(d, c)}`,
    `A ${R} ${R} 0 0 0 ${p(c, d)}`,
    "Z",
  ].join(" ");
}

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Raio do recorte dos cantos, em px. */
  raio?: number;
  /** Distância do filete até a borda, em px. 0 = sem filete. */
  recuo?: number;
  /** Cor do filete. */
  corFilete?: string;
  /** Espessura do filete. */
  espessura?: number;
  /** Desenha um segundo filete (moldura dupla, como no elemento "Prato do dia"). */
  duplo?: boolean;
};

/**
 * Moldura de rótulo antigo, com cantos recortados e filete interno.
 * É o selo da casa: aparece no logo, nas fotos, nos destaques e na comanda.
 * O fundo vem do CSS de quem usa (background). Os cantos são recortados com máscara.
 */
export function Rotulo({
  children,
  className = "",
  style,
  raio = 14,
  recuo = 7,
  corFilete = "currentColor",
  espessura = 1.25,
  duplo = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tam, setTam] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || recuo <= 0) return;
    // Mede a caixa inteira (com padding), não só o conteúdo
    const ro = new ResizeObserver(() => {
      setTam({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [recuo]);

  return (
    <div
      ref={ref}
      className={`${s.rotulo} ${className}`}
      style={{ ["--r" as string]: `${raio}px`, ...style }}
    >
      {children}
      {tam && recuo > 0 && (
        <svg
          className={s.filete}
          width={tam.w}
          height={tam.h}
          viewBox={`0 0 ${tam.w} ${tam.h}`}
          aria-hidden="true"
          focusable="false"
        >
          <path d={caminhoRotulo(tam.w, tam.h, raio, recuo)} stroke={corFilete} strokeWidth={espessura} />
          {duplo && (
            <path
              d={caminhoRotulo(tam.w, tam.h, raio, recuo + 4)}
              stroke={corFilete}
              strokeWidth={espessura * 0.8}
            />
          )}
        </svg>
      )}
    </div>
  );
}
