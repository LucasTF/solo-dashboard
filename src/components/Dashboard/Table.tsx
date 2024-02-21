"use client";

import { useSearchParams } from "next/navigation";

import { Table } from "../Table";
import { TableData } from "@/lib/structures/TableStructure";
import React from "react";

type DashboardTableProps = {
  data: TableData;
  columns: string[];
};

export const DashboardTable = ({ data, columns }: DashboardTableProps) => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const rowsPerPage = Number(searchParams.get("numRows") || "10");

  return (
    <Table.Base columns={columns} numOfRows={data.entries.length}>
      {data.entries.length > 0 ? (
        data.entries
          .slice(rowsPerPage * (page - 1), rowsPerPage * page)
          .map((row, rowIndex) => (
            <Table.Row
              key={rowIndex}
              identifier={{ table: data.type, data: row }}
            >
              {Object.entries(row).map(([_, value], index) => (
                <Table.Cell key={index}>{value as React.ReactNode}</Table.Cell>
              ))}
            </Table.Row>
          ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={columns.length}>
            Nenhum resultado foi encontrado.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Base>
  );
};
