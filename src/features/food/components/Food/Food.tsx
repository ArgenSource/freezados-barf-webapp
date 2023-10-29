import { useState, useCallback } from "react";
import { type Food as TFood } from "@prisma/client";

import { FOOD_ICONS } from "~/features/food/utils/foodStyleIcons";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import type { ActionNames } from "./types";
import { ACTIONS } from "./constants";
import { ChangeUbication, Delete, Edit, Consume } from "./components";
import { isFreezingComplete } from "../../utils/isFreezingComplete";

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
          {isFreezingComplete({
            foodType: foodData.type,
            storedAt: foodData.storedAt,
          }) && "TIEMPO CUMPLIDO"}
        </p>
      </div>
      <div className="flex flex-nowrap items-center gap-2 overflow-hidden rounded-lg bg-cyan-800/5 p-1">
        {/* TODO: No repetir codigo, optimizar, refactorizar */}
        {/* TODO: Fix? -> Cuando una accion es seleccionada en un alimento los demas de la ubicacion siguen
          mostrando su seleccion */}
        <Consume
          data={foodData}
          active={selectedAction == ACTIONS.CONSUME}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
        <Delete
          data={foodData}
          active={selectedAction == ACTIONS.DELETE}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
        <ChangeUbication
          data={foodData}
          active={selectedAction == ACTIONS.MOVE}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
        <Edit
          data={foodData}
          active={selectedAction == ACTIONS.EDIT}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
      </div>
    </div>
  );
}
