"use client";

import { lazy, useState } from "react";

import Button from "@/components/ui/Button";
import { DashboardOptions } from "..";

import { NewObraForm } from "./Form";

const Modal = lazy(() => import("@/components/ui/Modal"));

export const ObrasOptions = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <DashboardOptions>
      <Button
        color="green"
        fontStrength="semibold"
        type="button"
        onClick={() => setVisible(true)}
      >
        + Nova obra
      </Button>

      <Modal
        title="Nova Obra"
        visible={isVisible}
        onClose={() => setVisible(false)}
      >
        <NewObraForm />
      </Modal>
    </DashboardOptions>
  );
};
