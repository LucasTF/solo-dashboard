import React from "react";

type DashboardOptionsProps = {
  children?: React.ReactNode;
};

export const DashboardOptions = ({ children }: DashboardOptionsProps) => {
  return <div className="mt-6 flex flex-row-reverse gap-4">{children}</div>;
};
