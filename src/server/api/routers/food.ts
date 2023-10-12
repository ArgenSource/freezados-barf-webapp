import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { getFoods, getFoodById, createFood } from "~/utils/schemas/food";

export const foodRouter = createTRPCRouter({
  create: publicProcedure.input(createFood).mutation(({ input, ctx }) => {
    return null;
  }),
  getByid: publicProcedure.input(getFoodById).query(({ input, ctx }) => {
    return null;
  }),
  getFromUbication: publicProcedure.input(getFoods).query(({ input, ctx }) => {
    return ctx.db.food.findMany({
      where: {
        ubicationId: input.ubicationId,
        usedAt: null,
      },
      orderBy: {
        storedAt: "asc",
      },
    });
  }),
});
