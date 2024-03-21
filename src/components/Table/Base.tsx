import React from "react";

import { Table } from "./index";

type TableProps = {
  children?: React.ReactNode;
  columns: string[];
};

export const Base = ({ children, columns }: TableProps) => {
  return (
    <table className="w-full max-w-full">
      <Table.Head columns={columns} />
      <tbody>{children}</tbody>
    </table>
  );
};
