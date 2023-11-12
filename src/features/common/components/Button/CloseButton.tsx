import { XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const CloseButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const styles = twMerge("absolute right-2 top-2", props.className);
  return (
    <button {...props} className={styles}>
      <XCircle size={20} />
    </button>
  );
};
