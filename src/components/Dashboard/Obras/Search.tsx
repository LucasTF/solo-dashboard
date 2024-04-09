"use client";

import { TableStructure } from "@/types/TableStructure";
import { BaseSearch } from "@/components/Dashboard/BaseSearch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SearchSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEntryStore } from "@/lib/stores/entry";

type SearchBaseProps = {
  tableStructure: TableStructure;
};

type SearchForm = {
  search: z.infer<typeof SearchSchema>;
};

export const ObrasSearch = ({ tableStructure }: SearchBaseProps) => {
  const router = useRouter();

  const { clearEntry } = useEntryStore();

  const { register, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(
      z.object({
        search: SearchSchema,
      })
    ),
    defaultValues: {
      search: "",
    },
  });

  const searchHandler = (searchString: string) => {
    clearEntry();
    const newUrl =
      tableStructure.table +
      "?" +
      new URLSearchParams(`search=${searchString}`);
    router.push(newUrl);
  };

  return (
    <BaseSearch
      tableStructure={tableStructure}
      register={register}
      onSubmit={handleSubmit((onValid) => searchHandler(onValid.search))}
    />
  );
};
