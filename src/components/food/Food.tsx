import React, { useState, useCallback } from "react";
import { type Food as TFood } from "@prisma/client";
import {
  ArrowBigDownDash,
  Trash2,
  Replace,
  XCircle,
  ThermometerSnowflake,
} from "lucide-react";

import { FOOD_ICONS } from "~/utils/icons/foodStyleIcons";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import Modal from "../common/Modal";
import Loader from "../common/Loader";

type ActionNames = "NONE" | "CONSUME" | "DELETE" | "MOVE";

export default function Food({ foodData }: { foodData: TFood }) {
  const [selectedAction, setSelectedAction] = useState<ActionNames>("NONE");
  const queryClient = useQueryClient();

  const refetchUbicationData = useCallback(
    (ubId?: string) =>
      queryClient.refetchQueries({
        queryKey: getQueryKey(
          api.food.getFromUbication,
          { ubicationId: ubId },
          "query",
        ),
      }),
    [queryClient],
  );

  const handleSelectAction = useCallback((name: ActionNames) => {
    setSelectedAction(name);
  }, []);

  return (
    <div className="flex w-full justify-between rounded-md border-2 bg-slate-200 p-2">
      <div className="flex gap-2">
        {FOOD_ICONS.get(foodData.type)} {foodData.name} {foodData.ammount}g
      </div>
      <div className="flex flex-nowrap items-center gap-1 overflow-hidden rounded-lg bg-cyan-800/5 p-1">
        {/* TODO: No repetir codigo, optimizar, refactorizar */}
        {/* TODO: Fix? -> Cuando una accion es seleccionada en un alimento los demas de la ubicacion siguen
          mostrando su seleccion */}
        <Retrieve
          data={foodData}
          active={selectedAction == "CONSUME"}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
        <Delete
          data={foodData}
          active={selectedAction == "DELETE"}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
        <ChangeUbication
          data={foodData}
          active={selectedAction == "MOVE"}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
      </div>
    </div>
  );
}

type ActionProps = {
  data: TFood;
  active: boolean;
  refetchFunction: (ubId?: string) => Promise<void>;
  setSelect: (name: ActionNames) => void;
};

const Retrieve: React.FC<ActionProps> = ({
  data: { ammount, id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  const [retrieveAmmount, setRetrieveAmmount] = useState<number>(ammount);

  const retrieve = api.food.consume.useMutation({
    onSuccess: async () => {
      await refetchFunction(ubicationId ?? undefined);
    },
  });

  const retrieveFood = () => {
    if (active) {
      retrieve
        .mutateAsync({
          id: id,
          ammount: Math.min(retrieveAmmount, ammount),
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };
  return (
    <div
      onClick={() => setSelect("CONSUME")}
      className="flex items-center gap-1"
    >
      <label
        className={`${active ? "block" : "hidden"} w-min whitespace-nowrap`}
      >
        <input
          type="number"
          max={ammount}
          step={1}
          min={0}
          value={retrieveAmmount}
          onChange={(e) => setRetrieveAmmount(parseInt(e.target.value))}
          className="text w-16 px-1 text-right"
        />
        <span className="ml-1">g</span>
      </label>
      <button onClick={retrieveFood}>
        <ArrowBigDownDash
          className={active ? "text-green-500" : "text-cyan-500"}
        />
      </button>
    </div>
  );
};

const Delete: React.FC<ActionProps> = ({
  data: { id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  const deleteFood = api.food.deleteById.useMutation({
    onSuccess: async () => {
      await refetchFunction(ubicationId ?? undefined);
    },
  });

  const confirmDelete = () => {
    if (active) {
      deleteFood.mutateAsync({ id: id }).catch((err) => console.error(err));
    }
  };
  return (
    <div
      onClick={() => setSelect("DELETE")}
      className="flex items-center gap-1"
    >
      <button onClick={confirmDelete}>
        <Trash2 className={active ? "text-red-600" : "text-gray-500"} />
      </button>
    </div>
  );
};

type RelocateStatus = "idle" | "processing" | "error";

const ChangeUbication: React.FC<ActionProps> = ({
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
        className="w-full max-w-md rounded-md bg-gray-500 p-4"
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center text-white">
          <button onClick={closeModal} className="absolute right-0 top-0">
            <XCircle size={20} />
          </button>
          <h6>Choose the new ubication</h6>
          {renderOptions()}
        </div>
      </Modal>
      <button onClick={openModal}>
        <Replace className={active ? "text-green-500" : "text-cyan-500"} />
      </button>
    </div>
  );
};
