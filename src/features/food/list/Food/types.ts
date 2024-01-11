import { type Food as TFood } from "@prisma/client";

export type ActionNames = "NONE" | "CONSUME" | "DELETE" | "MOVE" | "EDIT";

export type ActionProps = {
  data: TFood;
  active: boolean;
  refetchFunction: (ubId?: string) => Promise<void>;
  setSelect: (name: ActionNames) => void;
};
