import { Dashboard } from "@/components/Dashboard";
import { Tile } from "@/components/ui/Tile";
import { UsersIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

export default async function HomePage() {
  return (
    <>
      <Dashboard.Header.Base title="Bem-Vindo"></Dashboard.Header.Base>
      <main className="mt-4 mx-auto w-11/12">
        <section className="grid grid-cols-3 gap-4 text-center mx-auto lg:max-w-3xl">
          <Tile
            icon={<BuildingOffice2Icon />}
            title="Obras"
            href="/dashboard/obras"
          />
          <Tile
            icon={<UsersIcon />}
            title="Usuários"
            href="/dashboard/usuarios"
          />
        </section>
      </main>
    </>
  );
}
