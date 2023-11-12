import { twMerge } from "tailwind-merge";

export const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const styles = twMerge(
    "flex max-w-md items-center justify-center rounded-md bg-gray-500 p-2",
    props.className,
  );
  return <button {...props} className={styles} />;
};
