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
  // TODO: Get Table Data from Flask API
  const response = { success: true, data: [] };

  if (response.success) {
    return (
      <TableConstructor tableStructure={tableStructure} data={response.data} />
    );
  }

  if (showAllData) {
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
