"use client";

import { Suspense } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Loading from "../ui/Loading";
import { createPortal } from "react-dom";

type BaseManagerProps = {
  title: string;
  modalState: boolean;
  toggleModal: Function;
  children: React.ReactNode;
};

export const BaseManager = ({
  title,
  modalState,
  toggleModal,
  children,
}: BaseManagerProps) => {
  return (
    <section className="m-4">
      <Button
        color="green"
        fontStrength="semibold"
        type="button"
        onClick={() => toggleModal(true)}
        className="ml-auto"
      >
        <PlusCircleIcon className="size-6" />
        {title}
      </Button>

      {createPortal(
        <Modal
          title={title}
          visible={modalState}
          onClose={() => toggleModal(false)}
        >
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Modal>,
        document.body
      )}
    </section>
  );
};
