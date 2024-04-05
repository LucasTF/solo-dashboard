import { Metadata } from "next";

import { Dashboard } from "@/components/Dashboard";
import { obrasStructure } from "@/lib/structures";
import { SearchFilters } from "@/types/SearchFilters";

type PageProps = {
  searchParams: SearchFilters;
};

export const metadata: Metadata = {
  title: "Obras",
};

export default async function ObrasPage({ searchParams }: PageProps) {
  return (
    <>
      <Dashboard.Header.Obras />

      <Dashboard.Manager.Obras />

      <Dashboard.Options.Obras />

      <Dashboard.TableArea
        tableStructure={obrasStructure}
        searchFilters={{
          column: searchParams.column,
          search: searchParams.search,
        }}
      />
    </>
  );
}
