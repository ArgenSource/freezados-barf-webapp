import {
  type PropsWithChildren,
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react";
import { XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  open: boolean;
  onClickOutside?: () => void;
};

export function Modal({
  children,
  open,
  onClickOutside,
  className,
  ...props
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

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClickOutside == undefined) return;
    onClickOutside();
  };

  return (
    <>
      <div id="modal-backdrop" className="fixed inset-0 bg-black/40" />
      <div
        className={twMerge(
          "fixed left-1/2 top-1/2 z-10 max-w-full -translate-x-1/2 -translate-y-1/2",
          className,
        )}
        ref={modalRef}
        {...props}
      >
        <button onClick={handleCloseClick} className="ml-auto">
          <XCircle size={20} />
        </button>
        {children}
      </div>
    </>
  );
}
