"use client";

import { lazy, useEffect, useState } from "react";
import {
  DocumentTextIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import Button, { ButtonLink } from "@/components/ui/Button";

import { NewObraForm } from "./Form/NewObra";
import { useEntryStore } from "@/lib/stores/entry";
import { usePathname } from "next/navigation";
import { EditObraForm } from "./Form/EditObra";
import { Obra } from "@/types/obraType";
import { getObraById } from "@/lib/actions/data/obras";

const Modal = lazy(() => import("@/components/ui/Modal"));

enum ModalState {
  Off,
  Add = "Nova Obra",
  Edit = "Editar Obra",
}

export const ObrasOptions = () => {
  const [modal, setModal] = useState<ModalState>(ModalState.Off);
  const [obra, setObra] = useState<Obra>();

  const { entry } = useEntryStore();
  const pathname = usePathname();

  useEffect(() => {
    const fetchObra = async () => {
      const obraData = (await getObraById(Number(entry?.id))) as Obra;
      setObra(obraData);
    };
    fetchObra().catch((err) => console.log(err));
  }, [entry]);

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Add:
        return <NewObraForm />;
      case ModalState.Edit:
        return <EditObraForm obra={obra as Obra} />;
    }
  };

  return (
    <div className="mt-6 flex justify-between flex-row-reverse">
      <Button
        color="green"
        fontStrength="semibold"
        type="button"
        onClick={() => setModal(ModalState.Add)}
      >
        <PlusCircleIcon className="size-6" />
        Nova obra
      </Button>

      {entry && entry.table === pathname && (
        <div className="flex gap-4">
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
            href={`/report/obra/${entry.id}`}
            target="_blank"
          >
            <DocumentTextIcon className="size-6" />
            Relatório
          </ButtonLink>
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
