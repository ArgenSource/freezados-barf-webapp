import type { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type ErrorProps = {
  message?: string;
};

export const Error = (props: HTMLProps<HTMLParagraphElement> & ErrorProps) => {
  const visible = props.message ? "block" : "hidden";
  const styles = twMerge("text-red-500 text-sm", props.className, visible);

  return <p className={styles}>*{props.message}</p>;
};
