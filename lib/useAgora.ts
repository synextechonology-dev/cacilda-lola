"use client";

import { useEffect, useState } from "react";
import { momentoAgora, type MomentoAgora } from "./horario";

/**
 * Momento do dia no bistrô, atualizado a cada minuto.
 * Devolve null no servidor e no primeiro render (evita diferença de hidratação).
 */
export function useAgora() {
  const [agora, setAgora] = useState<MomentoAgora | null>(null);
  useEffect(() => {
    const atualiza = () => setAgora(momentoAgora());
    atualiza();
    const t = setInterval(atualiza, 60_000);
    return () => clearInterval(t);
  }, []);
  return agora;
}
