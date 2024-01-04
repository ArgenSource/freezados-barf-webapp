import { getReadyDate } from "~/features/food/utils/calculateFreezerTime";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  createUbication,
  editUbication,
  getOthersFromSpace,
  getUbicationById,
} from "~/utils/schemas/ubication";

export const ubicationRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(getUbicationById)
    .query(({ input, ctx }) =>
      ctx.db.ubication.findUnique({ where: { id: input.id } }),
    ),

  getOthers: protectedProcedure
    .input(getOthersFromSpace)
    .query(({ input, ctx }) =>
      ctx.db.ubication.findMany({
        where: { id: { not: input.id }, spaceId: input.spaceId },
        select: {
          name: true,
          id: true,
          isFreezer: true,
        },
      }),
    ),

  create: protectedProcedure.input(createUbication).mutation(({ input, ctx }) =>
    ctx.db.ubication.create({
      data: {
        ...input,
        isFreezer: input.isFreezer ?? true,
        description: input.description ?? "",
      },
    }),
  ),

  edit: protectedProcedure
    .input(editUbication)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const current = await ctx.db.ubication.findUniqueOrThrow({
        where: { id: input.id },
      });

      const updated = await ctx.db.ubication.update({
        where: {
          id: id,
        },
        data: data,
      });

      if (current.isFreezer && !updated.isFreezer) {
        // TODO: Mejor manera?
        await ctx.db.food.updateMany({
          where: {
            ubicationId: id,
            usedAt: null,
            OR: [
              {
                AND: [
                  {
                    freezedAt: {
                      gt: getReadyDate("CHICKEN", new Date(), false),
                    },
                  },
                  { type: "CHICKEN" },
                ],
              },
              {
                AND: [
                  { freezedAt: { gt: getReadyDate("COW", new Date(), false) } },
                  { type: "COW" },
                ],
              },
              {
                AND: [
                  {
                    freezedAt: { gt: getReadyDate("FISH", new Date(), false) },
                  },
                  { type: "FISH" },
                ],
              },
              {
                AND: [
                  {
                    freezedAt: { gt: getReadyDate("PORK", new Date(), false) },
                  },
                  { type: "PORK" },
                ],
              },
            ],
          },
          data: {
            freezedAt: null,
          },
        });
      }
      if (!current.isFreezer && updated.isFreezer) {
        await ctx.db.food.updateMany({
          where: {
            ubicationId: id,
            usedAt: null,
            freezedAt: null,
          },
          data: {
            freezedAt: new Date(),
          },
        });
      }

      return updated;
    }),

  delete: protectedProcedure
    .input(getUbicationById)
    .mutation(({ ctx, input }) =>
      ctx.db.ubication.delete({ where: { id: input.id } }),
    ),
});
