"use client";

import { UseFormRegister } from "react-hook-form";

import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { TableStructure } from "@/types/TableStructure";
import Button from "@/components/ui/Button";
import { FormHTMLAttributes } from "react";

type SearchProps = FormHTMLAttributes<HTMLFormElement> & {
  tableStructure: TableStructure;
  register: UseFormRegister<any>;
};

export const BaseSearch = ({
  onSubmit,
  register,
  tableStructure,
  ...rest
}: SearchProps) => {
  return (
    <form
      className="flex gap-4 relative max-h-12"
      onSubmit={onSubmit}
      {...rest}
    >
      <input
        type="text"
        autoComplete="off"
        placeholder="Buscar"
        className="w-full pl-12 rounded-md shadow-lg dark:border-zinc-900 dark:border dark:border-solid placeholder:dark:text-gray-300"
        {...register("search")}
      />
      <MagnifyingGlassIcon className="size-6 absolute top-3 left-4 text-gray-400 dark:text-gray-300" />

      <select
        className="px-2 rounded-md shadow-lg border border-zinc-500 dark:border-slate-300"
        {...register("column")}
      >
        {tableStructure.overrideSearchOrder &&
          tableStructure.overrideSearchOrder.map((colIndex) => {
            const column = tableStructure.columns[colIndex];
            return (
              <option key={column.name} value={column.value}>
                {column.name}
              </option>
            );
          })}
        {tableStructure.columns.map((column, index) => {
          if (column.searchable) {
            if (
              tableStructure.overrideSearchOrder &&
              tableStructure.overrideSearchOrder.includes(index)
            )
              return;
            return (
              <option key={column.name} value={column.value}>
                {column.name}
              </option>
            );
          }
        })}
      </select>

      <Button type="submit" color="green" shape="rectangle">
        <ArrowRightIcon className="size-6" />
      </Button>
    </form>
  );
};
