import * as z from "zod";

import {
  Arquivo,
  Cliente,
  Obra,
  Sondagem_Percussao,
  Sondagem_Rotativa,
  Sondagem_Trado,
} from "@prisma/client";
import { ObraFormSchema } from "@/schemas";

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
