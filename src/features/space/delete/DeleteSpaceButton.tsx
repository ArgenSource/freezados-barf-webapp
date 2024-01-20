import { useRouter } from "next/router";
import { toast } from "sonner";
import { type Space } from "@prisma/client";

import { Button } from "~/features/common/components/Buttons";
import { DELETE_SPACE_WARNING } from "../constants";
import { api } from "~/utils/api";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

export const DeleteSpaceButton = ({ id }: { id: Space["id"] }) => {
  const router = useRouter();
  const deleteSpace = api.space.delete.useMutation();

  const handleDeletion = () => {
    if (confirm(DELETE_SPACE_WARNING)) {
      deleteSpace
        .mutateAsync({ id })
        .then(async () => {
          toast.success("Espacio eliminado");
          await router.push("/");
        })
        .catch((err) => renderErrorToast(err, "Error al eliminar espacio"));
    }
  };
  return (
    <Button bigFont className="bg-red-500" onClick={handleDeletion}>
      Eliminar espacio
    </Button>
  );
};
