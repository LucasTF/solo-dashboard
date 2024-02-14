import { Obra } from "@/types/obraType";

export type SearchColumn = {
  name: string;
  value: string;
};

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

export type TableStructure = {
  searchColumns: SearchColumn[];
  columnNames: string[];
  type: TablesEnum;
};
