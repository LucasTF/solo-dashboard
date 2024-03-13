"use client";

import { TableStructure } from "@/types/TableStructure";
import { BaseSearch } from "@/components/Dashboard/BaseSearch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UsersSearchFiltersSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEntryStore } from "@/lib/stores/entry";

type SearchBaseProps = {
  tableStructure: TableStructure;
};

export const UsersSearch = ({ tableStructure }: SearchBaseProps) => {
  const router = useRouter();

  const { clearEntry } = useEntryStore();

  const { register, handleSubmit } = useForm<
    z.infer<typeof UsersSearchFiltersSchema>
  >({
    resolver: zodResolver(UsersSearchFiltersSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchHandler = (searchString: string, column: string) => {
    clearEntry();
    const newUrl =
      tableStructure.table +
      "?" +
      new URLSearchParams(`search=${searchString}&column=${column}`);
    router.push(newUrl);
  };

  return (
    <BaseSearch
      tableStructure={tableStructure}
      register={register}
      onSubmit={handleSubmit((onValid) =>
        searchHandler(onValid.search, onValid.column)
      )}
    />
  );
};
