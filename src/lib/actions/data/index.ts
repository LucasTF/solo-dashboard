"use server";

import { TablesEnum } from "@/lib/structures/TableStructure";
import { getObras, searchObras } from "./obras";
import { ObrasSearchFilterSchema, SearchFilter } from "@/schemas";

export async function getTableData(
  dataType: TablesEnum,
  searchFilter: SearchFilter
) {
  switch (dataType) {
    case TablesEnum.Obras:
      const obrasSchema = ObrasSearchFilterSchema.safeParse(searchFilter);
      if (obrasSchema.success) return await searchObras(searchFilter);
      return await getObras();
    default:
      return [];
  }
}
