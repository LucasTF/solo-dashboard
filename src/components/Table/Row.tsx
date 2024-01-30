import React from "react";

type RowProps = {
  children?: React.ReactNode;
};

export const Row = ({ children }: RowProps) => {
  return (
    <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
      {children}
    </tr>
  );
};
