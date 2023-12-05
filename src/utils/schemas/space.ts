import { z } from "zod";
import { notValidError, requiredError } from "./helper";

const FIELD_NAMES = {
  NAME: "Nombre",
  ID: "ID",
};

export const createSpace = z.object({
  name: z
    .string({
      required_error: requiredError(FIELD_NAMES.NAME),
      invalid_type_error: notValidError(FIELD_NAMES.NAME),
    })
    .trim()
    .min(1, { message: requiredError(FIELD_NAMES.NAME) }),
});

export const getSpace = z.object({
  id: z
    .string({
      required_error: requiredError(FIELD_NAMES.ID),
      invalid_type_error: notValidError(FIELD_NAMES.ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.ID) }),
});
