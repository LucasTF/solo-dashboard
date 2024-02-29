import React from "react";

type BackdropProps = {
  visible: boolean;
  onClick?: () => void;
};

const Backdrop = ({ visible = false, onClick }: BackdropProps) => {
  const backdropOnClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <>
      {visible && (
        <div
          className="h-screen w-screen max-w-full fixed top-0 left-0 z-30 bg-black bg-opacity-70"
          onClick={(e) => backdropOnClickHandler(e)}
        ></div>
      )}
    </>
  );
};

export default Backdrop;
