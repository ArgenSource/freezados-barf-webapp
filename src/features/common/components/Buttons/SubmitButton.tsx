import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "./Button";

type SubmitButtonProps = {
  status: "error" | "loading" | "success" | "idle";
  errorMessage?: string;
  errorStyle?: string;
  loadingStyle?: string;
  successStyle?: string;
} & ButtonProps;

const DEFAULT_STATE_STYLES = {
  errorStyle: "bg-red-500",
  loadingStyle: "",
  successStyle: "bg-green-600",
};

export const SubmitButton = ({
  status,
  errorMessage,
  children,
  className,
  errorStyle = DEFAULT_STATE_STYLES.errorStyle,
  loadingStyle = DEFAULT_STATE_STYLES.loadingStyle,
  successStyle = DEFAULT_STATE_STYLES.successStyle,
  ...props
}: SubmitButtonProps) => {
  let state: ReactNode;
  let style = "";

  switch (status) {
    case "error":
      state = <h2>{errorMessage ?? "Error"}</h2>;
      style = errorStyle;
      break;
    case "loading":
      state = <Loader2 className="animate-spin" />;
      style = loadingStyle;
      break;
    case "success":
      state = <p>✅</p>;
      style = successStyle;
      break;
    case "idle":
    default:
      state = children;
  }

  return (
    <Button
      type="submit"
      className={twMerge(className, style)}
      disabled={status !== "idle"}
      {...props}
    >
      {state}
    </Button>
  );
};
