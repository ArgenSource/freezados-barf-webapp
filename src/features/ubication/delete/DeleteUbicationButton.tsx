import { useRouter } from "next/router";
import { toast } from "sonner";
import { type Ubication } from "@prisma/client";

import { Button } from "~/features/common/components/Buttons";
import { DELETE_UBICATION_WARNING } from "../constants";
import { api } from "~/utils/api";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

export const DeleteUbicationButton = ({ data }: { data: Ubication }) => {
  const router = useRouter();
  const deleteUbication = api.ubication.delete.useMutation();

  const handleDeletion = () => {
    if (confirm(DELETE_UBICATION_WARNING)) {
      deleteUbication
        .mutateAsync({ id: data.id })
        .then(async () => {
          toast.success("Ubicacion eliminada");
          await router.push(`/space/${data.spaceId}`);
        })
        .catch((err) => renderErrorToast(err, "Error al eliminar ubicacion"));
    }
  };

  return (
    <Button bigFont className="bg-red-500" onClick={handleDeletion}>
      Eliminar
    </Button>
  );
};
