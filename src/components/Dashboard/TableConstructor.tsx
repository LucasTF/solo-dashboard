"use client";

import React, { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import lodash from "lodash";

import { Table } from "../Table";
import { TableStructure } from "@/types/TableStructure";
import { useTableStore } from "@/lib/stores/table";
import { EntryRow } from "./EntryRow";
import Loading from "../ui/Loading";

type TableConstructorProps = {
  tableStructure: TableStructure;
};

export const TableConstructor = ({ tableStructure }: TableConstructorProps) => {
  const searchParams = useSearchParams();

  const { tableData, setTableData } = useTableStore();

  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get("page") || "1");
  const rowsPerPage = Number(searchParams.get("numRows") || "50");

  if (tableData.data.length === 0 && isPending) return <Loading />;

  return (
    <section className="mx-4">
      <Table.Results numOfResults={tableData.totalEntries} />
      <div className="overflow-auto">
        <Table.Base
          columns={tableStructure.columns.map((column) => column.name)}
        >
          {tableData.data.length > 0 ? (
            tableData.data.map((row, index) => (
              <EntryRow
                key={row.id}
                rowInfo={{
                  table: tableStructure.table,
                  id: row.id,
                  tableIndex: index + rowsPerPage * (page - 1),
                  data: tableData.data[index],
                }}
              >
                {tableStructure.columns.map((column, colIndex) => {
                  const colValues = column.values.map((value) => {
                    return lodash.get(row, value);
                  });
                  const item = colValues.join(" ");
                  return (
                    <Table.Cell key={colIndex}>
                      {typeof item === "boolean"
                        ? item
                          ? "✔️"
                          : "❌"
                        : (item as React.ReactNode)}
                    </Table.Cell>
                  );
                })}
              </EntryRow>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={tableStructure.columns.length}>
                Nenhum resultado foi encontrado.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Base>
      </div>
      {!isPending && <Table.Pagination numOfRows={tableData.data.length} />}
    </section>
  );
};
