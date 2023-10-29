import { useState, useCallback } from "react";
import { type Food as TFood } from "@prisma/client";

import { FOOD_ICONS } from "~/utils/icons/foodStyleIcons";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Retrieve } from "./components/Retrieve";
import type { ActionNames } from "./types";
import { Delete } from "./components/Delete";
import { ChangeUbication } from "./components/ChangeUbication";
import { Edit } from "./components/Edit";

export function Food({ foodData }: { foodData: TFood }) {
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
        <Edit
          data={foodData}
          active={selectedAction == "EDIT"}
          refetchFunction={refetchUbicationData}
          setSelect={handleSelectAction}
        />
      </div>
    </div>
  );
}
