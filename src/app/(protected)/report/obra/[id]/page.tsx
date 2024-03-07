import { getObraById } from "@/lib/actions/data/obras";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type ReportProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: ReportProps): Promise<Metadata> {
  const id = Number(params.id);
  if (isNaN(id)) {
    return { title: "Relatório não encontrado." };
  }

  const obra = await getObraById(Number(id));

  if (obra) {
    return {
      title: `Relatório | ${obra.sp}`,
    };
  }

  return { title: "Relatório não encontrado" };
}

export default async function Report({ params }: ReportProps) {
  const id = Number(params.id);

  if (isNaN(id)) notFound();

  const obra = await getObraById(Number(params.id));

  if (!obra) notFound();

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
        <section className="p-8 space-y-4">
          <h3 className="text-2xl font-bold">
            Cidade: <span className="font-normal">{obra.cidade || "N/A"}</span>
          </h3>
          <h3 className="text-2xl font-bold">
            Endereço:{" "}
            <span className="font-normal">{`${obra.tipo_logo} ${
              obra.logradouro || "N/A"
            }`}</span>
          </h3>
          <h3 className="text-2xl font-bold">
            Bairro: <span className="font-normal">{obra.bairro || "N/A"}</span>
          </h3>
        </section>

        <section className="p-8 grid grid-cols-2 grid-rows-2 gap-4">
          <aside className="space-y-4">
            <h3 className="text-2xl font-bold">
              SP: <span className="font-normal">{obra.sp_sondagem}</span>
            </h3>
            <h3 className="text-2xl font-bold">
              SR: <span className="font-normal">{obra.sr_sondagem || "0"}</span>
            </h3>
          </aside>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Metros:{" "}
              <span className="font-normal">{obra.metros_sp_sondagem}</span>
            </h3>
            {obra.sp_sondagem! > 0 && (
              <h3 className="text-2xl font-bold">
                Média:{" "}
                <span className="font-normal">
                  {(obra.metros_sp_sondagem! / obra.sp_sondagem!).toPrecision(
                    4
                  )}
                </span>
              </h3>
            )}
            <h3 className="text-2xl font-bold">
              Metros Solo:{" "}
              <span className="font-normal">{obra.metros_sr_solo || "0"}</span>
            </h3>
            <h3 className="text-2xl font-bold">
              Metros Rocha:{" "}
              <span className="font-normal">{obra.metros_sr_rocha || "0"}</span>
            </h3>
          </div>

          <aside className="space-y-4">
            <h3 className="text-2xl font-bold">
              Ponteiras:{" "}
              <span className="font-normal">{obra.rb_ponteiras || "N/A"}</span>
            </h3>
            <h3 className="text-2xl font-bold">
              Tirantes:{" "}
              <span className="font-normal">{obra.TITirantes || "N/A"}</span>
            </h3>
          </aside>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Equipamentos:{" "}
              <span className="font-normal">
                {obra.rb_equipamentos || "N/A"}
              </span>
            </h3>
            <h3 className="text-2xl font-bold">
              Tipo:{" "}
              <span className="font-normal">{obra.tipo_tirantes || "N/A"}</span>
            </h3>
            <h3 className="text-2xl font-bold">
              Carga:{" "}
              <span className="font-normal">
                {obra.carga_tirantes || "N/A"}
              </span>
            </h3>
          </div>
        </section>

        <section className="p-8 space-y-4">
          <h3 className="text-2xl font-bold">
            Cliente: <span className="font-normal">{obra.cliente}</span>
          </h3>
          <h3 className="text-2xl font-bold">
            Proprietário:{" "}
            <span className="font-normal">{obra.proprietario || "N/A"}</span>
          </h3>
        </section>
      </main>

      <footer className="text-center">
        <p>{new Date().toLocaleDateString("pt-BR")}</p>
      </footer>
    </div>
  );
}
