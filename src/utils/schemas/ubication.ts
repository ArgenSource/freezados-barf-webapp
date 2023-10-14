import { z } from "zod";

export const createUbication = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  spaceId: z.string().min(1),
  isFreezer: z.boolean().nullish(),
});

export const getUbicationById = z.object({
  id: z.string().min(1),
});
