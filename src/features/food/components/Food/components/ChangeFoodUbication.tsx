import { useState, type FC } from "react";
import { Replace, XCircle, ThermometerSnowflake } from "lucide-react";

import { api } from "~/utils/api";
import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { Error } from "~/features/common/Error";
import Loader from "~/features/common/Loader";
import Modal from "~/features/common/Modal";

type RelocateStatus = "idle" | "processing" | "error";

export const ChangeFoodUbication: FC<ActionProps> = ({
  data: { id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  // TODO: evaluate alternatives, show error status?
  const [relocateStatus, setRelocateStatus] = useState<RelocateStatus>("idle");

  const openModal = () => setSelect(ACTIONS.MOVE);
  const closeModal = () => setSelect(ACTIONS.NONE);

  const { data: otherUbications, status: statusOtherUbications } =
    api.ubication.getOthers.useQuery(
      {
        id: ubicationId ?? "",
      },
      { refetchOnWindowFocus: false },
    );

  const changeUbication = api.food.changeUbication.useMutation({
    onMutate: () => setRelocateStatus("processing"),
    onError: (error) => {
      setRelocateStatus("error");
      // TODO: handle error data
      console.error(error);
    },
  });

  const handleSelectNewUbication = (ubId: string) => {
    changeUbication
      .mutateAsync({ id, newUbicationId: ubId })
      .then(async (res) => {
        await refetchFunction(res.ubicationId ?? undefined);
        await refetchFunction(ubicationId ?? undefined);
        closeModal();
      })
      .catch((err) => console.error(err));
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
                    <button
                      className="my-2 flex items-center gap-1 rounded-md bg-cyan-200 p-2 text-black"
                      onClick={() => handleSelectNewUbication(ubication.id)}
                    >
                      {ubication.name}
                      <ThermometerSnowflake
                        className={
                          ubication.isFreezer
                            ? "text-cyan-600"
                            : "text-gray-400"
                        }
                      />
                    </button>
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
          <button onClick={closeModal} className="absolute right-2 top-2">
            <XCircle size={20} />
          </button>
          <h6 className="font-bold text-white">Choose the new ubication</h6>
          {renderUbicationOptions()}
        </Modal>
        <button onClick={openModal}>
          <Replace className={active ? "text-green-500" : "text-cyan-500"} />
        </button>
      </>
    )
  );
};
