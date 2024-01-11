import { SharedConfig, type Space } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Mail, Globe, Lock } from "lucide-react";
import { type ReactNode, useState } from "react";

import { api } from "~/utils/api";

type ShareProps = {
  space: Space;
};

type SharedConfigDetails = {
  name: string;
  description: string;
  icon: ReactNode;
};

const PUBLIC_CONFIG_NAMES: Record<SharedConfig, SharedConfigDetails> = {
  INVITATION: {
    name: "Por invitación",
    description: "Solo aquellas personas que invites pueden acceder",
    icon: <Mail />,
  },
  PUBLIC_LINK: {
    name: "Público",
    description: "Todos los que tengan el link pueden acceder",
    icon: <Globe />,
  },
  PRIVATE: {
    name: "Privado",
    description: "Solo tu puedes acceder",
    icon: <Lock />,
  },
};

export default function PrivacyConfigSelect({ space }: ShareProps) {
  const [privacyConfig, setPrivacyConfig] = useState<SharedConfig>(
    space.sharedConfig,
  );
  const queryClient = useQueryClient();
  const privacy = api.space.changePrivacyConfig.useMutation({
    onSuccess: () =>
      queryClient.refetchQueries({
        queryKey: getQueryKey(api.space.getById, { id: space.id }, "query"),
      }),
  });
  const handleSubmit = (val: SharedConfig) => {
    if (val !== space.sharedConfig && !privacy.isLoading) {
      setPrivacyConfig(val);
      privacy.mutate({ id: space.id, config: val });
    }
  };

  return (
    <>
      <h2 className="my-2 text-center">
        Configura la privacidad de tu espacio y compartelo
      </h2>
      <div className="grid grid-rows-3 items-center justify-center gap-2 p-2 md:grid-cols-3 md:grid-rows-1">
        {Object.values(SharedConfig).map((val) => (
          <label
            htmlFor={val}
            key={val}
            onClick={() => handleSubmit(val)}
            className={`flex h-full cursor-pointer flex-col items-center justify-evenly rounded-md border-2 text-center lg:aspect-video ${
              val == privacyConfig ? "" : "border-slate-500 text-slate-500"
            }`}
          >
            <h6>{PUBLIC_CONFIG_NAMES[val].name}</h6>
            {PUBLIC_CONFIG_NAMES[val].icon}
            <p className="text-sm italic">
              {PUBLIC_CONFIG_NAMES[val].description}
            </p>
            <input
              type="radio"
              value={val}
              id={val}
              checked={val == privacyConfig}
              className="hidden"
              readOnly
            />
          </label>
        ))}
      </div>
    </>
  );
}
