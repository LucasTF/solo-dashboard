import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <figure className="p-4 pl-8 relative overflow-hidden select-none rounded-lg text-white text-opacity-90 bg-bar-gradient">
      {children}
    </figure>
  );
};

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h2 className="text-lg font-semibold">{title}</h2>;
};

type BackgroundIconProps = {
  icon: React.ReactNode;
};

const BackgroundIcon = ({ icon }: BackgroundIconProps) => {
  return (
    <div className="size-48 absolute right-0 top-0 translate-x-8 -translate-y-8 -rotate-12 opacity-20">
      {icon}
    </div>
  );
};

export const Card = {
  Container,
  Title,
  BackgroundIcon,
};
