import Backdrop from "../Backdrop/Backdrop";

import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  visible?: boolean;
  title: string;
  children?: React.ReactNode;
  onClose?: (close: boolean) => void;
};

export const Modal = ({
  visible = false,
  title,
  children,
  onClose,
}: ModalProps) => {
  return (
    <>
      <dialog
        open={visible}
        className="absolute top-0 bottom-0 rounded-md shadow-lg max-h-[80%] z-40 w-11/12 lg:w-3/4 lg:max-h-none bg-slate-200 overflow-y-scroll"
      >
        <header className="flex justify-between content-center border-b-2 border-slate-400 p-4 bg-slate-300">
          <h2 className="font-bold text-2xl my-auto">{title}</h2>
          <button
            onClick={() => onClose && onClose(false)}
            className="ease-in-out duration-300 p-3 bg-red-700 hover:bg-red-600 rounded-2xl shadow-lg"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </header>
        <div className="m-4">{children}</div>
      </dialog>
      <Backdrop visible={visible} onClick={() => onClose && onClose(false)} />
    </>
  );
};
