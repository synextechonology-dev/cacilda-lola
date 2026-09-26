"use client";

import { useEffect } from "react";

/**
 * Faz os blocos marcados com data-revelar surgirem ao entrar na tela.
 * Sem JavaScript (ou com prefers-reduced-motion) tudo aparece normalmente:
 * o CSS só esconde quando o <html> tem data-js, que o script do <head> coloca.
 */
export function Revelar() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-revelar]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-visto", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visto", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
