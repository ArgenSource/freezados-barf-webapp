import React, { useState, useCallback } from "react";
import { type Food as TFood } from "@prisma/client";
import { ArrowBigDownDash, Trash2, Replace, XCircle } from "lucide-react";

import { FOOD_ICONS } from "~/utils/icons/foodStyleIcons";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import Modal from "../common/Modal";

type ACTION_NAMES = "NONE" | "CONSUME" | "DELETE" | "MOVE";

export default function Food({ foodData }: { foodData: TFood }) {
  const [selectedAction, setSelectedAction] = useState<ACTION_NAMES>("NONE");
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

  const handleSelectAction = useCallback((name: ACTION_NAMES) => {
    setSelectedAction(name);
  }, []);

  return (
    <div className="flex w-full justify-between rounded-md border-2 bg-slate-200 p-2">
      <div className="flex gap-2">
        {FOOD_ICONS.get(foodData.type)} {foodData.name} {foodData.ammount}g
      </div>
      <div className="flex flex-nowrap items-center gap-1 overflow-hidden rounded-lg bg-cyan-800/5 p-1">
        {/* TODO: No repetir codigo, optimizar, refactorizar */}
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
  setSelect: (name: ACTION_NAMES) => void;
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

const ChangeUbication: React.FC<ActionProps> = ({
  data: { id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  const openModal = () => setSelect("MOVE");
  const closeModal = () => setSelect("NONE");
  return (
    <div>
      <Modal
        open={active}
        onClickOutside={closeModal}
        className="w-full max-w-md bg-green-500 p-4"
      >
        <div className="relative h-full w-full">
          <button onClick={closeModal} className="absolute right-0 top-0">
            <XCircle size={20} />
          </button>
          <h1>Hello</h1>
        </div>
      </Modal>
      <button onClick={openModal}>
        <Replace className={active ? "text-green-500" : "text-cyan-500"} />
      </button>
    </div>
  );
};
