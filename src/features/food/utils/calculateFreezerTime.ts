import { FoodTypes } from "@prisma/client";
import { formatDuration } from "date-fns";

export const calculateFreezerTime = ({
  foodType,
  storedAt,
}: {
  foodType: FoodTypes;
  storedAt: Date;
}): string => {
  const storedTimeInMilliseconds = new Date().getTime() - storedAt.getTime();

  const daysInMilliseconds = (days: number) => days * 24 * 60 * 60 * 1000;

  const calculatePendingTime = (days: number) =>
    formatDuration(
      {
        days: 0,
        hours: 0,
        seconds: (daysInMilliseconds(days) - storedTimeInMilliseconds) / 1000,
      },
      { format: ["days", "hours", "seconds"] },
    );

  const isReadyOrPending = (days: number) =>
    storedTimeInMilliseconds >= daysInMilliseconds(days)
      ? "ready"
      : calculatePendingTime(days);

  switch (foodType) {
    case FoodTypes.COW:
    case FoodTypes.CHICKEN:
      return isReadyOrPending(3);
    case FoodTypes.FISH:
      return isReadyOrPending(7);
    case FoodTypes.PORK:
      return isReadyOrPending(14);
    default:
      return "Not ready";
  }
};
