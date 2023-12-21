import { useState } from "react";
import { useRouter } from "next/router";
import { Copy } from "lucide-react";

import { api } from "~/utils/api";
import { Loader } from "~/features/common/components";

export default function Invitations() {
  const router = useRouter();
  const { id } = router.query;
  const [link, setLink] = useState<string>();
  const invitation = api.space.createInvitation.useMutation();

  const copyLinkToClipboard = () => {
    link && void navigator.clipboard.writeText(link);
  };

  const handleGetLink = () => {
    if (!id) return;
    setLink("");
    invitation
      .mutateAsync({ spaceId: id.toString() })
      .then((res) => {
        setLink(window.location.origin + router.asPath + "/join/" + res.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex w-full grow flex-col items-center justify-center gap-2">
      <p className="p-4 text-center text-sm text-yellow-500">
        Los links de invitacion son de uso unico, envia uno distinto a cada
        invitado
      </p>
      <div className="flex w-full items-center justify-stretch gap-2 md:w-4/5">
        <input
          className="grow rounded-md bg-slate-100 p-2 text-black md:w-4/5"
          type="text"
          value={link}
          defaultValue={link}
          readOnly
        />
        <button
          onClick={copyLinkToClipboard}
          className="flex items-center justify-center gap-2"
        >
          <Copy />
        </button>
      </div>
      <button
        onClick={handleGetLink}
        disabled={invitation.isLoading}
        className="w-full p-2"
      >
        {invitation.isLoading ? <Loader size={36} /> : "Obtener link"}
      </button>
    </div>
  );
}
