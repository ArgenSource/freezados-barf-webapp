import { type HTMLProps } from "react";

export const Input = (props: HTMLProps<HTMLInputElement>) => (
  <input {...props} className={`rounded-md border-2 p-1 ${props.className}`} />
);
