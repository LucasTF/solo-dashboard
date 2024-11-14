"use client";

import { TableStructure } from "@/types/TableStructure";
import { BaseSearch } from "@/components/Dashboard/BaseSearch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SearchSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEntryStore } from "@/lib/stores/entry";
import { useTableStore } from "@/lib/stores/table";

type SearchBaseProps = {
  tableStructure: TableStructure;
};

type SearchForm = {
  search: z.infer<typeof SearchSchema>;
};

export const ObrasSearch = ({ tableStructure }: SearchBaseProps) => {
  const router = useRouter();

  const { clearEntry } = useEntryStore();
  const { setTableData } = useTableStore();

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

  const searchHandler = async (searchString: string) => {
    clearEntry();

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URI +
        `${tableStructure.endpoint}?search=${searchString}`
    );

    if (response.ok) {
      const data = await response.json();
      setTableData({
        data: data.data,
        pages: data.total_pages,
        totalEntries: data.total_entries,
      });
    }

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
