"use client";

import { useBackdrop } from "@/hooks/useBackdrop";

const Backdrop = () => {
  const { backdrop, toggleBackdrop } = useBackdrop();

  return (
    <>
      {backdrop && (
        <div
          className="h-screen w-screen absolute top-0 left-0 z-40 bg-black opacity-70"
          onClick={() => toggleBackdrop()}
        ></div>
      )}
    </>
  );
};
export default Backdrop;
