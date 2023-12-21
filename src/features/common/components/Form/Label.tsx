import { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type LabelProps = {
  text: string;
} & HTMLProps<HTMLLabelElement>;

export const Label = ({ text, ...props }: LabelProps) => {
  const styles = twMerge("", props.className);

  return (
    <label {...props} className={styles}>
      {text}
    </label>
  );
};
