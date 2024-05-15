"use client";

import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { FieldProps } from "@/types/Field";
import { tv } from "tailwind-variants";
import lodash from "lodash";

import { Input } from "./Input";
import { Cliente } from "@/types/data/Cliente";
import Spinner from "../Spinner";
import { UseFormSetValue } from "react-hook-form";

const sugMenu = tv({
  slots: {
    container:
      "absolute bottom-[3.4rem] w-full max-h-36 bg-white dark:bg-[#2b2a33] border border-slate-300 dark:border-slate-700 rounded-t-md overflow-y-auto",
    list: "p-4 [&>li]:p-1 [&>li]:cursor-pointer space-y-2 [&>li]:text-sm [&>li]:font-semibold [&>li]:w-fit",
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

type SuggestionInputProps = {
  registerName: string;
  setValue: UseFormSetValue<any>;
} & FieldProps;

export const SuggestionInput = forwardRef<
  HTMLInputElement,
  SuggestionInputProps & InputHTMLAttributes<HTMLInputElement>
>(
  (
    { isInvalid = false, label, errorMessage, registerName, setValue, ...rest },
    ref
  ) => {
    const [isSearching, setSearching] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [suggestions, setSuggestions] = useState<Cliente[]>([]);

    const debouncedSearch = useCallback(
      lodash.debounce(async (searchArgs) => {
        // TODO: Use Flask API implementation for Cliente Search
      }, 500),
      []
    );

    const searchHandler = (search: string) => {
      debouncedSearch.cancel();
      if (search.length > 3) {
        if (!isSearching) setSearching(true);
        if (!isVisible) setVisible(true);
        debouncedSearch(search);
      } else {
        setVisible(false);
      }
    };

    const searchListContent = () => {
      if (isSearching) {
        return (
          <li>
            <Spinner size="sm" />
          </li>
        );
      }

      if (suggestions.length === 0) {
        return <li>Nenhum cliente encontrado</li>;
      } else {
        return (
          <>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => {
                  setValue(registerName, suggestion.nome);
                  setVisible(false);
                }}
              >
                {suggestion.nome}
              </li>
            ))}
          </>
        );
      }
    };

    return (
      <div
        className="relative"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          searchHandler(e.target.value);
        }}
        onBlur={() => setTimeout(() => setVisible(false), 100)}
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
          <ul className={sugMenu().list()}>{searchListContent()}</ul>
        </div>
      </div>
    );
  }
);

SuggestionInput.displayName = "SuggestionInput";
