import type { ActionNames } from "./types";

export const ACTIONS: Record<ActionNames, ActionNames> = {
  NONE: "NONE",
  CONSUME: "CONSUME",
  DELETE: "DELETE",
  MOVE: "MOVE",
  EDIT: "EDIT",
};

export const READY = "ready";
