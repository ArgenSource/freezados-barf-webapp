import { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export const Input = (props: HTMLProps<HTMLInputElement>) => {
  const styles = twMerge(
    "rounded-md border-2 p-1 text-violet-900",
    props.className,
  );

  return <input {...props} className={styles} />;
};
