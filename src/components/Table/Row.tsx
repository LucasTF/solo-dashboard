"use client";

import React from "react";
import { tv } from "tailwind-variants";

import { useEntryStore } from "@/lib/stores/entry";
import { Entry } from "@/types/Entry";

type RowProps = {
  identifier?: Entry;
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

export const Row = ({ children, identifier }: RowProps) => {
  const { entry, setEntry, resetEntry } = useEntryStore();

  const selectHandler = () => {
    if (identifier) {
      if (entry?.data.id === identifier.data.id) {
        resetEntry();
      } else setEntry(identifier);
    }
  };

  return (
    <tr
      className={row({
        selected: identifier && entry?.data.id === identifier.data.id,
      })}
      onClick={() => selectHandler()}
    >
      {children}
    </tr>
  );
};
