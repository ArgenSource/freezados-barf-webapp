import { XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const styles = twMerge(
    "flex max-w-md items-center justify-center rounded-md bg-gray-500 p-2 bg-cyan-200 p-2 text-black",
    props.className,
  );
  return <button {...props} className={styles} />;
};

const CloseButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const styles = twMerge("absolute right-2 top-2", props.className);
  return (
    <button {...props} className={styles}>
      <XCircle size={20} />
    </button>
  );
};

Button.Close = CloseButton;
