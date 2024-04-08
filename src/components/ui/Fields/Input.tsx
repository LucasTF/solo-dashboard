import { InputHTMLAttributes, forwardRef } from "react";
import { FieldProps } from "@/types/Field";

import { field } from "./styles";

export const Input = forwardRef<
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

Input.displayName = "InputField";
