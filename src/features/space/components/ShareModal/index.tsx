import React from "react";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { type SharedConfig } from "@prisma/client";

import PublicLink from "./PublicLink";
import Invitations from "./Invitations";
import { Loader, Modal } from "~/features/common/components";
import PrivacyConfigSelect from "./PrivacyConfigSelect";

interface Props {
  space:
    | {
        id: string;
        name: string;
        ownerId: string;
        sharedConfig: SharedConfig;
      }
    | null
    | undefined;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ShareModal = ({ isModalOpen, closeModal, space }: Props) => {
  const [isConfig, setIsConfig] = useState<boolean>(false);
  const renderShare = () => {
    if (!space) return;
    switch (space.sharedConfig) {
      case "PUBLIC_LINK":
        return <PublicLink />;
      case "INVITATION":
        return <Invitations />;
      case "PRIVATE":
      default:
        return (
          <div className="flex grow flex-col items-center justify-center gap-4">
            <AlertTriangle size={36} className="text-yellow-500" />
            <p
              className={`text-center text-sm text-red-500 ${
                space.sharedConfig == "PRIVATE" ? "visible" : "invisible"
              }`}
            >
              Tu espacio esta configurado como privado, cambia su configuración
              para poder invitar otros miembros
            </p>
          </div>
        );
    }
  };

  return (
    <Modal
      className="flex aspect-video w-full max-w-2xl flex-col items-center justify-between gap-2 rounded-lg border-2 border-slate-200 bg-slate-950 p-4 py-4 sm:py-0 md:py-6"
      open={isModalOpen}
      onClickOutside={() => closeModal()}
    >
      {!!space ? (
        <>{isConfig ? <PrivacyConfigSelect space={space} /> : renderShare()}</>
      ) : (
        <Loader />
      )}
      <button onClick={() => setIsConfig((is) => !is)}>
        {isConfig ? "Invitar" : "Configurar privacidad"}
      </button>
    </Modal>
  );
};
