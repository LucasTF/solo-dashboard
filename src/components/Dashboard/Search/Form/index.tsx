import { FunnelIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Search } from "..";

type SearchFormProps = {
  searchTargets?: { name: string; value: string }[];
  selectedIndex?: number;
};

export const SearchForm = ({
  searchTargets,
  selectedIndex = 0,
}: SearchFormProps) => {
  return (
    <form className="flex gap-4 max-md:flex-col">
      <Search.Bar />

      <div className="flex gap-4">
        <select
          className="min-w-48 rounded-md p-4 max-md:w-full"
          name="search-target"
          disabled={searchTargets === undefined || searchTargets?.length === 0}
        >
          {searchTargets?.map((target, index) => (
            <option value={target.value} selected={selectedIndex === index}>
              {target.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-6 rounded-md shadow-md ease-in-out duration-300 text-white bg-green-700 hover:bg-green-600"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>

        <button
          type="button"
          className="px-4 rounded-md shadow-md ease-in-out duration-300 hover:bg-sky-800 hover:text-white"
        >
          <FunnelIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};
