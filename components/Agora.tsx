"use client";

import { site } from "@/data/site";
import { useAgora } from "@/lib/useAgora";
import s from "./Agora.module.css";

const destino = (d: string) => (d === "almoco" ? "#almoco" : `#grupo-${d}`);

/**
 * A linha do herói que sabe que horas são em Santa Cruz:
 * "São 15h20 na Vila Saul. Hora do café com bolo." com link para a folha certa do cardápio.
 */
export function Agora() {
  const agora = useAgora();

  if (!agora) return <p className={s.agora} aria-hidden="true">&nbsp;</p>;

  const m = site.momentos[agora.indice];
  return (
    <p className={`${s.agora} ${s.visivel}`}>
      <span className={`${s.ponto} ${m ? s.aceso : ""}`} aria-hidden="true" />
      <span>
        São <strong>{agora.relogio}</strong> na Vila Saul.{" "}
        {m ? (
          <a href={destino(m.destino)} className={s.link}>
            {m.chamada}
          </a>
        ) : (
          <>
            A cozinha está descansando,{" "}
            <a href="#cardapio" className={s.link}>
              mas o cardápio fica aberto
            </a>
          </>
        )}
        .
      </span>
    </p>
  );
}
