import { Tables } from "@/lib/structures";
import { ObraWithFiles } from "./data/Obra";
import { User } from "@prisma/client";

export type Entry = {
  table: Tables;
  id: number;
  tableIndex: number;
  data?: ObraWithFiles | Omit<User, "password">;
};
