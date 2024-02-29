"use client";

import React from "react";
import { tv } from "tailwind-variants";

import { useEntryStore } from "@/lib/stores/entry";
import { TablesEnum } from "@/lib/structures/TableStructure";

type RowProps = {
  rowInfo?: { id: number; table: TablesEnum };
  children?: React.ReactNode;
};

const row = tv({
  base: "odd:bg-white even:bg-gray-100 hover:bg-gray-200 cursor-pointer",
  variants: {
    selected: {
      true: "odd:bg-sky-500 even:bg-sky-500 hover:bg-sky-500",
    },
  },
});

export const Row = ({ children, rowInfo }: RowProps) => {
  const { entry, setEntry, clearEntry } = useEntryStore();

  const selectHandler = () => {
    if (rowInfo) {
      if (entry?.data.id === rowInfo.id) {
        clearEntry();
      } else setEntry(rowInfo.table, rowInfo.id);
    }
  };

  return (
    <tr
      className={row({
        selected: rowInfo && entry?.data.id === rowInfo?.id,
      })}
      onClick={() => selectHandler()}
    >
      {children}
    </tr>
  );
};
