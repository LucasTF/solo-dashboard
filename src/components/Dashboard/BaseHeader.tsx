import React, { Suspense } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Loading from "../ui/Loading";

type BaseHeaderProps = {
  searchComponent: Readonly<React.ReactNode>;
  newEntryButtonText: string;
  newEntryModalTitle: string;
  newEntryModalComponent: Readonly<React.ReactNode>;
  modalState: boolean;
  toggleModalState: (modalState: boolean) => void;
};

export const BaseHeader = (props: BaseHeaderProps) => {
  return (
    <header className="flex max-md:flex-col gap-4 order-1">
      {props.searchComponent}

      <div className="border-2 border-slate-300 dark:border-zinc-700" />

      <div className="max-md:mx-auto">
        <Button
          color="green"
          fontStrength="semibold"
          type="button"
          onClick={() => props.toggleModalState(true)}
        >
          <PlusCircleIcon className="size-6" />
          {props.newEntryButtonText}
        </Button>
      </div>

      <Modal
        title={props.newEntryModalTitle}
        visible={props.modalState}
        onClose={() => props.toggleModalState(false)}
      >
        <Suspense fallback={<Loading />}>
          {props.newEntryModalComponent}
        </Suspense>
      </Modal>
    </header>
  );
};
