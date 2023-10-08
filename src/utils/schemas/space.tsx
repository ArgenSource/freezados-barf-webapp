import { z } from 'zod';

export const createSpace = z.object({ name: z.string().min(1) });

export const getSpace = z.object({ id: z.string().min(1) })