import { tv } from "tailwind-variants";

export const field = tv({
  slots: {
    root: "flex flex-col w-full gap-2",
    checkbox: "flex w-full gap-2",
    label: "font-bold flex gap-2",
    input: "rounded-md p-4 border border-slate-300 dark:border-slate-700",
    select: "rounded-md p-4 border border-slate-900 dark:border-slate-300",
    errorParagraph: "text-sm font-semibold",
  },
  variants: {
    isInvalid: {
      true: "",
    },
  },
  compoundVariants: [
    {
      isInvalid: true,
      class: {
        label: "text-red-700",
        input: "border-red-700 bg-red-300 dark:border-red-700 dark:bg-red-900",
        errorParagraph: "text-red-700",
      },
    },
  ],
});
