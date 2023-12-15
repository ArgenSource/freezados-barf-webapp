import { useState } from "react";
import { AlertTriangle, Share as ShareIcon, XCircle } from "lucide-react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Modal from "~/features/common/Modal";
import PrivacyConfigSelect from "./PrivacyConfigSelect";
import PublicLink from "./PublicLink";
import Invitations from "./Invitations";
import Loader from "~/features/common/Loader";

export default function Share() {
  const [open, setOpen] = useState<boolean>(false);
  const [isConfig, setIsConfig] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { data: space } = api.space.getById.useQuery(
    {
      id: id?.toString() ?? "",
    },
    { enabled: !!id },
  );

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
    <div>
      <button onClick={() => setOpen(true)}>
        <ShareIcon />
      </button>
      <Modal
        className="flex aspect-video w-full max-w-2xl flex-col items-center justify-between gap-2 rounded-lg border-2 border-slate-200 bg-slate-950 py-4 sm:py-0 md:py-6"
        open={open}
        onClickOutside={() => setOpen(false)}
      >
        <button
          className="absolute right-1 top-1 md:right-2 md:top-2"
          onClick={() => setOpen(false)}
        >
          <XCircle size={20} />
        </button>
        {!!space ? (
          <>
            {isConfig ? <PrivacyConfigSelect space={space} /> : renderShare()}
          </>
        ) : (
          <Loader />
        )}
        <button onClick={() => setIsConfig((is) => !is)}>
          {isConfig ? "Invitar" : "Configurar privacidad"}
        </button>
      </Modal>
    </div>
  );
}
