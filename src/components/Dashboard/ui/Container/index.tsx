import React from "react";

export const DashboardContainer = ({
  children,
}: Readonly<{ children?: React.ReactNode }>) => {
  return (
    <main className="p-8 bg-slate-200 w-11/12 mx-auto rounded-md shadow-lg">
      {children}
    </main>
  );
};
