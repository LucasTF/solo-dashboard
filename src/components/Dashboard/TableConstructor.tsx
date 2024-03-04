import { getTableData } from "@/lib/actions/data";
import { DashboardTable } from "./Table";
import { SearchFilters } from "@/types/SearchFilters";
import { TableStructure } from "@/types/TableStructure";
import { TableCellsIcon } from "@heroicons/react/24/outline";

type TableConstructorProps = {
  tableStructure: TableStructure;
  searchFilters: SearchFilters;
  ignoreFilters?: boolean;
};

export const TableConstructor = async ({
  tableStructure,
  searchFilters,
}: TableConstructorProps) => {
  const response = await getTableData(tableStructure.table, searchFilters);

  return response.success ? (
    <DashboardTable tableStructure={tableStructure} data={response.data} />
  ) : (
    <div className="h-48 rounded-md mt-4 flex flex-col items-center justify-center text-gray-400">
      <TableCellsIcon className="size-24" />
      <p>Faça uma busca para começar</p>
    </div>
  );
};
