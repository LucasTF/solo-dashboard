import { TablesEnum } from "@/lib/structures/TableStructure";
import { Obra } from "./data/Obra";

type ObraEntry = {
  table: TablesEnum.Obras;
  data: Obra;
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
