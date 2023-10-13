import { type FoodTypes } from "@prisma/client";
import { BeefIcon, Drumstick, Fish, PiggyBank } from "lucide-react";

export type FType = keyof typeof FoodTypes;

export const FOOD_ICONS = new Map<FType, React.JSX.Element>([
  ["CHICKEN", <Drumstick key="chickenIcon" />],
  ["COW", <BeefIcon key="beefIcon" />],
  ["FISH", <Fish key="fishIcon" />],
  ["PORK", <PiggyBank key="pigIcon" />],
]);
