import { useState } from "react";
import { Share as ShareIcon } from "lucide-react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { ShareModal } from "./ShareModal";

export function ShareSpace() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const { id } = router.query;

  const { data: space } = api.space.getById.useQuery(
    {
      id: id?.toString() ?? "",
    },
    { enabled: !!id },
  );

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        <ShareIcon />
      </button>
      <ShareModal
        isModalOpen={isModalOpen}
        space={space}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}
