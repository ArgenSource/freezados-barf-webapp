import { type Ubication as TUbication } from "@prisma/client";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { api } from "~/utils/api";
import Ubication from "./Ubication";
import { BackButton, Button } from "../common/components/Buttons";
import { renderErrorToast } from "../common/utils/renderErrorToast";
import { EditUbicationForm } from "./EditUbicationForm";

const DELETE_WARNING =
  "¿Estás seguro que quieres eliminar esta ubicación?\n" +
  "Todos los alimentos que se encuentren en el se borrarán y no podrán ser recuperados.\n" +
  "Cámbialos de ubicación primero si deseas conservarlos";

export function UbicationPage({ data }: { data: TUbication }) {
  const router = useRouter();
  const deleteUbication = api.ubication.delete.useMutation();

  const handleDeletion = () => {
    if (confirm(DELETE_WARNING)) {
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
    <>
      <BackButton />
      <Ubication data={data} />
      <EditUbicationForm data={data} />
      <Button bigFont className="bg-red-500" onClick={handleDeletion}>
        Eliminar
      </Button>
    </>
  );
}
