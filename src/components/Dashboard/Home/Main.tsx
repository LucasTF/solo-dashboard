import {
  BuildingOffice2Icon,
  DocumentIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/solid";
import { tv } from "tailwind-variants";

import { Card } from "@/components/ui/Card";
import { ObrasPerYearChart } from "./Charts/ObrasPerYear";
import { getHomeData } from "@/lib/actions/data/home";
import { LastFilesTable } from "./Tables/LastFilesTable";

const mainStyles = tv({
  slots: {
    cardText: "my-4 md:ml-4 font-bold text-2xl md:text-4xl",
  },
});

export const HomeMain = async () => {
  const homeData = await getHomeData();

  const { cardText } = mainStyles();

  if (homeData.success)
    return (
      <main className="my-4 mx-auto space-y-8">
        <section className="grid grid-cols-3 gap-4 mx-4">
          <Card.Container>
            <Card.Title title="Nº de Obras" />
            <Card.BackgroundIcon icon={<BuildingOffice2Icon />} />
            <p className={cardText()}>{homeData.data.totalObras}</p>
          </Card.Container>
          <Card.Container>
            <Card.Title title="Nº de Plantas" />
            <Card.BackgroundIcon icon={<DocumentIcon />} />
            <p className={cardText()}>{homeData.data.totalFiles}</p>
          </Card.Container>
          <Card.Container>
            <Card.BackgroundIcon icon={<GlobeAmericasIcon />} />
            <Card.Title title="Nº de Clientes" />
            <p className={cardText()}>-</p>
          </Card.Container>

          <div className="col-span-3 lg:col-span-3 xl:col-span-1 text-black border border-slate-400 dark:border-zinc-700 rounded-lg p-4">
            <ObrasPerYearChart data={homeData.data.obrasPerYear} />
          </div>

          <section className="col-span-3 xl:col-span-2 space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <DocumentIcon className="size-7" />
              Últimas plantas
            </h2>
            <LastFilesTable latestFiles={homeData.data.latestFiles} />
          </section>
        </section>
      </main>
    );

  return <h2>Não foi possível recuperar os dados.</h2>;
};
