"use server";

import { TablesEnum } from "@/lib/structures/TableStructure";
import { getTableObras, searchObras } from "./obras";
import { ObrasSearchFilterSchema } from "@/schemas";
import { SearchFilters } from "@/types/SearchFilters";

export async function getTableData(searchFilters: SearchFilters) {
  switch (searchFilters.table) {
    case TablesEnum.Obras:
      const obrasSchema = ObrasSearchFilterSchema.safeParse(searchFilters);
      if (obrasSchema.success) return await searchObras(searchFilters);
      return await getTableObras();
    default:
      return [];
  }
}
