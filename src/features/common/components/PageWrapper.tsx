import React, { type PropsWithChildren } from "react";

export const PageWrapper = ({ children }: PropsWithChildren) => (
  <main className="h-screen bg-zinc-900 text-violet-300">{children}</main>
);