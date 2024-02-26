"use client";

import { lazy, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import {
  DocumentIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import Button, { ButtonLink } from "@/components/ui/Button";

import { useEntryStore } from "@/lib/stores/entry";
import { usePathname, useSearchParams } from "next/navigation";
import { EditObraForm } from "./Form/EditObra";
import { Obra } from "@/types/data/Obra";
import { getObraById } from "@/lib/actions/data/obras";
import { TitledDivider } from "@/components/ui/TitledDivider";

const Modal = lazy(() => import("@/components/ui/Modal"));

enum ModalState {
  Off,
  Edit = "Editar Obra",
}

const options = tv({
  base: "max-lg:mb-4 lg:ml-8",
  variants: {
    visible: {
      true: "lg:col-span-1 order-2",
      false: "hidden",
    },
  },
});

export const ObrasOptions = () => {
  const [modal, setModal] = useState<ModalState>(ModalState.Off);
  const [obra, setObra] = useState<Obra>();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { entry } = useEntryStore();

  useEffect(() => {
    const fetchObra = async () => {
      if (entry) {
        const obraData = (await getObraById(Number(entry.data.id))) as Obra;
        setObra(obraData);
      }
    };
    fetchObra().catch((err) => console.log(err));
  }, [entry]);

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Edit:
        return <EditObraForm obra={obra as Obra} />;
    }
  };

  return (
    <div className={options({ visible: entry !== null })}>
      {entry && searchParams.size > 0 && entry.table === pathname && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-center font-semibold">Obra</p>
            <h2 className="font-bold text-center sm:text-2xl xl:text-4xl">
              {obra?.sp}
            </h2>
          </div>

          <TitledDivider title="Opções" />

          <Button
            color="lightblue"
            fontStrength="semibold"
            type="button"
            onClick={() => setModal(ModalState.Edit)}
          >
            <PencilSquareIcon className="size-6" />
            Editar obra
          </Button>

          <ButtonLink
            fontStrength="semibold"
            href={`/report/obra/${entry.data.id}`}
            target="_blank"
          >
            <DocumentTextIcon className="size-6" />
            Relatório
          </ButtonLink>

          <TitledDivider title="Arquivos" />

          <Button
            color="red"
            fontStrength="semibold"
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_STATIC_SERVER_URI}/${
                  obra?.ano
                }/${obra?.sp?.replace("/", "-")}-Model.pdf`
              )
            }
          >
            <DocumentIcon className="size-6" />
            PDF
          </Button>
        </div>
      )}

      <Modal
        title={modal.toString()}
        visible={modal !== ModalState.Off}
        onClose={() => setModal(ModalState.Off)}
      >
        {modalBuilder()}
      </Modal>
    </div>
  );
};
