"use client";

import React, { useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { Table } from "../Table";
import { TableStructure } from "@/types/TableStructure";
import { useTableStore } from "@/lib/stores/table";
import Loading from "../ui/Loading";

type DashboardTableProps = {
  tableStructure: TableStructure;
  data: (object & Record<"id", number>)[];
};

export const DashboardTable = ({
  tableStructure,
  data,
}: DashboardTableProps) => {
  const searchParams = useSearchParams();

  const { tableData, setTableData } = useTableStore();

  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get("page") || "1");
  const rowsPerPage = Number(searchParams.get("numRows") || "10");

  useEffect(() => {
    startTransition(() => {
      setTableData(() => {
        return data;
      });
    });
  }, [data]);

  return (
    <>
      <Table.Results numOfResults={tableData.length} />
      <Table.Base columns={tableStructure.columns}>
        {isPending && (
          <div className="bg-black w-full h-full bg-opacity-50 absolute flex items-center justify-center">
            <Loading />
          </div>
        )}
        {tableData.length > 0 ? (
          tableData
            .slice(rowsPerPage * (page - 1), rowsPerPage * page)
            .map((row, index) => (
              <Table.Row
                key={row.id}
                rowInfo={{
                  table: tableStructure.table,
                  id: row.id,
                  tableIndex: index + rowsPerPage * (page - 1),
                }}
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
      {!isPending && <Table.Pagination numOfRows={tableData.length} />}
    </>
  );
};
