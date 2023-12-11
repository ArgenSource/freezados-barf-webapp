import { useState } from "react";
import { Share as ShareIcon, XCircle } from "lucide-react";
import { type Space } from "@prisma/client";
import Modal from "~/features/common/Modal";
import PrivacyConfigSelect from "./PrivacyConfigSelect";
import PublicLink from "./PublicLink";
import Invitations from "./Invitations";

type ShareProps = {
  space: Space;
};

export default function Share({ space }: ShareProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isConfig, setIsConfig] = useState<boolean>(false);

  const renderShare = () => {
    switch (space.sharedConfig) {
      case "PUBLIC_LINK":
        return <PublicLink />;
      case "INVITATION":
        return <Invitations />;
      case "PRIVATE":
      default:
        return (
          <>
            <p
              className={`text-center text-sm text-red-500 ${
                space.sharedConfig == "PRIVATE" ? "visible" : "invisible"
              }`}
            >
              Tu espacio esta configurado como privado, cambia su configuración
              para poder invitar otros miembros
            </p>
          </>
        );
    }
  };
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <ShareIcon />
      </button>
      <Modal
        className="flex w-full max-w-2xl flex-col items-center justify-center gap-2 rounded-lg border-2 border-slate-200 bg-slate-950 md:aspect-video"
        open={open}
        onClickOutside={() => setOpen(false)}
      >
        <button
          className="absolute right-2 top-2"
          onClick={() => setOpen(false)}
        >
          <XCircle size={20} />
        </button>
        {isConfig ? <PrivacyConfigSelect space={space} /> : renderShare()}
        <button onClick={() => setIsConfig((is) => !is)}>
          {isConfig ? "Invitar" : "Configurar privacidad"}
        </button>
      </Modal>
    </div>
  );
}
