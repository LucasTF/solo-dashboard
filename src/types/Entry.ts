import { Tables } from "@/lib/structures";
import { ObraWithFiles } from "./data/Obra";
import { UserNopass } from "./data/User";

export type Entry = {
  table: Tables;
  id: number;
  tableIndex: number;
  data?: ObraWithFiles | UserNopass;
};
