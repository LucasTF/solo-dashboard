"use client";

import { lazy, useState } from "react";
import { DocumentTextIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import Button, { ButtonLink } from "@/components/ui/Button";
import { DashboardOptions } from "..";

import { NewObraForm } from "./Form";
import { useEntryStore } from "@/lib/stores/entry";
import { usePathname } from "next/navigation";

const Modal = lazy(() => import("@/components/ui/Modal"));

export const ObrasOptions = () => {
  const [isVisible, setVisible] = useState(false);

  const { entry } = useEntryStore();
  const pathname = usePathname();

  return (
    <DashboardOptions>
      <Button
        color="green"
        fontStrength="semibold"
        type="button"
        onClick={() => setVisible(true)}
      >
        <PlusCircleIcon className="size-6" />
        Nova obra
      </Button>

      {entry && entry.table === pathname && (
        <ButtonLink
          fontStrength="semibold"
          href={`/report/obra/${entry.id}`}
          target="_blank"
        >
          <DocumentTextIcon className="size-6" />
          Relatório
        </ButtonLink>
      )}

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
