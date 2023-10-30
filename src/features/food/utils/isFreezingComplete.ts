import { FoodTypes } from "@prisma/client";

export const isFreezingComplete = ({
  foodType,
  storedAt,
}: {
  foodType: FoodTypes;
  storedAt: Date;
}): boolean => {
  const now = new Date().getTime();
  const storedAtTime = storedAt.getTime();
  const difference = now - storedAtTime;

  const threeDaysInMilliseconds = 72 * 60 * 60 * 1000;
  const sevenDaysInMilliseconds = 168 * 60 * 60 * 1000;
  const fourteenDaysInMilliseconds = 336 * 60 * 60 * 1000;

  switch (foodType) {
    case FoodTypes.COW:
    case FoodTypes.CHICKEN:
      return difference >= threeDaysInMilliseconds ? true : false;
    case FoodTypes.FISH:
      return difference >= sevenDaysInMilliseconds ? true : false;
    case FoodTypes.PORK:
      return difference >= fourteenDaysInMilliseconds ? true : false;
    default:
      return false;
  }
};
