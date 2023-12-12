import { z } from "zod";
import { requiredError, notValidError } from "./helper";

const FIELD_NAMES = {
  NAME: "Nombre",
  DESCRIPTION: "Descripción",
  SPACE_ID: "Espacio",
  IS_FREEZER: "Tipo",
  ID: "ID",
};

export const createUbication = z.object({
  name: z
    .string({
      required_error: requiredError(FIELD_NAMES.NAME),
      invalid_type_error: notValidError(FIELD_NAMES.NAME),
    })
    .trim()
    .min(1, { message: requiredError(FIELD_NAMES.NAME) }),
  description: z
    .string({ invalid_type_error: notValidError(FIELD_NAMES.DESCRIPTION) })
    .nullish(),
  spaceId: z
    .string({
      required_error: requiredError(FIELD_NAMES.SPACE_ID),
      invalid_type_error: notValidError(FIELD_NAMES.SPACE_ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.SPACE_ID) }),
  isFreezer: z
    .boolean({
      invalid_type_error: notValidError(FIELD_NAMES.IS_FREEZER),
    })
    .nullish(),
});

export const getUbicationById = z.object({
  id: z
    .string({
      required_error: requiredError(FIELD_NAMES.ID),
      invalid_type_error: notValidError(FIELD_NAMES.ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.ID) }),
});
