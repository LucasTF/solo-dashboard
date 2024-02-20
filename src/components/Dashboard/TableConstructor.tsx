import { getTableData } from "@/lib/actions/data";
import { DashboardTable } from "./Table";
import { SearchFilters } from "@/types/SearchFilters";

type TableConstructorProps = {
  columns: string[];
  searchFilters: SearchFilters;
};

export const TableConstructor = async ({
  columns,
  searchFilters,
}: TableConstructorProps) => {
  const data = await getTableData(searchFilters);

  return (
    <DashboardTable
      columns={columns}
      data={{ type: searchFilters.table, entries: data }}
    />
  );
};
