import { TablesEnum } from "@/lib/structures/TableStructure";
import { ObraWithFiles } from "./data/Obra";

type ObraEntry = {
  table: TablesEnum.Obras;
  data: ObraWithFiles;
};

type ClienteEntry = {
  table: TablesEnum.Clientes;
  data: object & Record<"id", number>;
};

type ProprietarioEntry = {
  table: TablesEnum.Proprietarios;
  data: object & Record<"id", number>;
};

export type Entry = ObraEntry | ClienteEntry | ProprietarioEntry;
