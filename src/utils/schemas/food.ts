import { z } from "zod";
import { FoodTypes } from "@prisma/client";

export const getFoods = z.object({ ubicationId: z.string().min(1) });

export const createFood = z.object({
  ubicationId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullish(),
  ammount: z.string().min(1),
  type: z.enum([
    FoodTypes.COW,
    FoodTypes.FISH,
    FoodTypes.PORK,
    FoodTypes.CHICKEN,
  ]),
});

export const editFood = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  description: z.string().optional(),
  ammount: z.string().optional(),
  type: z.enum([
    FoodTypes.COW,
    FoodTypes.FISH,
    FoodTypes.PORK,
    FoodTypes.CHICKEN,
  ]),
});

export const getFoodById = z.object({
  id: z.string().min(1),
});

export const consume = z.object({
  id: z.string().min(1),
  ammount: z.number().min(0),
});

export const changeUbication = z.object({
  id: z.string().min(1),
  newUbicationId: z.string().min(1),
});
