import React from "react";

type BackdropProps = {
  visible: boolean;
  onClick?: () => void;
};

const Backdrop = ({ visible = false, onClick }: BackdropProps) => {
  return (
    <>
      {visible && (
        <div
          className="h-screen w-screen max-w-full absolute top-0 left-0 z-30 bg-black bg-opacity-70"
          onClick={() => onClick && onClick()}
        ></div>
      )}
    </>
  );
};
export default Backdrop;
