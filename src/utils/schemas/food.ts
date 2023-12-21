import { z } from "zod";
import { FoodTypes } from "@prisma/client";

import { requiredError, notValidError, outOfBoundsError } from "./helper";

const FIELD_NAMES = {
  UBICATION: "Ubicación",
  NAME: "Nombre",
  AMMOUNT: "Cantidad",
  DESCRIPTION: "Descripción",
  TYPE: "Tipo",
  ID: "ID",
  DATE: "Fecha",
};

// ----- BASE SCHEMAS -----
const ubicationId = z
  .string({
    required_error: requiredError(FIELD_NAMES.UBICATION),
    invalid_type_error: notValidError(FIELD_NAMES.UBICATION),
  })
  .min(1, { message: requiredError(FIELD_NAMES.UBICATION) });

const name = z
  .string({
    required_error: requiredError(FIELD_NAMES.NAME),
    invalid_type_error: notValidError(FIELD_NAMES.NAME),
  })
  .trim()
  .min(1, { message: requiredError(FIELD_NAMES.NAME) });

const description = z.string({
  invalid_type_error: notValidError(FIELD_NAMES.DESCRIPTION),
});

const ammount = z.coerce
  .number({
    required_error: requiredError(FIELD_NAMES.AMMOUNT),
    invalid_type_error: notValidError(FIELD_NAMES.AMMOUNT),
  })
  .min(1, { message: outOfBoundsError(FIELD_NAMES.AMMOUNT, 1) });

const type = z.enum(
  [FoodTypes.COW, FoodTypes.FISH, FoodTypes.PORK, FoodTypes.CHICKEN],
  {
    required_error: requiredError(FIELD_NAMES.TYPE),
    invalid_type_error: notValidError(FIELD_NAMES.TYPE),
  },
);

const id = z
  .string({
    required_error: requiredError(FIELD_NAMES.ID),
    invalid_type_error: notValidError(FIELD_NAMES.ID),
  })
  .min(1, { message: requiredError(FIELD_NAMES.ID) });

const date = z
  .date({
    invalid_type_error: notValidError(FIELD_NAMES.DATE),
    coerce: true,
  })
  .optional();

// --------------------------

// ----- ACTUAL SCHEMAS -----
export const getFoods = z.object({
  ubicationId: ubicationId,
});

export const createFood = z.object({
  ubicationId: ubicationId,
  name: name,
  description: description.nullish(),
  ammount: ammount,
  type: type,
  date: date,
});

export const editFood = z.object({
  id: id,
  name: name.optional(),
  description: description.optional(),
  ammount: ammount.optional(),
  type: type,
});

export const getFoodById = z.object({
  id: id,
});

export const consume = z.object({
  id: id,
  ammount: z.coerce
    .number({
      required_error: requiredError(FIELD_NAMES.AMMOUNT),
      invalid_type_error: notValidError(FIELD_NAMES.AMMOUNT),
    })
    .min(0, { message: outOfBoundsError(FIELD_NAMES.AMMOUNT, 0) }),
});

export const changeUbication = z.object({
  id: id,
  newUbicationId: ubicationId,
});
