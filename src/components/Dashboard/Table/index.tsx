"use client";

import { useSearchParams } from "next/navigation";

import { Table } from "../../Table";
import { TableData } from "@/lib/structures/TableStructure";

type DashboardTableProps = {
  data: TableData;
  columnNames: string[];
};

export const DashboardTable = ({ data, columnNames }: DashboardTableProps) => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const rowsPerPage = Number(searchParams.get("numRows") || "10");

  return (
    <Table.Base columns={columnNames} numOfRows={data.entries.length}>
      {data.entries.length > 0 ? (
        data.entries
          .slice(rowsPerPage * (page - 1), rowsPerPage * page)
          .map((row, rowIndex) => (
            <Table.Row
              key={rowIndex}
              identifier={{ id: row.id, table: data.type }}
            >
              {Object.entries(row).map(([_, value], index) => (
                <Table.Cell key={index}>{value}</Table.Cell>
              ))}
            </Table.Row>
          ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={columnNames.length}>
            Nenhum resultado foi encontrado.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Base>
  );
};
