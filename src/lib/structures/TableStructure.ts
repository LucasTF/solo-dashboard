import { Obra } from "@/types/data/Obra";

export enum TablesEnum {
  Obras = "/dashboard/obras",
  Clientes = "/dashboard/clientes",
  Proprietarios = "/dashboard/proprietarios",
}

type ObrasData = {
  type: TablesEnum.Obras;
  entries: Obra[];
};

type ClientesData = {
  type: TablesEnum.Clientes;
  entries: (object & Record<"id", number>)[];
};

type ProprietariosData = {
  type: TablesEnum.Proprietarios;
  entries: (object & Record<"id", number>)[];
};

export type TableData = ObrasData | ClientesData | ProprietariosData;

export type Column = {
  name: string;
  value: string;
  searchable: boolean;
};

export type TableStructure = {
  table: TablesEnum;
  columns: Column[];
};
