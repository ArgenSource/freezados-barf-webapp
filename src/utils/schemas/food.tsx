import { z } from 'zod';

export const getFoods = z.object({ ubicationId: z.string().min(1) });

export const createFood = z.object({});

export const getFoodById = z.object({})