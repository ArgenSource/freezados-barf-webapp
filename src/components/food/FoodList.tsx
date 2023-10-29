import { type Food as TFood } from "@prisma/client";
import { Food } from "./Food";

export default function FoodList({ foods }: { foods: TFood[] }) {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      {foods.map((f) => (
        <Food key={f.id} foodData={f} />
      ))}
    </div>
  );
}
