"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Escolha, Item } from "@/data/tipos";
import { subtotal, type LinhaComanda } from "@/lib/pedido";

type Contexto = {
  linhas: LinhaComanda[];
  quantidade: number;
  total: number;
  aberta: boolean;
  abrir: () => void;
  fechar: () => void;
  adicionar: (item: Item, cardapio: "geral" | "almoco", escolha?: Escolha) => void;
  mudarQtd: (chave: string, delta: number) => void;
  remover: (chave: string) => void;
  anotar: (chave: string, obs: string) => void;
  limpar: () => void;
  /** Última mensagem para leitores de tela e para o aviso visual. */
  aviso: { texto: string; id: number } | null;
};

const ComandaCtx = createContext<Contexto | null>(null);
const CHAVE_STORAGE = "cacilda-lola:comanda";

export function ComandaProvider({ children }: { children: ReactNode }) {
  const [linhas, setLinhas] = useState<LinhaComanda[]>([]);
  const [aberta, setAberta] = useState(false);
  const [aviso, setAviso] = useState<Contexto["aviso"]>(null);
  const [carregou, setCarregou] = useState(false);

  // Guarda a comanda no navegador para a pessoa não perder o pedido se recarregar a página.
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE);
      if (salvo) setLinhas(JSON.parse(salvo));
    } catch {
      /* navegador sem storage: segue só em memória */
    }
    setCarregou(true);
  }, []);

  useEffect(() => {
    if (!carregou) return;
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(linhas));
    } catch {
      /* ignora */
    }
  }, [linhas, carregou]);

  const adicionar = useCallback<Contexto["adicionar"]>((item, cardapio, escolha) => {
    const chave = escolha ? `${item.id}::${escolha.nome}` : item.id;
    const nomeAviso = escolha ? `${item.nome} (${escolha.nome})` : item.nome;
    setLinhas((atual) => {
      const existe = atual.find((l) => l.chave === chave);
      if (existe) return atual.map((l) => (l.chave === chave ? { ...l, qtd: l.qtd + 1 } : l));
      return [
        ...atual,
        {
          chave,
          itemId: item.id,
          nome: item.nome,
          escolha: escolha?.nome,
          precoUnit: escolha?.preco ?? item.preco,
          qtd: 1,
          alcoolico: item.alcoolico,
          cardapio,
        },
      ];
    });
    setAviso({ texto: `${nomeAviso} foi para a comanda`, id: Date.now() });
  }, []);

  const mudarQtd = useCallback((chave: string, delta: number) => {
    setLinhas((atual) =>
      atual.flatMap((l) => {
        if (l.chave !== chave) return [l];
        const qtd = l.qtd + delta;
        return qtd <= 0 ? [] : [{ ...l, qtd }];
      })
    );
  }, []);

  const remover = useCallback((chave: string) => setLinhas((a) => a.filter((l) => l.chave !== chave)), []);
  const anotar = useCallback(
    (chave: string, obs: string) => setLinhas((a) => a.map((l) => (l.chave === chave ? { ...l, obs } : l))),
    []
  );
  const limpar = useCallback(() => setLinhas([]), []);

  const valor = useMemo<Contexto>(
    () => ({
      linhas,
      quantidade: linhas.reduce((n, l) => n + l.qtd, 0),
      total: subtotal(linhas),
      aberta,
      abrir: () => setAberta(true),
      fechar: () => setAberta(false),
      adicionar,
      mudarQtd,
      remover,
      anotar,
      limpar,
      aviso,
    }),
    [linhas, aberta, adicionar, mudarQtd, remover, anotar, limpar, aviso]
  );

  return <ComandaCtx.Provider value={valor}>{children}</ComandaCtx.Provider>;
}

export function useComanda() {
  const ctx = useContext(ComandaCtx);
  if (!ctx) throw new Error("useComanda precisa estar dentro de <ComandaProvider>");
  return ctx;
}
