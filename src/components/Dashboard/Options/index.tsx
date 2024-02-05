"use client";

import { useState } from "react";
import { Modal } from "../../Modal/Modal";

export const DashboardOptions = () => {
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

      <Modal
        visible={isModalVisible}
        title="Novo Cliente"
        onClose={() => toggleModal(false)}
      ></Modal>
    </div>
  );
};
