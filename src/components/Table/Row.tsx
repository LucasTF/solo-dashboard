"use client";

import React from "react";
import { tv } from "tailwind-variants";

import { TablesEnum } from "@/lib/structures/TableStructure";
import { useEntryStore } from "@/lib/stores/entry";

type RowProps = {
  identifier?: { id: number | string; table: TablesEnum };
  children?: React.ReactNode;
};

const row = tv({
  base: "odd:bg-white even:bg-gray-100 hover:bg-gray-200 cursor-pointer",
  variants: {
    selected: {
      true: "odd:bg-sky-500 even:bg-sky-500 border-[1px] border-sky-400 hover:bg-sky-500",
    },
  },
});

export const Row = ({ children, identifier }: RowProps) => {
  const { entry, setEntry } = useEntryStore();

  const selectHandler = () => {
    if (identifier) {
      setEntry(identifier);
    }
  };

  return (
    <tr
      className={row({
        selected: identifier && entry?.id === identifier.id,
      })}
      onClick={() => selectHandler()}
    >
      {children}
    </tr>
  );
};
