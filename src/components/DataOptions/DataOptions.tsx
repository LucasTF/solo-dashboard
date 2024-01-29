"use client";

import { useBackdrop } from "@/hooks/useBackdrop";

const DataOptions = () => {
  const { toggleBackdrop } = useBackdrop();

  return (
    <div className="flex flex-row-reverse">
      <button
        type="button"
        className="bg-green-700 ease-in-out duration-300 hover:bg-green-600 font-semibold text-white p-4 rounded-md"
        onClick={() => toggleBackdrop()}
      >
        + Novo Cliente
      </button>
    </div>
  );
};
export default DataOptions;
