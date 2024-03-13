"use client";

import { lazy, useState } from "react";
import { BaseManager } from "../BaseManager";

const NewObraForm = lazy(() => import("./Modals/NewObra"));

export const ObrasManager = () => {
  const [modal, toggleModal] = useState(false);

  return (
    <BaseManager title="Nova obra" modalState={modal} toggleModal={toggleModal}>
      <NewObraForm closeModal={() => toggleModal(false)} />
    </BaseManager>
  );
};
