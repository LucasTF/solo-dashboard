import React from "react";

type ButtonProps = {
  label: string;
  icon?: React.ReactNode;
};

export const Button = ({ label, icon }: ButtonProps) => {
  return (
    <button
      className="bg-sky-900 text-white p-4 rounded-md flex justify-center gap-2 mt-4 ease-in-out duration-300 hover:bg-sky-800"
      type="submit"
    >
      {icon}
      <span className="font-bold">{label}</span>
    </button>
  );
};
