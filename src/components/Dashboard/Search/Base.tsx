"use client";

import { UseFormRegister } from "react-hook-form";

import {
  FunnelIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { TableStructure } from "@/lib/structures/TableStructure";
import Button from "@/components/ui/Button";
import { FormHTMLAttributes } from "react";

type SearchProps = FormHTMLAttributes<HTMLFormElement> & {
  tableStructure: TableStructure;
  register: UseFormRegister<any>;
  onAdvancedFilterClick: () => void;
  advancedFilterState: boolean;
};

export const SearchBase = ({
  onSubmit,
  register,
  tableStructure,
  onAdvancedFilterClick,
  advancedFilterState,
  ...rest
}: SearchProps) => {
  return (
    <form
      className="flex gap-4 max-lg:flex-col grow relative"
      onSubmit={onSubmit}
      {...rest}
    >
      <input
        type="text"
        autoComplete="off"
        placeholder="Buscar"
        className="grow p-4 pl-12 rounded-md"
        {...register("search")}
      />
      <MagnifyingGlassIcon className="size-6 absolute top-4 left-4 text-gray-400" />

      <div className="flex gap-4">
        <select
          className="lg:min-w-24 rounded-md p-4 max-md:w-full grow"
          {...register("column")}
        >
          {tableStructure.columns.map((column) => {
            if (column.searchable) {
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

        <Button
          type="button"
          color={advancedFilterState ? "blue" : "clear"}
          onClick={() => onAdvancedFilterClick()}
        >
          <FunnelIcon className="size-6" />
        </Button>
      </div>
    </form>
  );
};
