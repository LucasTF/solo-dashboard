import React from "react";

type CellProps = {
  colSpan?: number;
  children?: React.ReactNode;
};

export const Cell = ({ colSpan = 1, children }: CellProps) => {
  return (
    <td
      colSpan={colSpan}
      className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-100 select-none"
    >
      {children}
    </td>
  );
};
