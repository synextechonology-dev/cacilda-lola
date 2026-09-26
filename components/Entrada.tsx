"use client";

import { useCallback, useEffect, useState } from "react";
import { caminhoRotulo } from "./Rotulo";
import s from "./Entrada.module.css";

const W = 380;
const H = 200;

/**
 * A primeira impressão: na primeira visita da sessão, a tela é o rótulo da casa.
 * O rótulo se dissolve e vira uma janela que cresce até revelar o bistrô,
 * como quem atravessa a porta. Dura menos de 2 segundos e some com um toque.
 *
 * Quem decide se aparece é o script no <head> (app/layout.tsx), antes da pintura,
 * para não piscar: ele marca <html data-entrada> na primeira visita.
 * Quem prefere menos movimento (prefers-reduced-motion) não vê a animação.
 */
export function Entrada() {
  const [fase, setFase] = useState<"parada" | "abrindo" | "fim">("parada");

  const terminar = useCallback(() => {
    document.documentElement.removeAttribute("data-entrada");
    try {
      sessionStorage.setItem("cacilda-lola:entrou", "1");
    } catch {
      /* ignora */
    }
    setFase("fim");
  }, []);

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-entrada")) {
      setFase("fim");
      return;
    }
    const t1 = setTimeout(() => setFase("abrindo"), 1050);
    const t2 = setTimeout(terminar, 2250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [terminar]);

  if (fase === "fim") return null;

  return (
    <div className={`${s.entrada} ${fase === "abrindo" ? s.abrindo : ""}`} onClick={terminar} aria-hidden="true">
      <svg className={s.svg} viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid slice">
        {/* Parede verde com a porta em forma de rótulo */}
        <path
          className={s.parede}
          fillRule="evenodd"
          d={`M -6000 -6000 H 6000 V 6000 H -6000 Z ${caminhoRotulo(W, H, 22, 0, -W / 2, -H / 2)}`}
        />
        {/* O logo, que se dissolve */}
        <g className={s.logo}>
          <path d={caminhoRotulo(W, H, 22, 0, -W / 2, -H / 2)} fill="var(--laranja)" />
          <path
            d={caminhoRotulo(W, H, 22, 11, -W / 2, -H / 2)}
            fill="none"
            stroke="var(--creme)"
            strokeWidth="2"
          />
          <text x="0" y="-2" textAnchor="middle" className={s.nome}>
            Cacilda &amp; Lola
          </text>
          <line x1="-95" x2="95" y1="26" y2="26" stroke="var(--creme)" strokeWidth="1.5" />
          <text x="4" y="58" textAnchor="middle" className={s.complemento}>
            café · bistrô
          </text>
        </g>
      </svg>
      <span className={s.pular}>toque para entrar</span>
    </div>
  );
}
