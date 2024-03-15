import { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const skeleton = tv({
  base: "animate-pulse rounded-md bg-white bg-opacity-15 h-9 w-24",
});

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...rest }: SkeletonProps) => {
  return <div className={skeleton({ className })} {...rest}></div>;
};
