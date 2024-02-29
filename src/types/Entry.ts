import { TablesEnum } from "@/lib/structures/TableStructure";
import { ObraWithFiles } from "./data/Obra";

type ObraEntry = {
  id: number;
  table: TablesEnum.Obras;
  data?: ObraWithFiles;
};

type ClienteEntry = {
  id: number;
  table: TablesEnum.Clientes;
  data?: object;
};

type ProprietarioEntry = {
  id: number;
  table: TablesEnum.Proprietarios;
  data?: object;
};

export type Entry = ObraEntry | ClienteEntry | ProprietarioEntry;
