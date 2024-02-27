import React from "react";

import { Table } from "./index";

type TableProps = {
  children?: React.ReactNode;
  numOfRows: number;
  columns: string[];
};

export const Base = ({ children, numOfRows, columns }: TableProps) => {
  return (
    <>
      <Table.Results numOfResults={numOfRows} />
      <div className="overflow-x-auto md:max-h-[28rem]">
        <table className="w-full max-w-full">
          <Table.Head columns={columns} />
          <tbody>{children}</tbody>
        </table>
      </div>
      <Table.Pagination numOfRows={numOfRows} />
    </>
  );
};
