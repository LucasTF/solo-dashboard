"use client";

import { SearchColumn, TablesEnum } from "@/lib/structures/TableStructure";
import { SearchBase } from "./Base";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ObrasSearchFilterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type SearchBaseProps = {
  searchColumns: SearchColumn[];
  table: TablesEnum;
};

export const ObrasSearch = ({ searchColumns, table }: SearchBaseProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<
    z.infer<typeof ObrasSearchFilterSchema>
  >({
    resolver: zodResolver(ObrasSearchFilterSchema),
    defaultValues: {
      table,
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
    <SearchBase
      searchColumns={searchColumns}
      register={register}
      onSubmit={handleSubmit((onValid) =>
        searchHandler(onValid.search, onValid.column)
      )}
    />
  );
};
