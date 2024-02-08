import { Dashboard } from "@/components/Dashboard";
import { obrasStructure } from "@/lib/structures/dashboard/structures";
import { Suspense } from "react";
import Loading from "../loading";

type PageProps = {
  searchParams: {
    search?: string;
    column?: string;
    numRows?: string;
    page?: string;
  };
};

export default async function ObrasPage({ searchParams }: PageProps) {
  return (
    <>
      <Dashboard.Title title="Obras" />

      <Dashboard.MainContainer>
        <Dashboard.Search
          searchColumns={obrasStructure.searchColumns}
          table={obrasStructure.type}
        />

        <Dashboard.TableConstructor
          columnNames={obrasStructure.columnNames}
          tableType={obrasStructure.type}
          searchFilter={{
            search: searchParams.search!,
            column: searchParams.column!,
          }}
        />

        <Dashboard.Options />
      </Dashboard.MainContainer>
    </>
  );
}
