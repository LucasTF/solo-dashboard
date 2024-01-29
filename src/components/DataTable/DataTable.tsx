"use client";

import React from "react";
import Pagination from "../Pagination/Pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type DataTableProps = {
  columns: string[];
  content: Object[];
};

export function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th
            key={index}
            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
            scope="col"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function TableRow({ rowContent }: { rowContent: Object }) {
  return (
    <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
      {Object.entries(rowContent).map(([key, value], index) => (
        <TableCell key={index}>{value}</TableCell>
      ))}
    </tr>
  );
}

export function TableCell({ children }: { children?: React.ReactNode }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border-r-[1px] border-solid border-slate-200">
      {children}
    </td>
  );
}

export function DataTable({ columns, content }: DataTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") || "1");
  const rowsPerPage = Number(searchParams.get("numRows") || "5");

  const rowsPerPageHandler = (numRows: number) => {
    let newPath = pathname + "?";
    searchParams.forEach((value, key) => {
      if (key === "numRows") newPath = newPath + "numRows=" + numRows;
      else newPath = newPath + `${key}=${value}`;
      newPath = newPath + "&";
    });
    if (!searchParams.has("numRows")) newPath = newPath + "numRows=" + numRows;
    router.push(newPath);
  };

  return (
    <>
      <header className="my-4 flex flex-col text-center md:text-base md:flex-row md:justify-between">
        <p className="font-bold">{content.length} resultado(s) encontrados.</p>

        <div>
          <p>
            Mostrar&nbsp;
            <span
              className={rowsPerPage === 5 ? "font-bold" : "cursor-pointer"}
              onClick={() => rowsPerPageHandler(5)}
            >
              5
            </span>
            ,&nbsp;
            <span
              className={rowsPerPage === 10 ? "font-bold" : "cursor-pointer"}
              onClick={() => rowsPerPageHandler(10)}
            >
              10
            </span>
            ,&nbsp;
            <span
              className={rowsPerPage === 15 ? "font-bold" : "cursor-pointer"}
              onClick={() => rowsPerPageHandler(15)}
            >
              15
            </span>
            &nbsp;resultados
          </p>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full max-w-full">
          <TableHead columns={columns} />
          <tbody>
            {content
              .slice(rowsPerPage * (page - 1), rowsPerPage * page)
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
