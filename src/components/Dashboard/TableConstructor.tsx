import { getTableData } from "@/lib/actions/data";
import { DashboardTable } from "./Table";
import { SearchFilters } from "@/types/SearchFilters";
import { TablesEnum } from "@/lib/structures/TableStructure";
import { TableCellsIcon } from "@heroicons/react/24/outline";

type TableConstructorProps = {
  columns: string[];
  table: TablesEnum;
  searchFilters: SearchFilters;
};

export const TableConstructor = async ({
  columns,
  table,
  searchFilters,
}: TableConstructorProps) => {
  const response = await getTableData(table, searchFilters);

  return response.success ? (
    <DashboardTable
      columns={columns}
      data={{ type: table, entries: response.data }}
    />
  ) : (
    <div className="h-48 rounded-md mt-4 flex flex-col items-center justify-center text-gray-500">
      <TableCellsIcon className="size-24" />
      <p>Faça uma busca para começar</p>
    </div>
  );
};
