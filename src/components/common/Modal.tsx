import { type PropsWithChildren, useEffect, type HTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

type ModalProps = {
  open: boolean;
  onClickOutside?: () => void;
};

export default function Modal({
  children,
  open,
  onClickOutside,
  className,
}: PropsWithChildren<ModalProps & HTMLAttributes<HTMLDivElement>>) {
  if (!open) return undefined;
  return (
    <>
      <div id="modal-backdrop" className="fixed inset-0 bg-black/20" />
      <div
        className={twMerge(
          "fixed left-1/2 top-1/2 z-10 max-w-full -translate-x-1/2 -translate-y-1/2",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
