type ModalProps = {
  visible?: boolean;
  children?: React.ReactNode;
};

export const Modal = ({ visible = false, children }: ModalProps) => {
  let modalAnimation = visible ? "translate-y-0" : "-translate-y-[150%]";

  return (
    <div
      className={
        "ease-in-out duration-300 absolute top-0 left-0 right-0 rounded-md shadow-lg mt-16 mx-auto z-40 w-11/12 lg:w-3/4 h-72 bg-slate-200" +
        " " +
        modalAnimation
      }
    >
      {children}
    </div>
  );
};
