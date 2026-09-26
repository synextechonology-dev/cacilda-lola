"use client";

import { useEffect, useState } from "react";
import { Marca } from "./Marca";
import { useComanda } from "./ComandaContexto";
import s from "./Cabecalho.module.css";

const LINKS = [
  { href: "#cardapio", texto: "Cardápio" },
  { href: "#almoco", texto: "Almoço" },
  { href: "#historia", texto: "Nossa história" },
  { href: "#visite", texto: "Como chegar" },
];

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { quantidade, abrir } = useComanda();

  useEffect(() => {
    if (!menuAberto) return;
    const fecha = (e: KeyboardEvent) => e.key === "Escape" && setMenuAberto(false);
    window.addEventListener("keydown", fecha);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fecha);
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  return (
    <header className={s.cabecalho}>
      <div className={`conteiner ${s.barra}`}>
        <a href="#inicio" className={s.logo} aria-label="Cacilda & Lola, voltar ao início">
          <Marca tamanho="0.62rem" />
        </a>

        <nav className={`${s.nav} ${menuAberto ? s.navAberta : ""}`} aria-label="Principal" id="menu-principal">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenuAberto(false)}>
                  {l.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.acoes}>
          <button type="button" className={`botao botao-laranja ${s.comanda}`} onClick={abrir}>
            <span className={s.comandaTexto}>Comanda</span>
            <span className={s.contador} aria-label={`${quantidade} ${quantidade === 1 ? "item" : "itens"}`}>
              {quantidade}
            </span>
          </button>
          <button
            type="button"
            className={s.hamburguer}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            onClick={() => setMenuAberto((v) => !v)}
          >
            <span className="visualmente-oculto">{menuAberto ? "Fechar menu" : "Abrir menu"}</span>
            <span className={s.tracos} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
