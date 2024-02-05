"use client";

import { FunnelIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DashboardTableSearchSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ObrasSearchOptionsEnum } from "@/enums";
import { Searchbar } from "../Searchbar";
import { DashboardSearchOptions } from "@/types/dashboardSearchType";

type SearchFormProps = {
  searchTargets: DashboardSearchOptions<ObrasSearchOptionsEnum>[];
  selectedIndex?: number;
};

export const SearchForm = ({
  searchTargets,
  selectedIndex = 0,
}: SearchFormProps) => {
  const { register, handleSubmit } = useForm<
    z.infer<typeof DashboardTableSearchSchema>
  >({
    resolver: zodResolver(DashboardTableSearchSchema),
    defaultValues: {
      search: "",
    },
  });

  return (
    <form
      className="flex gap-4 max-md:flex-col"
      onSubmit={handleSubmit((onValid) => console.log(onValid))}
    >
      <Searchbar validation={register("search")} />

      <div className="flex gap-4">
        <select
          className="min-w-48 rounded-md p-4 max-md:w-full"
          {...register("column")}
        >
          {searchTargets.map((target, index) => (
            <option key={index} value={target.value}>
              {target.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-6 rounded-md shadow-md ease-in-out duration-300 text-white bg-green-700 hover:bg-green-600"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>

        <button
          type="button"
          className="px-4 rounded-md shadow-md ease-in-out duration-300 hover:bg-sky-800 hover:text-white"
        >
          <FunnelIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};
