import { Tables } from "@/enums/Tables";
import { ObraWithFiles } from "./data/Obra";
import { User } from "./data/User";

export type Entry = {
  table: Tables;
  id: number;
  data?: ObraWithFiles | User;
};
