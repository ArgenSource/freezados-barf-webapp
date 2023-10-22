import { useState } from "react";
import { type Food as TFood } from "@prisma/client";
import { ArrowBigDownDash, XCircle } from "lucide-react";

import { FOOD_ICONS } from "~/utils/icons/foodStyleIcons";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

export default function FoodList({ foods }: { foods: TFood[] }) {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      {foods.map((f) => (
        <Food key={f.id} foodData={f} />
      ))}
    </div>
  );
}

function Food({ foodData }: { foodData: TFood }) {
  const [retrieveAmmount, setRetrieveAmmount] = useState<number>(
    foodData.ammount,
  );
  const [isRetriveActive, setIsRetriveActive] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const retrieve = api.food.consume.useMutation({
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getQueryKey(
          api.food.getFromUbication,
          { ubicationId: foodData.ubicationId ?? undefined },
          "query",
        ),
      });
    },
  });

  const retrieveFood = () => {
    if (isRetriveActive) {
      retrieve
        .mutateAsync({
          id: foodData.id,
          ammount: Math.min(retrieveAmmount, foodData.ammount),
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    } else setIsRetriveActive(true);
  };

  return (
    <div className="flex w-full justify-between rounded-md border-2 bg-slate-200 p-2">
      <div className="flex gap-2">
        {FOOD_ICONS.get(foodData.type)} {foodData.name} {foodData.ammount}g
      </div>
      <div className="flex flex-nowrap items-center gap-1 overflow-hidden rounded-lg bg-cyan-800/5 p-1">
        {isRetriveActive && (
          <>
            <button onClick={() => setIsRetriveActive(false)}>
              <XCircle />
            </button>
            <input
              type="number"
              max={foodData.ammount}
              step={1}
              min={0}
              value={retrieveAmmount}
              onChange={(e) => setRetrieveAmmount(parseInt(e.target.value))}
              className="w-min p-1 text-right"
            />
            g
          </>
        )}
        <button onClick={retrieveFood}>
          <ArrowBigDownDash
            className={isRetriveActive ? "text-green-500" : "text-cyan-500"}
          />
        </button>
      </div>
    </div>
  );
}
