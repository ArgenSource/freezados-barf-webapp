import { FREEZE_STATES } from "~/features/food/list/Food/constants";
import { calculateFreezerTime } from "~/features/food/utils/calculateFreezerTime";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  getFoods,
  getFoodById,
  createFood,
  consume,
  changeUbication as changeUbicationSchema,
  editFood,
} from "~/utils/schemas/food";

export const foodRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createFood)
    .mutation(async ({ input, ctx }) => {
      const { isFreezer } = await ctx.db.ubication.findUniqueOrThrow({
        where: { id: input.ubicationId },
        select: { isFreezer: true },
      });

      return ctx.db.food.create({
        data: {
          type: input.type,
          ubicationId: input.ubicationId,
          name: input.name,
          ammount: input.ammount,
          storedAt: input.date ?? new Date(),
          freezedAt: isFreezer ? input.date : undefined,
          description: input.description ?? "",
        },
      });
    }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByid: publicProcedure.input(getFoodById).query(({ input, ctx }) => null),

  getFromUbication: protectedProcedure.input(getFoods).query(({ input, ctx }) =>
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

  consume: protectedProcedure
    .input(consume)
    .mutation(async ({ input, ctx }) => {
      const current = await ctx.db.food.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (input.ammount >= current.ammount) {
        await ctx.db.food.update({
          where: { id: input.id },
          data: {
            usedAt: new Date(),
          },
        });
      } else {
        await ctx.db.$transaction([
          ctx.db.food.update({
            where: { id: input.id },
            data: {
              ammount: { decrement: input.ammount },
            },
          }),
          ctx.db.food.create({
            data: {
              ammount: input.ammount,
              usedAt: new Date(),
              name: current.name,
              description: current.description,
              type: current.type,
              storedAt: current.storedAt,
              freezedAt: current.freezedAt,
              ubication: {
                connect: {
                  id: current.ubicationId?.toString(),
                },
              },
            },
          }),
        ]);
      }

      return true;
    }),

  editFoodData: protectedProcedure.input(editFood).mutation(({ ctx, input }) =>
    ctx.db.food.update({
      where: { id: input.id },
      data: {
        ammount: input.ammount ?? undefined,
        type: input.type,
        name: input.name,
        description: input.description,
        freezedAt: input.freezeDate,
        storedAt: input.storeDate,
      },
    }),
  ),

  changeUbication: protectedProcedure
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

  deleteById: protectedProcedure
    .input(getFoodById)
    .mutation(({ ctx, input }) =>
      ctx.db.food.delete({ where: { id: input.id } }),
    ),
});
