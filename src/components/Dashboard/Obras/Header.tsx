import { lazy } from "react";
import { obrasStructure } from "@/lib/structures";
import { ObrasSearch } from "./Search";

import { BaseHeader } from "../BaseHeader";

const NewObraForm = lazy(() => import("./Modals/NewObra"));

export const ObrasHeader = () => {
  return (
    <BaseHeader
      searchComponent={<ObrasSearch tableStructure={obrasStructure} />}
      newEntryButtonText="Nova obra"
      newEntryModalComponent={<NewObraForm />}
      newEntryModalTitle="Nova Obra"
    />
  );
};
