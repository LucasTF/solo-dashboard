import React from "react";

export const Head = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="bg-slate-300 text-center mb-4 border-b-2 border-solid border-slate-400 px-8 py-4 rounded-t-md">
      {children}
    </header>
  );
};
