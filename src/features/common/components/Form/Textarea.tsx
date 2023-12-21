import { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export const Textarea = (props: HTMLProps<HTMLTextAreaElement>) => {
  const styles = twMerge("rounded-md border-2 p-1", props.className);

  return <textarea {...props} className={styles} />;
};
