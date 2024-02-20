"use client";

import {
  FunnelIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DashboardTableSearchSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchColumn, TablesEnum } from "@/lib/structures/TableStructure";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

type SearchFormProps = {
  searchColumns: SearchColumn[];
  table: TablesEnum;
  selectedIndex?: number;
};

export const Search = ({
  searchColumns,
  table,
  selectedIndex = 0,
}: SearchFormProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<
    z.infer<typeof DashboardTableSearchSchema>
  >({
    resolver: zodResolver(DashboardTableSearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchHandler = (searchString: string, column: string) => {
    const newUrl =
      table +
      "?" +
      new URLSearchParams(`search=${searchString}&column=${column}`);
    router.push(newUrl);
  };

  return (
    <form
      className="flex gap-4 max-md:flex-col relative"
      onSubmit={handleSubmit((onValid) =>
        searchHandler(onValid.search, onValid.column)
      )}
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
