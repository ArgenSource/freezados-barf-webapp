import { type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  className?: string;
  secondary?: boolean;
  gray?: boolean;
  bigFont?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  secondary = false,
  gray = false,
  bigFont = false,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={twMerge(
      "my-2 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-500 p-2 text-white transition-all",
      className,
      secondary ? "bg-cyan-600" : "",
      gray ? " bg-zinc-700/50" : "",
      bigFont ? "p-4 text-xl font-bold" : "",
    )}
    {...props}
  >
    {children}
  </button>
);
