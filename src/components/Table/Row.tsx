"use client";

import React, { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

type RowProps = HTMLAttributes<HTMLTableRowElement>;

const row = tv({
  base: "odd:bg-white even:bg-gray-100 dark:odd:bg-gray-700 dark:even:bg-gray-800",
});

export const Row = ({ children, className, ...rest }: RowProps) => {
  return (
    <tr className={row({ className })} {...rest}>
      {children}
    </tr>
  );
};
