import { useState, useCallback } from "react";
import { type Food as TFood } from "@prisma/client";

import { FOOD_ICONS } from "~/features/food/utils/foodStyleIcons";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import type { ActionNames } from "./types";
import { ACTIONS } from "./constants";
import {
  ChangeFoodUbication,
  DeleteFood,
  EditFood,
  ConsumeFood,
} from "./components";
import { calculateFreezerTime } from "../../utils/calculateFreezerTime";

export function Food({ foodData }: { foodData: TFood }) {
  const [selectedAction, setSelectedAction] = useState<ActionNames>(
    ACTIONS.NONE,
  );
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
  console.log(
    calculateFreezerTime({
      foodType: foodData.type,
      storedAt: foodData.storedAt,
    }),
  );

  const timeInFreezer = calculateFreezerTime({
    foodType: foodData.type,
    storedAt: foodData.storedAt,
  });

  const { CONSUME, EDIT, DELETE, MOVE } = ACTIONS;

  const actionComponents = [
    { Component: ConsumeFood, action: CONSUME },
    { Component: DeleteFood, action: DELETE },
    { Component: ChangeFoodUbication, action: MOVE },
    { Component: EditFood, action: EDIT },
  ];

  return (
    <div className="flex w-full justify-between rounded-md border-2 bg-slate-200 p-2">
      <div className="flex flex-col gap-2">
        <div className="flex">
          {FOOD_ICONS.get(foodData.type)}
          <p>
            {foodData.name} {foodData.ammount}g
          </p>
        </div>
        {/* TODO: Mejorar como indicamos el tiempo cumplido */}
        <p>
          {timeInFreezer === "ready" ? ":)" : `${timeInFreezer} pendientes`}
        </p>
      </div>
      <div className="flex flex-nowrap items-center gap-2 overflow-hidden rounded-lg bg-cyan-800/5 p-1">
        {/* TODO: Fix? -> Cuando una accion es seleccionada en un alimento los demas de la ubicacion siguen
          mostrando su seleccion */}

        {actionComponents.map((action) => {
          const { Component, action: actionName } = action;
          return (
            <Component
              key={actionName}
              data={foodData}
              active={selectedAction == actionName}
              refetchFunction={refetchUbicationData}
              setSelect={handleSelectAction}
            />
          );
        })}
      </div>
    </div>
  );
}
