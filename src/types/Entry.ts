import { Tables } from "@/lib/structures";
import { User } from "@prisma/client";
import { EntryObra } from "./data/Obra";

export type Entry = {
  table: Tables;
  id: number;
  tableIndex: number;
  data?: EntryObra | Omit<User, "password">;
};
