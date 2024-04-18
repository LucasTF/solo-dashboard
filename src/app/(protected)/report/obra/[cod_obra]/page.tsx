import { getObraByCod } from "@/lib/actions/data/obras";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type ReportProps = {
  params: { cod_obra: string };
};

export async function generateMetadata({
  params,
}: ReportProps): Promise<Metadata> {
  const codObra = params.cod_obra;

  const obra = await getObraByCod(decodeURIComponent(codObra));

  if (obra) {
    return {
      title: `Relatório | ${obra.cod_obra}`,
    };
  }

  return { title: "Relatório não encontrado" };
}

export default async function Report({ params }: ReportProps) {
  const codObra = params.cod_obra;
  const obra = await getObraByCod(decodeURIComponent(codObra));
  if (!obra) notFound();

  const fullAddress = () => {
    let fullAddress = "";
    if (obra.tipo_logo) fullAddress = obra.tipo_logo;
    fullAddress = fullAddress + " " + obra.logradouro;
    if (obra.complemento_logo)
      fullAddress = fullAddress + " " + obra.complemento_logo;
    return fullAddress;
  };

  return (
    <div className="bg-white block m-4 overflow-hidden divide-y-2 divide-black w-[210mm] h-[297mm]">
      <header className="flex items-center gap-8 p-8">
        <Image
          src="/img/solo-logo.png"
          alt="Solo"
          width="96"
          height="96"
          priority
        />
        <h1 className="font-serif text-4xl">Consulta de Obras Executadas</h1>
      </header>
      <main className="divide-y-2 divide-black">
        <section className="py-4 px-8 space-y-4">
          <h2 className="text-4xl text-center font-semibold">
            {obra.cod_obra}
          </h2>
          <h3 className="text-2xl font-bold">
            Cidade:{" "}
            <span className="font-normal">
              {obra.cidade} - {obra.uf}
            </span>
          </h3>
          <h3 className="text-2xl font-bold">
            Endereço: <span className="font-normal">{fullAddress()}</span>
          </h3>
          <h3 className="text-2xl font-bold">
            Bairro: <span className="font-normal">{obra.bairro}</span>
          </h3>
        </section>

        {obra.sondagem_percussao && (
          <section className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Sondagem Percussão</h2>
            <div className="grid grid-flow-col gap-4 text-xl">
              <div className="flex space-x-4">
                <p className="font-bold">Furos:</p>
                <span>{obra.sondagem_percussao.furos}</span>
              </div>
              <div className="flex space-x-4">
                <p className="font-bold">Metros:</p>
                <span>{obra.sondagem_percussao.metros}</span>
              </div>
              <div className="flex space-x-4">
                <p className="font-bold">Média:</p>
                <span>
                  {(
                    obra.sondagem_percussao.metros /
                    obra.sondagem_percussao.furos
                  ).toFixed(2)}
                  m
                </span>
              </div>
            </div>
          </section>
        )}

        {obra.sondagem_trado && (
          <section className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Sondagem Trado</h2>
            <div className="grid grid-flow-col gap-4 text-xl">
              <div className="flex space-x-4">
                <p className="font-bold">Furos:</p>
                <span>{obra.sondagem_trado.furos}</span>
              </div>
              <div className="flex space-x-4">
                <p className="font-bold">Metros:</p>
                <span>{obra.sondagem_trado.metros}</span>
              </div>
            </div>
          </section>
        )}

        {obra.sondagem_rotativa && (
          <section className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Sondagem Rotativa</h2>
            <div className="grid grid-flow-col gap-4 text-xl">
              <div className="flex space-x-4">
                <p className="font-bold">Furos:</p>
                <span>{obra.sondagem_rotativa.furos}</span>
              </div>
              <div className="flex space-x-4">
                <p className="font-bold">Metros Solo:</p>
                <span>{obra.sondagem_rotativa.metros_solo}</span>
              </div>
              <div className="flex space-x-4">
                <p className="font-bold">Metros Rocha:</p>
                <span>{obra.sondagem_rotativa.metros_rocha}</span>
              </div>
            </div>
          </section>
        )}

        <section className="p-8 space-y-4">
          <h3 className="text-2xl font-bold">
            Cliente: <span className="font-normal">{obra.cliente.nome}</span>
          </h3>
          <h3 className="text-2xl font-bold">
            Proprietário:{" "}
            <span className="font-normal">
              {obra.proprietario?.nome || "N/A"}
            </span>
          </h3>
        </section>
      </main>

      <footer className="text-center">
        <p>{new Date().toLocaleDateString("pt-BR")}</p>
      </footer>
    </div>
  );
}
