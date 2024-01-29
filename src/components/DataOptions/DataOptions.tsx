"use client";

import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";

const DataOptions = () => {
  const [backdrop, showBackdrop] = useState(false);

  return (
    <div className="mt-6 flex flex-row-reverse">
      <button
        type="button"
        className="bg-green-700 ease-in-out duration-300 hover:bg-green-600 font-semibold text-white p-4 rounded-md"
        onClick={() => showBackdrop(true)}
      >
        + Novo Cliente
      </button>
      <Backdrop visible={backdrop} onClick={() => showBackdrop(false)} />
    </div>
  );
};
export default DataOptions;
