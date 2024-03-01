import { Tables } from "@/enums/Tables";
import { ObraWithFiles } from "./data/Obra";
import { User } from "./data/User";

type ObraEntry = {
  table: Tables.Obras;
  id: number;
  data?: ObraWithFiles;
};

type UserEntry = {
  table: Tables.Users;
  id: number;
  data?: User;
};

export type Entry = ObraEntry | UserEntry;
