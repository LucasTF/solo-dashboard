"use client";

import { lazy, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { obrasStructure } from "@/lib/structures/dashboard/structures";
import Button from "@/components/ui/Button";
import { NewObraForm } from "../Options/Obras/Form/NewObra";
import { ObrasSearch } from "../Search/Obras";

const Modal = lazy(() => import("@/components/ui/Modal"));

export const ObrasTableHeader = () => {
  const [modal, toggleModal] = useState(false);

  return (
    <header className="flex max-md:flex-col gap-4 order-1">
      <ObrasSearch
        searchColumns={obrasStructure.searchColumns}
        table={obrasStructure.table}
      />

      <div className="border-2 border-slate-300" />

      <div className="max-md:mx-auto">
        <Button
          color="green"
          fontStrength="semibold"
          type="button"
          onClick={() => toggleModal(true)}
        >
          <PlusCircleIcon className="size-6" />
          Nova obra
        </Button>
      </div>

      <Modal
        title="Nova Obra"
        visible={modal === true}
        onClose={() => toggleModal(false)}
      >
        <NewObraForm />
      </Modal>
    </header>
  );
};
