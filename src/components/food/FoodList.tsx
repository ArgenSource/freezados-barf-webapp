import { type Food as TFood } from "@prisma/client";
import { FOOD_ICONS } from "~/utils/icons/foodStyleIcons";

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
  return (
    <div className="flex w-full justify-between rounded-md border-2 bg-slate-200 p-2">
      <div className="flex gap-2">
        {FOOD_ICONS.get(foodData.type)} {foodData.name} {foodData.ammount}g
      </div>
      {/* TODO */}
      <div>actions</div>
    </div>
  );
}
