"use client";

import { lazy, useState } from "react";
import { BaseManager } from "../BaseManager";

const NewUserForm = lazy(() => import("./Modals/NewUser"));

export const UsersManager = () => {
  const [modal, toggleModal] = useState(false);

  return (
    <BaseManager
      title="Novo usuário"
      modalState={modal}
      toggleModal={toggleModal}
    >
      <NewUserForm closeModal={() => toggleModal(false)} />
    </BaseManager>
  );
};
