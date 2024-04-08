import { SelectHTMLAttributes, forwardRef } from "react";
import { FieldProps } from "@/types/Field";

import { field } from "./styles";

export const Select = forwardRef<
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

Select.displayName = "SelectField";
