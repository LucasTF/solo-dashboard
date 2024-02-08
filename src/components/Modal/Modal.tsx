import Backdrop from "../Backdrop/Backdrop";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";

type ModalProps = {
  visible?: boolean;
  title: string;
  children?: React.ReactNode;
  onClose?: (close: boolean) => void;
};

const Modal = ({ visible = false, title, children, onClose }: ModalProps) => {
  return (
    <>
      <dialog
        open={visible}
        className="absolute top-0 bottom-0 rounded-md shadow-lg max-h-[80%] z-40 w-11/12 lg:w-3/4 lg:max-h-none bg-slate-200 overflow-y-hidden"
      >
        <header className="flex justify-between content-center border-b-2 border-slate-400 p-4 bg-slate-300">
          <h2 className="font-bold text-2xl my-auto select-none">{title}</h2>
          <Button
            color="red"
            shape="close"
            onClick={() => onClose && onClose(false)}
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </Button>
        </header>
        <div className="m-4">{children}</div>
      </dialog>
      <Backdrop visible={visible} onClick={() => onClose && onClose(false)} />
    </>
  );
};

export default Modal;
