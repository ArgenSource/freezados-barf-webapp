import { z } from "zod";
import { SharedConfig } from "@prisma/client";
import { notValidError, requiredError } from "./helper";

const FIELD_NAMES = {
  NAME: "Nombre",
  ID: "ID",
  SHARED_CONFIG: "Configuración de privacidad",
  INVITATION_ID: "Código de invitación",
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

export const setPrivacy = z.object({
  id: z
    .string({
      required_error: requiredError(FIELD_NAMES.ID),
      invalid_type_error: notValidError(FIELD_NAMES.ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.ID) }),
  config: z.enum(
    [SharedConfig.INVITATION, SharedConfig.PRIVATE, SharedConfig.PUBLIC_LINK],
    {
      required_error: requiredError(FIELD_NAMES.SHARED_CONFIG),
      invalid_type_error: notValidError(FIELD_NAMES.SHARED_CONFIG),
    },
  ),
});

export const joinRequest = z.object({
  spaceId: z
    .string({
      required_error: requiredError(FIELD_NAMES.ID),
      invalid_type_error: notValidError(FIELD_NAMES.ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.ID) }),
});

export const joinWithInvitationRequest = z.object({
  spaceId: z
    .string({
      required_error: requiredError(FIELD_NAMES.ID),
      invalid_type_error: notValidError(FIELD_NAMES.ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.ID) }),
  invitationId: z
    .string({
      required_error: requiredError(FIELD_NAMES.INVITATION_ID),
      invalid_type_error: notValidError(FIELD_NAMES.INVITATION_ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.INVITATION_ID) }),
});

export const invitation = z.object({
  spaceId: z
    .string({
      required_error: requiredError(FIELD_NAMES.ID),
      invalid_type_error: notValidError(FIELD_NAMES.ID),
    })
    .min(1, { message: requiredError(FIELD_NAMES.ID) }),
});
