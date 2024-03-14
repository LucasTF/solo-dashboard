import { DocumentIcon, GlobeAmericasIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

import { Dashboard } from "@/components/Dashboard";
import { Card } from "@/components/ui/Card";
import { BarChart } from "@/components/Dashboard/Home/Charts/BarChart";

export default async function HomePage() {
  return (
    <>
      <Dashboard.Header.Base title="Bem-Vindo"></Dashboard.Header.Base>
      <main className="mt-4 mx-auto space-y-8">
        <section className="grid grid-cols-3 gap-4 mx-4">
          <Card.Container>
            <Card.Title title="Nº de Obras" />
            <Card.BackgroundIcon icon={<BuildingOffice2Icon />} />
            <p className="my-4 ml-4 font-bold text-4xl">5700</p>
          </Card.Container>
          <Card.Container>
            <Card.Title title="Nº de Plantas" />
            <Card.BackgroundIcon icon={<DocumentIcon />} />
            <p className="my-4 ml-4 font-bold text-4xl">-</p>
          </Card.Container>

          <section>
            <Card.Container>
              <Card.BackgroundIcon icon={<GlobeAmericasIcon />} />
              <Card.Title title="Nº de Clientes" />
              <p className="my-4 ml-4 font-bold text-4xl">-</p>
            </Card.Container>
          </section>
          <div className="max-md:col-span-3 max-xl:col-span-2 text-black border border-slate-400 dark:border-zinc-700 rounded-lg p-4">
            <BarChart />
          </div>
        </section>
      </main>
    </>
  );
}
