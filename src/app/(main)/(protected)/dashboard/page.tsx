import { Tile } from "@/components/ui/Tile";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

export default async function HomePage() {
  return (
    <>
      <header className="h-16 flex items-center">
        <h1 className="ml-4 text-4xl text-white font-bold">Bem-Vindo</h1>
      </header>
      <main className="mt-4 mx-auto w-11/12">
        <section className="grid grid-cols-3 gap-4 text-center mx-auto lg:max-w-3xl">
          <Tile
            icon={<BuildingOffice2Icon />}
            title="Obras"
            href="/dashboard/obras"
          />
          <Tile
            icon={<UserGroupIcon />}
            title="Usuários"
            href="/dashboard/usuarios"
          />
        </section>
      </main>
    </>
  );
}
