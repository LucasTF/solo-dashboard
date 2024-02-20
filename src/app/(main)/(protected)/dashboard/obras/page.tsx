import { Dashboard } from "@/components/Dashboard";
import { ObrasSearchColumnsEnum } from "@/enums/SearchColumns";
import { obrasStructure } from "@/lib/structures/dashboard/structures";

type PageProps = {
  searchParams: {
    search?: string;
    column?: ObrasSearchColumnsEnum;
  };
};

export default async function ObrasPage({ searchParams }: PageProps) {
  return (
    <Dashboard.Template title="Obras">
      <Dashboard.Search.Obras
        searchColumns={obrasStructure.searchColumns}
        table={obrasStructure.table}
      />

      <Dashboard.TableConstructor
        columns={obrasStructure.columnNames}
        searchFilters={{
          table: obrasStructure.table,
          search: searchParams.search!,
          column: searchParams.column!,
        }}
      />

      <Dashboard.Options.Obras />
    </Dashboard.Template>
  );
}
