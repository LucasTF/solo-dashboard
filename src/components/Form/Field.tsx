import React from "react";

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  isInvalid?: boolean;
  validation?: any;
};

export const Field = ({
  isInvalid = false,
  label,
  type,
  name,
  placeholder,
  icon,
  errorMessage,
  validation,
}: FieldProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className={
          "font-bold mt-4 flex gap-2" + " " + (isInvalid && "text-red-700")
        }
      >
        {icon}
        {label}
      </label>
      <input
        className={
          "rounded-md p-2 border-[1px]" +
          " " +
          (isInvalid ? "border-red-700 bg-red-300" : "border-slate-300")
        }
        id={name}
        type={type || "text"}
        placeholder={placeholder}
        {...validation}
      />
      {isInvalid && (
        <p
          className={
            "text-sm font-semibold" + " " + (isInvalid && "text-red-700")
          }
        >
          {errorMessage}
        </p>
      )}
    </>
  );
};
