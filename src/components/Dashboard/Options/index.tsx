"use client";

import Button from "@/components/ui/Button";
import { lazy, useState } from "react";

const Modal = lazy(() => import("@/components/Modal/Modal"));

export const DashboardOptions = () => {
  const [isModalVisible, toggleModal] = useState(false);

  return (
    <div className="mt-6 flex flex-row-reverse">
      <Button
        color="green"
        fontStrength="semibold"
        type="button"
        onClick={() => toggleModal(true)}
      >
        + Nova obra
      </Button>

      <Modal
        visible={isModalVisible}
        title="Nova Obra"
        onClose={() => toggleModal(false)}
      ></Modal>
    </div>
  );
};
