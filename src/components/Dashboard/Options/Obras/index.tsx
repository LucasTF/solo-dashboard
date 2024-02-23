"use client";

import { lazy, useEffect, useState } from "react";
import {
  DocumentIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import Button, { ButtonAnchor, ButtonLink } from "@/components/ui/Button";

import { useEntryStore } from "@/lib/stores/entry";
import { usePathname, useSearchParams } from "next/navigation";
import { EditObraForm } from "./Form/EditObra";
import { Obra } from "@/types/data/Obra";
import { getObraById } from "@/lib/actions/data/obras";

const Modal = lazy(() => import("@/components/ui/Modal"));

enum ModalState {
  Off,
  Edit = "Editar Obra",
}

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
    <>
      {entry && searchParams.size > 0 && entry.table === pathname && (
        <div className="mt-6 flex justify-between max-md:flex-col-reverse md:flex-row-reverse max-md:gap-8">
          <div className="flex gap-2 md:gap-4 max-md:flex-col">
            <h3 className="max-md:text-center md:hidden">Opções</h3>
            <Button
              color="lightblue"
              fontStrength="semibold"
              type="button"
              onClick={() => setModal(ModalState.Edit)}
            >
              <PencilSquareIcon className="size-6" />
              Editar obra ({obra?.sp})
            </Button>

            <ButtonLink
              fontStrength="semibold"
              href={`/report/obra/${entry.data.id}`}
              target="_blank"
            >
              <DocumentTextIcon className="size-6" />
              Relatório ({obra?.sp})
            </ButtonLink>
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
              PDF ({obra?.sp})
            </Button>
          </div>

          <Modal
            title={modal.toString()}
            visible={modal !== ModalState.Off}
            onClose={() => setModal(ModalState.Off)}
          >
            {modalBuilder()}
          </Modal>
        </div>
      )}
    </>
  );
};
