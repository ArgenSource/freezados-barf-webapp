import { createTRPCRouter, publicProcedure } from "../trpc";
import { createUbication, getUbicationById } from "~/utils/schemas/ubication";

export const ubicationRouter = createTRPCRouter({
  getById: publicProcedure.input(getUbicationById).query(({ input, ctx }) => {
    return ctx.db.ubication.findUnique({ where: { id: input.id } });
  }),
  create: publicProcedure.input(createUbication).mutation(({ input, ctx }) => {
    return ctx.db.ubication.create({
      data: {
        ...input,
        isFreezer: input.isFreezer ?? true,
        description: input.description ?? "",
      },
    });
  }),
});
