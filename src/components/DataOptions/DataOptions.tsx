"use client";

import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { Modal } from "../Modal/Modal";

const DataOptions = () => {
  const [isModalVisible, toggleModal] = useState(false);

  return (
    <div className="mt-6 flex flex-row-reverse">
      <button
        type="button"
        className="bg-green-700 ease-in-out duration-300 hover:bg-green-600 font-semibold text-white p-4 rounded-md"
        onClick={() => toggleModal(true)}
      >
        + Novo Cliente
      </button>

      <Modal visible={isModalVisible} />

      <Backdrop
        visible={isModalVisible}
        onClick={() => toggleModal(false)}
      ></Backdrop>
    </div>
  );
};

export default DataOptions;
