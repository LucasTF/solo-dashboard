"use server";

import { TablesEnum } from "@/lib/structures/TableStructure";
import { getObraById, searchObras } from "./obras";
import { ObrasSearchFiltersSchema } from "@/schemas";
import { SearchFilters } from "@/types/SearchFilters";
import { DataResponse } from "@/types/DataResponse";
import { Obra, ObraWithFiles } from "@/types/data/Obra";

export async function getTableData(
  table: TablesEnum,
  searchFilters: SearchFilters
): Promise<DataResponse<Obra>> {
  switch (table) {
    case TablesEnum.Obras:
      const obrasSchema = ObrasSearchFiltersSchema.safeParse(searchFilters);
      if (obrasSchema.success) {
        const obras = await searchObras(searchFilters);
        return { success: true, data: obras };
      }
      return { success: false, message: "Filtros de busca inválidos!" };
    default:
      return {
        success: false,
        message: "Não foi possível recuperar os dados dessa tabela.",
      };
  }
}

export async function getEntryData(
  table: TablesEnum,
  id: number
): Promise<ObraWithFiles | null> {
  switch (table) {
    case TablesEnum.Obras:
      const obra = await getObraById(id);
      return obra;
    default:
      return null;
  }
}
