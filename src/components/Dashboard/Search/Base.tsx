"use client";

import { UseFormRegister } from "react-hook-form";

import {
  FunnelIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { SearchColumn } from "@/lib/structures/TableStructure";
import Button from "@/components/ui/Button";
import { FormHTMLAttributes } from "react";

type SearchProps = FormHTMLAttributes<HTMLFormElement> & {
  searchColumns: SearchColumn[];
  register: UseFormRegister<any>;
};

export const SearchBase = ({
  onSubmit,
  register,
  searchColumns,
  ...rest
}: SearchProps) => {
  return (
    <form
      className="flex gap-4 max-md:flex-col relative"
      onSubmit={onSubmit}
      {...rest}
    >
      <input
        type="text"
        autoComplete="off"
        placeholder="Buscar"
        className="w-full p-4 pl-12 rounded-md"
        {...register("search")}
      />
      <MagnifyingGlassIcon className="size-6 absolute top-4 left-4 text-gray-400" />

      <div className="flex gap-4">
        <select
          className="lg:min-w-48 rounded-md p-4 max-md:w-full"
          {...register("column")}
        >
          {searchColumns.map((target, index) => (
            <option key={index} value={target.value}>
              {target.name}
            </option>
          ))}
        </select>

        <Button type="submit" color="green" shape="rectangle">
          <ArrowRightIcon className="size-6" />
        </Button>

        <Button type="button" color="clear">
          <FunnelIcon className="size-6" />
        </Button>
      </div>
    </form>
  );
};
