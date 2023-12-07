import { z } from "zod";
import { SharedConfig } from "@prisma/client";

export const createSpace = z.object({ name: z.string().min(1) });

export const getSpace = z.object({
  id: z.string().min(1),
});

export const setPrivacy = z.object({
  id: z.string().min(1),
  config: z.enum([
    SharedConfig.INVITATION,
    SharedConfig.PRIVATE,
    SharedConfig.PUBLIC_LINK,
  ]),
});

export const joinRequest = z.object({
  spaceId: z.string().min(1),
});

export const joinWithInvitationRequest = z.object({
  spaceId: z.string().min(1),
  invitationId: z.string().min(1),
});

export const invitation = z.object({
  spaceId: z.string().min(1),
});
