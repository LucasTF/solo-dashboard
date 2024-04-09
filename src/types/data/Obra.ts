import { Arquivo, Obra } from "@prisma/client";

export type TableObra = {
  id: number;
  cod_obra: string;
  ano: number;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cliente: string;
  proprietario: string | null;
};

export type BaseObra = Pick<
  Obra,
  | "id"
  | "cod_obra"
  | "ano"
  | "tipo_logo"
  | "logradouro"
  | "cidade"
  | "bairro"
  | "uf"
> & {
  cliente: {
    nome: string;
  };
  proprietario: {
    nome: string;
  } | null;
};

// TODO: Add options for sondagem type
export type ModifyObra = BaseObra &
  Pick<
    Obra,
    | "complemento_logo"
    | "quadra"
    | "num_obra"
    | "data_inicio"
    | "data_fim"
    | "lote"
  >;

export type EntryObra = Omit<Obra, "clienteId" | "proprietarioId"> & {
  arquivos: Arquivo[] | null;
  cliente: {
    id: number;
    nome: string;
  };
  proprietario: {
    id: number;
    nome: string;
  } | null;
};
