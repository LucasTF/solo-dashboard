import { Dashboard } from "@/components/Dashboard";
import { usersStructure } from "@/lib/structures";
import { SearchFilters } from "@/types/SearchFilters";

type PageProps = {
  searchParams: SearchFilters;
};

export default async function UsersPage({ searchParams }: PageProps) {
  return (
    <>
      <Dashboard.Header.Users />

      <Dashboard.Manager.Users />

      <Dashboard.Options.Users />

      <Dashboard.TableConstructor
        tableStructure={usersStructure}
        searchFilters={{
          column: searchParams.column,
          search: searchParams.search,
        }}
        showAllData={true}
      />
    </>
  );
}
