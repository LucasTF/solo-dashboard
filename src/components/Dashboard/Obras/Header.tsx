"use client";

import { lazy, useState } from "react";
import { obrasStructure } from "@/lib/structures";
import { ObrasSearch } from "./Search";

import { BaseHeader } from "../BaseHeader";

const NewObraForm = lazy(() => import("./Modals/NewObra"));

export const ObrasHeader = () => {
  const [modal, toggleModal] = useState(false);

  return (
    <BaseHeader
      searchComponent={<ObrasSearch tableStructure={obrasStructure} />}
      newEntryButtonText="Nova obra"
      newEntryModalComponent={
        <NewObraForm closeModal={() => toggleModal(false)} />
      }
      newEntryModalTitle="Nova Obra"
      modalState={modal}
      toggleModalState={toggleModal}
    />
  );
};
