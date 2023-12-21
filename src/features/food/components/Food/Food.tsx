import { useState, useCallback } from "react";
import { type Food as TFood } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { twMerge } from "tailwind-merge";

import { FOOD_ICONS } from "~/features/food/utils/foodStyleIcons";
import { api } from "~/utils/api";
import type { ActionNames } from "./types";
import { ACTIONS, FREEZE_STATES } from "./constants";
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

  const freezeStatus = calculateFreezerTime({
    foodType: foodData.type,
    freezedAt: foodData.freezedAt,
  });
  const isFoodReady = freezeStatus.state === FREEZE_STATES.READY;

  const { CONSUME, EDIT, DELETE, MOVE } = ACTIONS;

  const actionComponents = [
    { Component: ConsumeFood, action: CONSUME },
    { Component: DeleteFood, action: DELETE },
    { Component: ChangeFoodUbication, action: MOVE },
    { Component: EditFood, action: EDIT },
  ];

  return (
    <div
      className={twMerge(
        "flex w-full justify-between rounded-md border-2 border-slate-500 p-2",
        isFoodReady ? "border-green-200 bg-green-100" : "bg-slate-600",
      )}
    >
      <div className="flex flex-col justify-center gap-2">
        <div className="flex gap-2">
          {FOOD_ICONS.get(foodData.type)}
          <p>
            {foodData.name} {foodData.ammount}g
          </p>
        </div>
        {freezeStatus.state == FREEZE_STATES.COUNTING && (
          <p> {freezeStatus.time} pendientes</p>
        )}
      </div>
      <div className="flex flex-nowrap items-center gap-2 overflow-hidden rounded-lg bg-violet-800/5 p-1">
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
