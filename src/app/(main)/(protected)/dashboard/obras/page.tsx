import { Dashboard } from "@/components/Dashboard";
import { obrasStructure } from "@/lib/structures/dashboard/structures";
import { SearchFilters } from "@/types/SearchFilters";

type PageProps = {
  searchParams: SearchFilters;
};

export default async function ObrasPage({ searchParams }: PageProps) {
  return (
    <Dashboard.Template title="Obras">
      <Dashboard.Container>
        <Dashboard.Header.Obras />

        <Dashboard.TableConstructor
          tableStructure={obrasStructure}
          searchFilters={{
            column: searchParams.column,
            search: searchParams.search,
          }}
        />
      </Dashboard.Container>
      <Dashboard.Options.Obras />
    </Dashboard.Template>
  );
}
