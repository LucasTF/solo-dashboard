import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { ButtonLink } from "@/components/ui/Button";

export const ObrasManager = () => {
  return (
    <section className="m-4">
      <ButtonLink
        href="/dashboard/obras/new"
        color="green"
        fontStrength="semibold"
        type="button"
        className="w-fit"
      >
        <PlusCircleIcon className="size-6" />
        Nova Obra
      </ButtonLink>
    </section>
  );
};
