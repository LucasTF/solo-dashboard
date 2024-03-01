"use client";

import React, { Suspense, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Loading from "../ui/Loading";

type BaseHeaderProps = {
  searchComponent: Readonly<React.ReactNode>;
  newEntryButtonText: string;
  newEntryModalTitle: string;
  newEntryModalComponent: Readonly<React.ReactNode>;
};

export const BaseHeader = (props: BaseHeaderProps) => {
  const [modal, toggleModal] = useState(false);

  return (
    <header className="flex max-md:flex-col gap-4 order-1">
      {props.searchComponent}

      <div className="border-2 border-slate-300" />

      <div className="max-md:mx-auto">
        <Button
          color="green"
          fontStrength="semibold"
          type="button"
          onClick={() => toggleModal(true)}
        >
          <PlusCircleIcon className="size-6" />
          {props.newEntryButtonText}
        </Button>
      </div>

      <Modal
        title={props.newEntryModalTitle}
        visible={modal === true}
        onClose={() => toggleModal(false)}
      >
        <Suspense fallback={<Loading />}>
          {props.newEntryModalComponent}
        </Suspense>
      </Modal>
    </header>
  );
};
