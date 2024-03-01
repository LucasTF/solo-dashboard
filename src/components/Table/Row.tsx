"use client";

import React from "react";
import { tv } from "tailwind-variants";

import { useEntryStore } from "@/lib/stores/entry";
import { Tables } from "@/enums/Tables";

type RowProps = {
  rowInfo?: { id: number; table: Tables };
  children?: React.ReactNode;
};

const row = tv({
  base: "odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:odd:bg-zinc-600 dark:even:bg-zinc-700 dark:hover:bg-zinc-600 cursor-pointer",
  variants: {
    selected: {
      true: "odd:bg-sky-500 even:bg-sky-500 hover:bg-sky-500 dark:odd:bg-indigo-800 dark:even:bg-indigo-800 dark:hover:bg-indigo-800",
    },
  },
});

export const Row = ({ children, rowInfo }: RowProps) => {
  const { entry, setEntry, clearEntry } = useEntryStore();

  const selectHandler = () => {
    if (rowInfo) {
      if (entry?.id === rowInfo.id) {
        clearEntry();
      } else {
        setEntry(rowInfo.table, rowInfo.id);
      }
    }
  };

  return (
    <tr
      className={row({
        selected: rowInfo && entry?.id === rowInfo.id,
      })}
      onClick={() => selectHandler()}
    >
      {children}
    </tr>
  );
};
