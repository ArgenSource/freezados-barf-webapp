import { useState, type FC } from "react";
import { Replace, ThermometerSnowflake } from "lucide-react";
import { useRouter } from "next/router";
import { type Ubication } from "@prisma/client";
import { toast } from "sonner";

import { api } from "~/utils/api";
import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { Loader, Modal } from "~/features/common/components";
import { Error } from "~/features/common/components/Form";
import { Button } from "~/features/common/components/Buttons";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

type RelocateStatus = "idle" | "processing" | "error";

type OtherUbication = Pick<Ubication, "id" | "name" | "isFreezer">;

export const ChangeFoodUbication: FC<ActionProps> = ({
  data: { id: foodId, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  // TODO: evaluate alternatives, show error status?
  const [relocateStatus, setRelocateStatus] = useState<RelocateStatus>("idle");

  const router = useRouter();
  const { id: spaceId } = router.query;

  const openModal = () => setSelect(ACTIONS.MOVE);
  const closeModal = () => setSelect(ACTIONS.NONE);

  const { data } = api.ubication.getById.useQuery(
    { id: ubicationId ?? "" },
    { enabled: !!ubicationId },
  );

  const isCurrentUbicationFreezer = data?.isFreezer ?? false;

  const { data: otherUbications, status: statusOtherUbications } =
    api.ubication.getOthers.useQuery(
      {
        id: ubicationId ?? "",
        spaceId: spaceId?.toString() ?? "",
      },
      { refetchOnWindowFocus: false, enabled: !!spaceId && !!ubicationId },
    );

  const changeUbication = api.food.changeUbication.useMutation({
    onMutate: () => setRelocateStatus("processing"),
    onError: () => {
      setRelocateStatus("error");
    },
    onSuccess: () => {
      // TODO: Dar mas informacion sobre el alimento movido
      // "Alimento movido de X a Y"
      toast.success("Alimento movido");
      setRelocateStatus("idle");
    },
  });

  const handleSelectNewUbication = (newUbication: OtherUbication) => {
    if (isCurrentUbicationFreezer && !newUbication.isFreezer) {
      if (
        !confirm(
          "Esta comida actualmente se encuentra en el freezer y la nueva ubicacion no es un freezer. Confirmar de todas formas?",
        )
      ) {
        return;
      }
    }

    changeUbication
      .mutateAsync({ id: foodId, newUbicationId: newUbication.id })
      .then(async (res) => {
        await refetchFunction(res.ubicationId ?? undefined);
        await refetchFunction(ubicationId ?? undefined);
        closeModal();
      })
      .catch((err) => renderErrorToast(err, "Error al cambiar ubicacion"));
  };

  const renderUbicationOptions = () => {
    switch (statusOtherUbications) {
      case "loading":
        return <Loader />;
      case "success":
        if (otherUbications) {
          return (
            <ul>
              {relocateStatus == "processing" ? (
                <Loader />
              ) : (
                otherUbications.map((ubication) => (
                  <li key={ubication.id}>
                    <Button onClick={() => handleSelectNewUbication(ubication)}>
                      {ubication.name}
                      {ubication.isFreezer && <ThermometerSnowflake />}
                    </Button>
                  </li>
                ))
              )}
            </ul>
          );
        }
      case "error":
      default:
        return <Error />;
    }
  };

  return (
    !!otherUbications?.length && (
      <>
        <Modal
          open={active}
          onClickOutside={closeModal}
          className="flex w-full max-w-md flex-col items-center justify-center rounded-md bg-gray-500 p-4"
        >
          <h6 className="font-bold text-white">Elegir la nueva ubicacion</h6>
          {renderUbicationOptions()}
        </Modal>
        <button onClick={openModal}>
          <Replace className={active ? "text-green-500" : "text-cyan-500"} />
        </button>
      </>
    )
  );
};
