import React, { useState, useCallback } from "react";
import { type Food as TFood } from "@prisma/client";
import { ArrowBigDownDash, Trash2 } from "lucide-react";

import { FOOD_ICONS } from "~/utils/icons/foodStyleIcons";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

export default function Food({ foodData }: { foodData: TFood }) {
  const [selectedAction, setSelectedAction] = useState<string>("NONE");
  const queryClient = useQueryClient();

  const refetchFunction = useCallback(
    () =>
      queryClient.refetchQueries({
        queryKey: getQueryKey(
          api.food.getFromUbication,
          { ubicationId: foodData.ubicationId ?? undefined },
          "query",
        ),
      }),
    [foodData.ubicationId, queryClient],
  );

  // TODO: Better handle state
  const handleSelectAction = (name: string) => {
    if (name !== selectedAction) {
      setSelectedAction(name);
    }
  };
  return (
    <div className="flex w-full justify-between rounded-md border-2 bg-slate-200 p-2">
      <div className="flex gap-2">
        {FOOD_ICONS.get(foodData.type)} {foodData.name} {foodData.ammount}g
      </div>
      <div className="flex flex-nowrap items-center gap-1 overflow-hidden rounded-lg bg-cyan-800/5 p-1">
        {/* TODO: No repetir codigo, optimizar, refactorizar */}
        <Retrieve
          data={foodData}
          active={selectedAction == "Retrieve"}
          refetchFunction={refetchFunction}
          setSelect={() => handleSelectAction("Retrieve")}
        />
        <Delete
          data={foodData}
          active={selectedAction == "Delete"}
          refetchFunction={refetchFunction}
          setSelect={() => handleSelectAction("Delete")}
        />
      </div>
    </div>
  );
}

type ActionProps = {
  data: TFood;
  active: boolean;
  refetchFunction: () => Promise<void>;
  setSelect: () => void;
};

const Retrieve: React.FC<ActionProps> = ({
  data: { ammount, id },
  active,
  refetchFunction,
  setSelect,
}) => {
  const [retrieveAmmount, setRetrieveAmmount] = useState<number>(ammount);

  const retrieve = api.food.consume.useMutation({
    onSuccess: async () => {
      await refetchFunction();
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
    <div onClick={setSelect} className="flex items-center gap-1">
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
  data: { id },
  active,
  refetchFunction,
  setSelect,
}) => {
  // TODO: Agregar funcionalidad de delete e implementar aqui
  return (
    <div onClick={setSelect} className="flex items-center gap-1">
      <button onClick={() => console.log("to delete: ", id)}>
        <Trash2 className={active ? "text-red-600" : "text-gray-500"} />
      </button>
    </div>
  );
};
