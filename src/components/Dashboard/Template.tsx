import React from "react";

type TemplateProps = {
  title: string;
  children?: React.ReactNode;
};

export const Template = ({ title, children }: TemplateProps) => {
  return (
    <>
      <h1 className="font-bold text-4xl w-11/12 mx-auto mb-8 text-white">
        {title}
      </h1>
      <main className="py-8 px-4 md:p-8 bg-slate-200 md:w-11/12 md:mx-auto md:rounded-md md:shadow-lg">
        {children}
      </main>
    </>
  );
};
