export type Escolha = {
  nome: string;
  /** Preço quando a escolha muda o valor do item. Sem preço = mesmo valor do item. */
  preco?: number;
};

export type Opcao = {
  /** Ex.: "Recheio", "Sabor" */
  rotulo: string;
  escolhas: Escolha[];
};

export type Item = {
  id: string;
  nome: string;
  preco: number;
  descricao?: string;
  opcao?: Opcao;
  /** Caminho em /public/fotos. Enquanto vazio, o site mostra um espaço reservado. */
  foto?: string;
  /** Aparece com foto em destaque no topo da seção. */
  destaque?: boolean;
  /** Pede confirmação de maioridade na comanda. */
  alcoolico?: boolean;
};

export type Secao = {
  id: string;
  /** Título em Pacifico: até 6 palavras, nunca em caixa-alta (manual da marca). */
  titulo: string;
  intro?: string;
  nota?: string;
  itens: Item[];
};

export type Grupo = {
  id: string;
  nome: string;
  secoes: Secao[];
};

export type Cardapio = {
  id: "geral" | "almoco";
  nome: string;
  aviso?: string;
  grupos: Grupo[];
};
