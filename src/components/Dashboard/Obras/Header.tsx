import { obrasStructure } from "@/lib/structures";
import { ObrasSearch } from "./Search";

import { BaseHeader } from "../BaseHeader";

export const ObrasHeader = () => {
  return (
    <BaseHeader title="Obras">
      <ObrasSearch tableStructure={obrasStructure} />
    </BaseHeader>
  );
};
