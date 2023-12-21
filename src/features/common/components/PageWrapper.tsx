import React, { type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const PageWrapper = ({
  children,
  classNames,
}: PropsWithChildren<{ classNames?: string }>) => {
  const styles = twMerge(
    "min-h-screen bg-zinc-900 text-violet-300",
    classNames,
  );

  return <main className={styles}>{children}</main>;
};
