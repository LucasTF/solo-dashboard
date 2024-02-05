import { FunnelIcon } from "@heroicons/react/24/outline";
import { Search } from "..";

export const SearchForm = () => {
  return (
    <form className="flex gap-4">
      <Search.Bar />

      <button
        type="button"
        className="py-2 px-4 rounded-md shadow-md ease-in-out duration-300 hover:bg-sky-800 hover:text-white"
      >
        <FunnelIcon className="h-6 w-6" />
      </button>
    </form>
  );
};
