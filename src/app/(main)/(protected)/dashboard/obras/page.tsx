import { Dashboard } from "@/components/Dashboard";
import { obrasStructure } from "@/lib/structures/dashboard/structures";
import { SearchFilters } from "@/types/SearchFilters";

type PageProps = {
  searchParams: SearchFilters;
};

export default async function ObrasPage({ searchParams }: PageProps) {
  return (
    <Dashboard.Template title="Obras">
      <Dashboard.Search.Obras
        searchColumns={obrasStructure.searchColumns}
        table={obrasStructure.table}
      />

      <Dashboard.TableConstructor
        table={obrasStructure.table}
        columns={obrasStructure.columnNames}
        searchFilters={{
          column: searchParams.column,
          search: searchParams.search,
        }}
      />

      <Dashboard.Options.Obras />
    </Dashboard.Template>
  );
}
