"use client";

import { lazy, useState } from "react";

import { usersStructure } from "@/lib/structures";
import { UsersSearch } from "./Search";

import { BaseHeader } from "../BaseHeader";

const NewUser = lazy(() => import("./Modals/NewUser"));

export const UsersHeader = () => {
  const [modal, toggleModal] = useState(false);

  return (
    <BaseHeader
      searchComponent={<UsersSearch tableStructure={usersStructure} />}
      newEntryButtonText="Novo usuário"
      newEntryModalComponent={<NewUser closeModal={() => toggleModal(false)} />}
      newEntryModalTitle="Novo Usuário"
      modalState={modal}
      toggleModalState={toggleModal}
    />
  );
};
