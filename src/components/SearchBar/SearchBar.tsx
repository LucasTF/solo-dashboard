"use client";

import { ChangeEvent, useCallback } from "react";
import debounce from "lodash/debounce";

const SearchBar = () => {
  const debouncedSearch = useCallback(
    debounce((value) => value && console.log(value), 800),
    []
  );

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar"
      className="w-full p-4 rounded-md"
      onChange={(e) => onSearchHandler(e)}
    />
  );
};

export default SearchBar;
