import React, {
  forwardRef,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { tv } from "tailwind-variants";

const field = tv({
  slots: {
    root: "flex flex-col w-full gap-2",
    label: "font-bold flex gap-2",
    input: "rounded-md p-4 border-[1px] border-slate-300",
    select: "rounded-md p-4 border-[1px] border-slate-300",
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

type FieldProps = {
  label: string;
  icon?: React.ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
};

const Input = forwardRef<
  HTMLInputElement,
  FieldProps & InputHTMLAttributes<HTMLInputElement>
>(
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

const Select = forwardRef<
  HTMLSelectElement,
  FieldProps & SelectHTMLAttributes<HTMLSelectElement>
>(
  (
    { isInvalid = false, label, id, icon, errorMessage, children, ...rest },
    ref
  ) => {
    return (
      <div className={field().root()}>
        <label htmlFor={id} className={field({ isInvalid }).label()}>
          {icon}
          {label}
        </label>
        <select
          className={field({ isInvalid }).select()}
          id={id}
          {...rest}
          ref={ref}
        >
          {children}
        </select>
        {isInvalid && (
          <p className={field({ isInvalid }).errorParagraph()}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export const Field = {
  Input,
  Select,
};
