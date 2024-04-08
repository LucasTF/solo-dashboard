"use client";

import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from "react";
import { FieldProps } from "@/types/Field";
import { tv } from "tailwind-variants";
import lodash from "lodash";

import { Input } from "./Input";
import { Cliente } from "@/types/data/Cliente";

const sugMenu = tv({
  slots: {
    container:
      "absolute bottom-14 w-full max-h-36 bg-slate-300 dark:bg-zinc-800 rounded-t-md overflow-y-auto",
    list: "[&>li]:p-2 [&>li]:cursor-pointer space-y-2",
  },
  variants: {
    isVisible: {
      true: "",
    },
    isInvalid: {
      true: "",
    },
  },
  compoundVariants: [
    {
      isVisible: false,
      class: {
        container: "hidden",
      },
    },
    {
      isInvalid: true,
      class: {
        container: "bottom-20",
      },
    },
  ],
});

export const SuggestionInput = forwardRef<
  HTMLInputElement,
  FieldProps & InputHTMLAttributes<HTMLInputElement>
>(({ isInvalid = false, label, errorMessage, ...rest }, ref) => {
  const dummyData = [
    { id: 1, nome: "Lucas" },
    { id: 2, nome: "Lucy" },
    { id: 3, nome: "Henrique" },
    { id: 4, nome: "Lutris" },
    { id: 5, nome: "Marcos" },
  ];

  const [isVisible, setVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<Cliente[]>([]);

  const searchFn = lodash.debounce((searchArgs) => {
    console.log(searchArgs);
    const filteredData = dummyData.filter((element) => {
      return element.nome.includes(searchArgs);
    });

    setSuggestions(filteredData);
    setVisible(true);
  }, 700);

  const searchHandler = (search: string) => {
    searchFn.cancel();
    if (search.length > 0) {
      searchFn(search);
    } else {
      setVisible(false);
    }
  };

  return (
    <div
      className="relative"
      onBlur={() => setVisible(false)}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        searchHandler(e.target.value)
      }
    >
      <Input
        label={label}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        ref={ref}
        {...rest}
      />
      <div
        className={sugMenu().container({
          isVisible,
          isInvalid,
        })}
      >
        <ul className={sugMenu().list()}>
          {suggestions.length === 0 ? (
            <li>Nenhum cliente encontrado</li>
          ) : (
            suggestions.map((suggestion) => (
              <li key={suggestion.id}>{suggestion.nome}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
});

SuggestionInput.displayName = "SuggestionInput";
