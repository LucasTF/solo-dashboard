import React from "react";

import { Table } from "./index";
import { Column } from "@/types/TableStructure";

type TableProps = {
  children?: React.ReactNode;
  columns: Column[];
};

export const Base = ({ children, columns }: TableProps) => {
  return (
    <div className="overflow-x-auto md:max-h-[28rem] relative">
      <table className="w-full max-w-full">
        <Table.Head columns={columns} />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
