import { z } from "zod";
import { SharedConfig } from "@prisma/client";

import { notValidError, requiredError } from "./helper";

const FIELD_NAMES = {
  NAME: "Nombre",
  ID: "ID",
  SHARED_CONFIG: "Configuración de privacidad",
  INVITATION_ID: "Código de invitación",
};

// ----- BASE SCHEMAS -----
const name = z
  .string({
    required_error: requiredError(FIELD_NAMES.NAME),
    invalid_type_error: notValidError(FIELD_NAMES.NAME),
  })
  .trim();

const id = z
  .string({
    required_error: requiredError(FIELD_NAMES.ID),
    invalid_type_error: notValidError(FIELD_NAMES.ID),
  })
  .min(1, { message: requiredError(FIELD_NAMES.ID) });

const spaceId = z
  .string({
    required_error: requiredError(FIELD_NAMES.ID),
    invalid_type_error: notValidError(FIELD_NAMES.ID),
  })
  .min(1, { message: requiredError(FIELD_NAMES.ID) });

const invitationId = z
  .string({
    required_error: requiredError(FIELD_NAMES.INVITATION_ID),
    invalid_type_error: notValidError(FIELD_NAMES.INVITATION_ID),
  })
  .min(1, { message: requiredError(FIELD_NAMES.INVITATION_ID) });

const sharedConfig = z.enum(
  [SharedConfig.INVITATION, SharedConfig.PRIVATE, SharedConfig.PUBLIC_LINK],
  {
    required_error: requiredError(FIELD_NAMES.SHARED_CONFIG),
    invalid_type_error: notValidError(FIELD_NAMES.SHARED_CONFIG),
  },
);
// --------------------------

// ----- ACTUAL SCHEMAS -----
export const createSpace = z.object({
  name: name.min(1, { message: requiredError(FIELD_NAMES.NAME) }),
});

export const getSpace = z.object({
  id: id,
});

export const setPrivacy = z.object({
  id: id,
  config: sharedConfig,
});

export const edit = z.object({
  id: id,
  name: name.optional(),
});

export const joinRequest = z.object({
  spaceId: spaceId,
});

export const joinWithInvitationRequest = z.object({
  spaceId: spaceId,
  invitationId: invitationId,
});

export const invitation = z.object({
  spaceId: spaceId,
});
