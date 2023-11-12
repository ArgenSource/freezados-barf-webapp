import { FREEZE_STATES } from "~/features/food/components/Food/constants";
import { calculateFreezerTime } from "~/features/food/utils/calculateFreezerTime";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import {
  getFoodsFromUbication,
  getFoodById,
  createFood,
  consume,
  changeUbication as changeUbicationSchema,
  editFood,
} from "~/utils/schemas/food";

export const foodRouter = createTRPCRouter({
  create: publicProcedure.input(createFood).mutation(async ({ input, ctx }) => {
    const { isFreezer } = await ctx.db.ubication.findUniqueOrThrow({
      where: { id: input.ubicationId },
      select: { isFreezer: true },
    });
    return ctx.db.food.create({
      data: {
        ...input,
        ammount: parseFloat(input.ammount),
        storedAt: new Date(),
        freezedAt: isFreezer ? new Date() : undefined,
        description: input.description ?? "",
      },
    });
  }),

  // TODO: replace null?
  getByid: publicProcedure.input(getFoodById).query(({ input, ctx }) => null),

  getFromUbication: publicProcedure
    .input(getFoodsFromUbication)
    .query(({ input, ctx }) =>
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
    .mutation(async ({ ctx, input }) => {
      const { freezedAt, type: foodType } = await ctx.db.food.findUniqueOrThrow(
        {
          where: { id: input.id },
        },
      );
      const { isFreezer, id: newUbicationId } =
        await ctx.db.ubication.findUniqueOrThrow({
          where: { id: input.newUbicationId },
          select: { id: true, isFreezer: true },
        });

      let newFreezedTime = freezedAt;
      if (!isFreezer) {
        const freezeStatus = calculateFreezerTime({ foodType, freezedAt });
        if (freezeStatus.state != FREEZE_STATES.READY) {
          newFreezedTime = null;
        }
      } else if (!freezedAt) {
        newFreezedTime = new Date();
      }
      return ctx.db.food.update({
        where: {
          id: input.id,
        },
        data: {
          ubicationId: newUbicationId,
          freezedAt: newFreezedTime,
        },
      });
    }),

  deleteById: publicProcedure
    .input(getFoodById)
    .mutation(({ ctx, input }) =>
      ctx.db.food.delete({ where: { id: input.id } }),
    ),
});
