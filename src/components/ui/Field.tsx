import React, { forwardRef, InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const field = tv({
  slots: {
    root: "flex flex-col w-full gap-2",
    label: "font-bold mt-4 flex gap-2",
    input: "rounded-md p-4 border-[1px] border-slate-300",
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
        input: "border-red-700 bg-red-300",
        errorParagraph: "text-red-700",
      },
    },
  ],
});

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      isInvalid = false,
      label,
      type,
      id,
      placeholder,
      icon,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={field().root()}>
        <label htmlFor={id} className={field({ isInvalid }).label()}>
          {icon}
          {label}
        </label>
        <input
          className={field({ isInvalid }).input()}
          id={id}
          type={type || "text"}
          placeholder={placeholder}
          {...rest}
          ref={ref}
        />
        {isInvalid && (
          <p className={field({ isInvalid }).errorParagraph()}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export default Field;
