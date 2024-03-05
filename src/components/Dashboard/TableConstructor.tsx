import { getAllData, getTableData } from "@/lib/actions/data";
import { DashboardTable } from "./Table";
import { SearchFilters } from "@/types/SearchFilters";
import { TableStructure } from "@/types/TableStructure";
import { TableCellsIcon } from "@heroicons/react/24/outline";

type TableConstructorProps = {
  tableStructure: TableStructure;
  searchFilters: SearchFilters;
  showAllData?: boolean;
};

export const TableConstructor = async ({
  tableStructure,
  searchFilters,
  showAllData = false,
}: TableConstructorProps) => {
  const response = await getTableData(tableStructure.table, searchFilters);

  if (response.success) {
    return (
      <DashboardTable tableStructure={tableStructure} data={response.data} />
    );
  }

  if (showAllData) {
    const response = await getAllData(tableStructure.table);
    if (response.success) {
      return (
        <DashboardTable tableStructure={tableStructure} data={response.data} />
      );
    } else return <p>Nenhum dado encontrado.</p>;
  }

  if (!showAllData) {
    return (
      <div className="h-48 rounded-md mt-4 flex flex-col items-center justify-center text-gray-400">
        <TableCellsIcon className="size-24" />
        <p>Faça uma busca para começar</p>
      </div>
    );
  }
};
