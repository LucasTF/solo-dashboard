import { XMarkIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import Backdrop from "./Backdrop";
import Button from "./Button";

type ModalProps = {
  visible?: boolean;
  title: string;
  className?: string;
  children?: React.ReactNode;
  onClose?: (close: boolean) => void;
};

const modal = tv({
  slots: {
    modalBase:
      "fixed top-0 bottom-0 rounded-md shadow-lg z-40 max-w-11/12 lg:max-w-3/4 bg-slate-200 dark:bg-zinc-800 overflow-hidden",
    modalHeader:
      "flex justify-between items-center border-b-2 space-x-8 border-slate-400 dark:border-zinc-900 p-4 bg-slate-300 dark:bg-gray-800",
    modalTitle: "font-bold text-2xl my-auto select-none",
  },
});

const { modalBase, modalHeader, modalTitle } = modal();

const Modal = ({
  visible = false,
  title,
  className,
  children,
  onClose,
}: ModalProps) => {
  return (
    <>
      <dialog open={visible} className={modalBase()}>
        <header className={modalHeader({ className })}>
          <h2 className={modalTitle()}>{title}</h2>
          <Button
            color="red"
            shape="close"
            onClick={() => onClose && onClose(false)}
          >
            <XMarkIcon className="size-6 text-white" />
          </Button>
        </header>
        <div className="overflow-y-auto max-h-[40rem]">{children}</div>
      </dialog>
      <Backdrop visible={visible} onClick={() => onClose && onClose(false)} />
    </>
  );
};

export default Modal;
