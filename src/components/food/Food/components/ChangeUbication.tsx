import { useState, type FC } from "react";
import { Replace, XCircle, ThermometerSnowflake } from "lucide-react";

import { api } from "~/utils/api";
import Modal from "../../../common/Modal";
import Loader from "../../../common/Loader";
import type { ActionProps } from "../types";

type RelocateStatus = "idle" | "processing" | "error";

export const ChangeUbication: React.FC<ActionProps> = ({
  data: { id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  const openModal = () => setSelect("MOVE");
  const closeModal = () => setSelect("NONE");

  const { data: otherUbications, status } = api.ubication.getOthers.useQuery(
    {
      id: ubicationId ?? "",
    },
    { refetchOnWindowFocus: false },
  );

  // TODO: evaluate alternatives, show error status?
  const [relocateStatus, setRelocateStatus] = useState<RelocateStatus>("idle");

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

  const renderOptions = () => {
    switch (status) {
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
        return <h6>Oops</h6>;
    }
  };

  return (
    <div>
      <Modal
        open={active}
        onClickOutside={closeModal}
        className="flex w-full max-w-md flex-col items-center justify-center rounded-md bg-gray-500 p-4"
      >
        <button onClick={closeModal} className="absolute right-2 top-2">
          <XCircle size={20} />
        </button>
        <h6 className="font-bold text-white">Choose the new ubication</h6>
        {renderOptions()}
      </Modal>
      <button onClick={openModal}>
        <Replace className={active ? "text-green-500" : "text-cyan-500"} />
      </button>
    </div>
  );
};
