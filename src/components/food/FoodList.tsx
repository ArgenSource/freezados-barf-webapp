import { type Food as TFood } from "@prisma/client";
import { ArrowBigDownDash } from "lucide-react";

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

  const retrieveAll = () => {
    retrieve
      .mutateAsync({ id: foodData.id, ammount: foodData.ammount })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex w-full justify-between rounded-md border-2 bg-slate-200 p-2">
      <div className="flex gap-2">
        {FOOD_ICONS.get(foodData.type)} {foodData.name} {foodData.ammount}g
      </div>
      <div>
        <button onClick={retrieveAll}>
          <ArrowBigDownDash />
        </button>
      </div>
    </div>
  );
}
