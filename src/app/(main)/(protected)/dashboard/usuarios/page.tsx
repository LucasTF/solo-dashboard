import { Dashboard } from "@/components/Dashboard";
import { usersStructure } from "@/lib/structures";
import { SearchFilters } from "@/types/SearchFilters";

type PageProps = {
  searchParams: SearchFilters;
};

export default async function UsersPage({ searchParams }: PageProps) {
  return (
    <Dashboard.Template title="Usuários">
      <Dashboard.Container>
        <Dashboard.Header.Users />

        <Dashboard.TableConstructor
          tableStructure={usersStructure}
          searchFilters={{
            column: searchParams.column,
            search: searchParams.search,
          }}
        />
      </Dashboard.Container>
      <Dashboard.Options.Users />
    </Dashboard.Template>
  );
}
