import { z } from "zod";
import { FoodTypes } from "@prisma/client";

export const getFoods = z.object({ ubicationId: z.string().min(1) });

export const createFood = z.object({
  ubicationId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  ammount: z.number().min(1),
  type: z.enum([
    FoodTypes.COW,
    FoodTypes.FISH,
    FoodTypes.PORK,
    FoodTypes.SHEEP,
  ]),
});

export const getFoodById = z.object({});
