import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import {
  getFoods,
  getFoodById,
  createFood,
  consume,
  changeUbication as changeUbicationSchema,
  editFood,
} from "~/utils/schemas/food";

export const foodRouter = createTRPCRouter({
  create: publicProcedure.input(createFood).mutation(({ input, ctx }) =>
    ctx.db.food.create({
      data: {
        ...input,
        ammount: parseFloat(input.ammount),
        storedAt: new Date(),
        description: input.description ?? "",
      },
    }),
  ),

  getByid: publicProcedure.input(getFoodById).query(({ input, ctx }) => null),

  getFromUbication: publicProcedure.input(getFoods).query(({ input, ctx }) =>
    ctx.db.food.findMany({
      where: {
        ubicationId: input.ubicationId,
        usedAt: null,
      },
      orderBy: {
        storedAt: "asc",
      },
    }),
  ),

  consume: publicProcedure.input(consume).mutation(async ({ input, ctx }) => {
    const updated = await ctx.db.food.update({
      where: { id: input.id, ammount: { gte: input.ammount } },
      data: {
        ammount: {
          decrement: input.ammount,
        },
      },
    });
    if (updated.ammount == 0) {
      await ctx.db.food.update({
        where: { id: updated.id },
        data: {
          usedAt: new Date(),
        },
      });
    } else {
      await ctx.db.food.create({
        data: {
          ...updated,
          id: undefined,
          ammount: 0,
          usedAt: new Date(),
        },
      });
    }
    return true;
  }),

  editFoodData: publicProcedure.input(editFood).mutation(({ ctx, input }) =>
    ctx.db.food.update({
      where: { id: input.id },
      data: {
        ammount: input.ammount ? parseFloat(input.ammount) : undefined,
        type: input.type,
        name: input.name,
        description: input.description,
      },
    }),
  ),

  changeUbication: publicProcedure
    .input(changeUbicationSchema)
    .mutation(({ ctx, input }) =>
      ctx.db.food.update({
        where: {
          id: input.id,
        },
        data: {
          ubicationId: input.newUbicationId,
        },
      }),
    ),

  deleteById: publicProcedure
    .input(getFoodById)
    .mutation(({ ctx, input }) =>
      ctx.db.food.delete({ where: { id: input.id } }),
    ),
});
