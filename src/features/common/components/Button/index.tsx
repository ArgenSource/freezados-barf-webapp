import { twMerge } from "tailwind-merge";
import { CloseButton } from "./CloseButton";

export const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const styles = twMerge(
    "flex max-w-md items-center justify-center rounded-md p-2 bg-cyan-200 p-2 text-black",
    props.className,
  );
  return <button {...props} className={styles} />;
};

Button.Close = CloseButton;
