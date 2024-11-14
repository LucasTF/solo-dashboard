import React from "react";
import { tv } from "tailwind-variants";

import { useEntryStore } from "@/lib/stores/entry";
import { Table } from "@/components/Table";
import { Tables } from "@/lib/structures";

type EntryRowProps = {
  rowInfo?: { id: number; table: Tables; tableIndex: number; data: any };
  children?: Readonly<React.ReactNode>;
};

const row = tv({
  base: "cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-500",
  variants: {
    selected: {
      true: "odd:bg-sky-500 even:bg-sky-500 hover:bg-sky-500 dark:odd:bg-indigo-800 dark:even:bg-indigo-800 dark:hover:bg-indigo-800",
    },
  },
});

export const EntryRow = ({ children, rowInfo }: EntryRowProps) => {
  const { entry, setEntry, clearEntry } = useEntryStore();

  const selectHandler = () => {
    if (rowInfo) {
      if (entry?.id === rowInfo.id) {
        clearEntry();
      } else {
        setEntry(rowInfo.table, rowInfo.id, rowInfo.tableIndex, rowInfo.data);
      }
    }
  };
  return (
    <Table.Row
      className={row({ selected: entry?.id === rowInfo?.id })}
      onClick={() => selectHandler()}
    >
      {children}
    </Table.Row>
  );
};
