"use server";

import { Tables } from "@/enums/Tables";
import { getObraById, searchObras } from "./obras";
import { ObrasSearchFiltersSchema, UsersSearchFiltersSchema } from "@/schemas";
import { SearchFilters } from "@/types/SearchFilters";
import { User } from "@/types/data/User";
import { getUserById, searchUsers } from "./users";
import { DataResponse } from "@/types/DataResponse";
import { Obra } from "@/types/data/Obra";

export async function getTableData(
  table: Tables,
  searchFilters: SearchFilters
): Promise<DataResponse<Obra | User>> {
  switch (table) {
    case Tables.Obras:
      const obrasSchema = ObrasSearchFiltersSchema.safeParse(searchFilters);
      if (obrasSchema.success) {
        const obras = await searchObras(searchFilters);
        return { success: true, data: obras };
      }
      return { success: false, message: "Filtros de busca inválidos!" };
    case Tables.Users:
      const usersSchema = UsersSearchFiltersSchema.safeParse(searchFilters);
      if (usersSchema.success) {
        const users = await searchUsers(searchFilters);
        return { success: true, data: users };
      }
    default:
      return {
        success: false,
        message: "Não foi possível recuperar os dados dessa tabela.",
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
  }
}
