"use client";

import { TableConstructor } from "./TableConstructor";
import { TableStructure } from "@/types/TableStructure";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

type TableAreaProps = {
  tableStructure: TableStructure;
  showDataOnLoad?: boolean;
};

export const TableArea = async ({
  tableStructure,
  showDataOnLoad = false,
}: TableAreaProps) => {
  const hasSearched = useSearchParams().has("search");

  if (showDataOnLoad) {
    return <TableConstructor tableStructure={tableStructure} />;
  }

  if (hasSearched) {
    return <TableConstructor tableStructure={tableStructure} />;
  }

  if (!hasSearched) {
    return (
      <main className="h-48 rounded-md mt-4 flex flex-col items-center justify-center text-gray-400 select-none">
        <TableCellsIcon className="size-24" />
        <p>Faça uma busca para começar</p>
      </main>
    );
  }
};
