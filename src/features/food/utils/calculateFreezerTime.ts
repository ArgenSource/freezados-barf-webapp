import { FoodTypes } from "@prisma/client";
import { formatDuration } from "date-fns";

export const calculateFreezerTime = ({
  foodType,
  storedAt,
}: {
  foodType: FoodTypes;
  storedAt: Date;
}): string => {
  const storedInMilliseconds = new Date().getTime() - storedAt.getTime();

  const timeInMilliseconds = (days: number) => days * 24 * 60 * 60 * 1000;

  const formattedDuration = formatDuration({
    seconds: storedInMilliseconds / 1000,
  });

  switch (foodType) {
    case FoodTypes.COW:
    case FoodTypes.CHICKEN:
      if (storedInMilliseconds >= timeInMilliseconds(3)) return "ready";
    case FoodTypes.FISH:
      if (storedInMilliseconds >= timeInMilliseconds(7)) return "ready";
    case FoodTypes.PORK:
      if (storedInMilliseconds >= timeInMilliseconds(14)) return "ready";
    default:
      return formattedDuration;
  }
};
