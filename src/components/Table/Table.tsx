import React from "react";

import { Tb } from "./index";

type TableProps = {
  children?: React.ReactNode;
  numOfRows: number;
  columns: string[];
};

export const Table = ({ children, numOfRows, columns }: TableProps) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full max-w-full">
          <Tb.Head columns={columns} />
          <tbody>{children}</tbody>
        </table>
      </div>
      <Tb.Pagination numOfRows={numOfRows} />
    </>
  );
};
