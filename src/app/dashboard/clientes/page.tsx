import { FunnelIcon } from "@heroicons/react/24/outline";

import Databoard from "@/components/Databoard/Databoard";
import SearchBar from "@/components/SearchBar/SearchBar";
import DataOptions from "@/components/DataOptions/DataOptions";

export default function Dashboard() {
  return (
    <div className="my-8">
      <h1 className="font-bold text-4xl w-11/12 lg:w-4/5 mx-auto mb-8 text-white">
        Clientes
      </h1>

      <main className="p-8 bg-slate-200 w-11/12 lg:w-4/5 mx-auto rounded-md shadow-lg">
        <header className="flex gap-4">
          <SearchBar />

          <button
            type="button"
            className="py-2 px-4 rounded-md shadow-md ease-in-out duration-300 hover:bg-sky-800 hover:text-white"
          >
            <FunnelIcon className="h-6 w-6" />
          </button>
        </header>

        <Databoard />

        <DataOptions />
      </main>
    </div>
  );
}
