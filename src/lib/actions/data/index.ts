"use server";

import { Tables } from "@/lib/structures";
import { getObraById, searchObras } from "./obras";
import { SearchSchema } from "@/schemas";
import { getAllUsers, getUserById, searchUsers } from "./users";
import { DataResponse } from "@/types/ServerResponse";
import { TableObra } from "@/types/data/Obra";
import { User } from "@prisma/client";

export async function getTableData(
  table: Tables,
  searchString: string
): Promise<DataResponse<TableObra[] | Omit<User, "password">[]>> {
  let schema;

  switch (table) {
    case Tables.Obras:
      schema = SearchSchema.safeParse(searchString);
      if (schema.success) {
        const data = await searchObras(searchString);
        return { success: true, data };
      }
      return { success: false, error: "Filtros de busca inválidos!" };
    case Tables.Users:
      schema = SearchSchema.safeParse(searchString);
      if (schema.success) {
        const data = await searchUsers(searchString);
        return { success: true, data };
      }
    default:
      return {
        success: false,
        error: "Não foi possível recuperar os dados dessa tabela.",
      };
  }
}

export async function getAllData(
  table: Tables
): Promise<DataResponse<Omit<User, "password">[]>> {
  switch (table) {
    case Tables.Users:
      const data = await getAllUsers();
      return { success: true, data };
    default:
      return {
        success: false,
        error: "Não foi possível recuperar os dados dessa tabela.",
      };
  }
}

export async function getEntryData(table: Tables, id: number) {
  switch (table) {
    case Tables.Obras:
      const obra = await getObraById(id);
      return obra;
    case Tables.Users:
      const user = await getUserById(id);
      return user;
    default:
      return null;
  }
}
