import { FoodTypes } from "@prisma/client";
import { formatDistanceToNowStrict, isFuture } from "date-fns";
import { es } from "date-fns/locale";

import { FREEZE_STATES } from "../list/Food/constants";

type PausedState = {
  state: typeof FREEZE_STATES.STOPPED;
};

type ActiveState = {
  state: typeof FREEZE_STATES.COUNTING;
  time: string;
};

type ReadyState = {
  state: typeof FREEZE_STATES.READY;
};
type FreezeStatus = PausedState | ActiveState | ReadyState;

const daysInMilliseconds = (days: number) => days * 24 * 60 * 60 * 1000;

export const getReadyDate = (
  foodType: FoodTypes,
  freezedAt: Date,
  future = true,
): Date => {
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

  return new Date(
    freezedAt.getTime() + (future ? freezeTime : freezeTime * -1),
  );
};

export const calculateFreezerTime = ({
  foodType,
  freezedAt,
}: {
  foodType: FoodTypes;
  freezedAt: Date | null;
}): FreezeStatus => {
  if (!freezedAt)
    return {
      state: FREEZE_STATES.STOPPED,
    };
  const readyBy = getReadyDate(foodType, freezedAt);

  return isFuture(readyBy)
    ? {
        state: FREEZE_STATES.COUNTING,
        time: formatDistanceToNowStrict(readyBy, { locale: es }),
      }
    : { state: FREEZE_STATES.READY };
};
