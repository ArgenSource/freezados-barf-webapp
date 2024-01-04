import { z } from "zod";

import { requiredError, notValidError } from "./helper";

const FIELD_NAMES = {
  NAME: "Nombre",
  DESCRIPTION: "Descripción",
  SPACE_ID: "Espacio",
  IS_FREEZER: "Tipo",
  ID: "ID",
};

// ----- BASE SCHEMAS -----
const id = z
  .string({
    required_error: requiredError(FIELD_NAMES.ID),
    invalid_type_error: notValidError(FIELD_NAMES.ID),
  })
  .min(1, { message: requiredError(FIELD_NAMES.ID) });
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

const spaceId = z
  .string({
    required_error: requiredError(FIELD_NAMES.SPACE_ID),
    invalid_type_error: notValidError(FIELD_NAMES.SPACE_ID),
  })
  .min(1, { message: requiredError(FIELD_NAMES.SPACE_ID) });

const isFreezer = z.boolean({
  invalid_type_error: notValidError(FIELD_NAMES.IS_FREEZER),
});
// --------------------------

// ----- ACTUAL SCHEMAS -----
export const createUbication = z.object({
  name: name,
  description: description.optional(),
  spaceId: spaceId,
  isFreezer: isFreezer,
});

export const editUbication = z.object({
  id: id,
  name: name.optional(),
  description: description.optional(),
  isFreezer: isFreezer.optional(),
});

export const getUbicationById = z.object({
  id: id,
});

export const getOthersFromSpace = z.object({
  id: id,
  spaceId: spaceId,
});
