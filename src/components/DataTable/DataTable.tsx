"use client";

import React from "react";
import Pagination from "../Pagination/Pagination";
import { useSearchParams } from "next/navigation";

type DataTableProps = {
  columns: string[];
  content: Object[];
  rowsPerPage?: number;
};

export function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead>
      {columns.map((col, index) => (
        <th
          key={index}
          scope="col"
          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
        >
          {col}
        </th>
      ))}
    </thead>
  );
}

export function TableRow({ rowContent }: { rowContent: Object }) {
  return (
    <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-700">
      {Object.entries(rowContent).map(([key, value]) => (
        <td
          key={key}
          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border-r-[1px] border-solid border-slate-200"
        >
          {value}
        </td>
      ))}
    </tr>
  );
}

export function DataTable({
  columns,
  content,
  rowsPerPage = 5,
}: DataTableProps) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full max-w-full">
          <TableHead columns={columns} />
          <tbody>
            {content
              .slice(
                rowsPerPage * (Number(page) - 1),
                rowsPerPage * Number(page)
              )
              .map((row, index) => (
                <TableRow key={index} rowContent={row} />
              ))}
          </tbody>
        </table>
      </div>
      <Pagination numOfRows={content.length} rowsPerPage={rowsPerPage} />
    </>
  );
}
