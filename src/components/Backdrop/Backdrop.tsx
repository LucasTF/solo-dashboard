type BackdropProps = {
  visible: boolean;
  onClick?: () => void;
};

const Backdrop = ({ visible, onClick }: BackdropProps) => {
  return (
    <>
      {visible && (
        <div
          className="h-screen w-screen absolute top-0 left-0 z-30 bg-black opacity-70"
          onClick={() => onClick && onClick()}
        ></div>
      )}
    </>
  );
};
export default Backdrop;
