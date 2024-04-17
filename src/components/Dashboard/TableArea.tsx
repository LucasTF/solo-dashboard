import { getAllData, getTableData } from "@/lib/actions/data";
import { TableConstructor } from "./TableConstructor";
import { TableStructure } from "@/types/TableStructure";
import { TableCellsIcon } from "@heroicons/react/24/outline";

type TableAreaProps = {
  tableStructure: TableStructure;
  searchString: string;
  showAllData?: boolean;
};

export const TableArea = async ({
  tableStructure,
  searchString,
  showAllData = false,
}: TableAreaProps) => {
  const response = await getTableData(tableStructure.table, searchString);

  if (response.success) {
    return (
      <TableConstructor tableStructure={tableStructure} data={response.data} />
    );
  }

  if (showAllData) {
    const response = await getAllData(tableStructure.table);
    if (response.success) {
      return (
        <TableConstructor
          tableStructure={tableStructure}
          data={response.data}
        />
      );
    } else return <p>Nenhum dado encontrado.</p>;
  }

  if (!showAllData) {
    return (
      <main className="h-48 rounded-md mt-4 flex flex-col items-center justify-center text-gray-400 select-none">
        <TableCellsIcon className="size-24" />
        <p>Faça uma busca para começar</p>
      </main>
    );
  }
};
