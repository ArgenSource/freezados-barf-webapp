import { FoodTypes } from "@prisma/client";
import { formatDistanceToNowStrict, isFuture } from "date-fns";
import { es } from "date-fns/locale";

const daysInMilliseconds = (days: number) => days * 24 * 60 * 60 * 1000;

const getReadyDate = (foodType: FoodTypes, storedAt: Date): Date => {
  let freezeTime = 0;
  switch (foodType) {
    case FoodTypes.COW:
    case FoodTypes.CHICKEN:
      freezeTime = daysInMilliseconds(3);
      break;
    case FoodTypes.FISH:
      freezeTime = daysInMilliseconds(7);
      break;
    case FoodTypes.PORK:
      freezeTime = daysInMilliseconds(14);
      break;
    default:
      freezeTime - Infinity;
  }
  return new Date(storedAt.getTime() + freezeTime);
};

export const calculateFreezerTime = ({
  foodType,
  storedAt,
}: {
  foodType: FoodTypes;
  storedAt: Date;
}): string => {
  const readyBy = getReadyDate(foodType, storedAt);

  return isFuture(readyBy)
    ? formatDistanceToNowStrict(readyBy, { locale: es })
    : "ready";
};
