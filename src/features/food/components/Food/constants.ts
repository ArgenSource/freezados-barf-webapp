import type { ActionNames } from "./types";

export const ACTIONS: Record<ActionNames, ActionNames> = {
  NONE: "NONE",
  CONSUME: "CONSUME",
  DELETE: "DELETE",
  MOVE: "MOVE",
  EDIT: "EDIT",
};

// export const READY = "ready";

export const FREEZE_STATES = {
  READY: "ready",
  COUNTING: "counting",
  STOPPED: "stopped",
} as const;

type StateKeys = keyof typeof FREEZE_STATES;
export type FreezeState = (typeof FREEZE_STATES)[StateKeys];
