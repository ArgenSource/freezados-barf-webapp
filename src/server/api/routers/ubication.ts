import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  createUbication,
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

  delete: protectedProcedure
    .input(getUbicationById)
    .mutation(({ ctx, input }) =>
      ctx.db.ubication.delete({ where: { id: input.id } }),
    ),
});
