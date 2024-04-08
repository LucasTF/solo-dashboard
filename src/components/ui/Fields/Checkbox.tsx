import { InputHTMLAttributes, forwardRef } from "react";
import { FieldProps } from "@/types/Field";

import { field } from "./styles";

export const Checkbox = forwardRef<
  HTMLInputElement,
  FieldProps & InputHTMLAttributes<HTMLInputElement>
>(
  (
    { isInvalid = false, label, id, placeholder, icon, errorMessage, ...rest },
    ref
  ) => {
    return (
      <div className={field().checkbox()}>
        <input
          className={field({ isInvalid }).input()}
          id={id}
          placeholder={placeholder}
          {...rest}
          type="checkbox"
          ref={ref}
        />
        <label htmlFor={id} className={field({ isInvalid }).label()}>
          {icon}
          {label}
        </label>
        {isInvalid && (
          <p className={field({ isInvalid }).errorParagraph()}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "CheckboxField";
