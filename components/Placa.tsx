"use client";

import { useEffect, useState } from "react";
import { situacaoAgora, type Situacao } from "@/lib/horario";
import { Rotulo } from "./Rotulo";
import s from "./Placa.module.css";

/**
 * Plaquinha pendurada na porta: vira de "Aberto" para "Fechado" sozinha,
 * pelo horário de Brasília. Balança uma vez quando a página abre.
 */
export function Placa() {
  const [sit, setSit] = useState<Situacao | null>(null);

  useEffect(() => {
    const atualiza = () => setSit(situacaoAgora());
    atualiza();
    const t = setInterval(atualiza, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={s.suporte} aria-live="polite">
      <span className={s.prego} aria-hidden="true" />
      <div className={`${s.pendurada} ${sit ? s.balanca : ""}`}>
        <svg className={s.cordao} viewBox="0 0 120 40" aria-hidden="true" preserveAspectRatio="none">
          <path d="M60 2 L14 38 M60 2 L106 38" />
        </svg>
        <Rotulo
          className={`${s.placa} ${sit && !sit.aberto ? s.fechada : ""}`}
          raio={9}
          recuo={4.5}
          espessura={1}
          corFilete="var(--creme)"
        >
          <span className={`cursiva ${s.estado}`}>{sit ? (sit.aberto ? "Aberto" : "Fechado") : " "}</span>
          <span className={s.detalhe}>{sit?.detalhe ?? " "}</span>
        </Rotulo>
      </div>
    </div>
  );
}
