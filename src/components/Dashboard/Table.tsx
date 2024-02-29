"use client";

import { useSearchParams } from "next/navigation";

import { Table } from "../Table";
import React from "react";
import { TableStructure } from "@/lib/structures/TableStructure";

type DashboardTableProps = {
  tableStructure: TableStructure;
  data: (object & Record<"id", number>)[];
};

export const DashboardTable = ({
  tableStructure,
  data,
}: DashboardTableProps) => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const rowsPerPage = Number(searchParams.get("numRows") || "10");

  return (
    <Table.Base columns={tableStructure.columns} numOfRows={data.length}>
      {data.length > 0 ? (
        data.slice(rowsPerPage * (page - 1), rowsPerPage * page).map((row) => (
          <Table.Row
            key={row.id}
            rowInfo={{ table: tableStructure.table, id: row.id }}
          >
            {tableStructure.columns.map((column, colIndex) => {
              return (
                <Table.Cell key={colIndex}>
                  {row[column.value as keyof object] as React.ReactNode}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={tableStructure.columns.length}>
            Nenhum resultado foi encontrado.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Base>
  );
};
