import {
  type PropsWithChildren,
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (ev: PointerEvent) => {
      if (onClickOutside == undefined) return;
      if (
        modalRef.current &&
        !modalRef.current.contains(ev.target as HTMLElement)
      ) {
        onClickOutside();
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [modalRef, onClickOutside]);
  if (!open) return undefined;

  return (
    <>
      <div id="modal-backdrop" className="fixed inset-0 bg-black/20" />
      <div
        className={twMerge(
          "fixed left-1/2 top-1/2 z-10 max-w-full -translate-x-1/2 -translate-y-1/2",
          className,
        )}
        ref={modalRef}
      >
        {children}
      </div>
    </>
  );
}
