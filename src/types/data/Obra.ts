import * as z from "zod";

import { ObraFormSchema } from "@/schemas";
import Arquivo from "./Arquivo";
import Cliente from "./Cliente";
import {
  Sondagem_Percussao,
  Sondagem_Rotativa,
  Sondagem_Trado,
} from "./Sondagem";

export type Obra = {
  id: number;
  cod_obra: string;
  num_obra: number;
  ano: number;
  data_inicio: Date;
  data_fim: Date;
  tipo_logo: string | null;
  logradouro: string;
  lote: string | null;
  quadra: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string | null;
  complemento_logo: string | null;
};

// TODO: Deprecate Type
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

export type FormObra = z.infer<typeof ObraFormSchema>;

export type InsertionObra = Omit<
  FormObra,
  | "cep"
  | "lote"
  | "quadra"
  | "complemento_logo"
  | "cliente"
  | "proprietario"
  | "sondagem_percussao"
  | "sondagem_rotativa"
  | "sondagem_trado"
> & {
  cep: string | null;
  lote: string | null;
  quadra: string | null;
  complemento_logo: string | null;
  clienteId: number;
  proprietarioId: number | null;
};

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

export type FullObra = Obra & {
  cliente: Cliente;
  proprietario: Cliente | null;
  arquivos: Arquivo[];
  sondagem_percussao: Sondagem_Percussao | null;
  sondagem_trado: Sondagem_Trado | null;
  sondagem_rotativa: Sondagem_Rotativa | null;
};
