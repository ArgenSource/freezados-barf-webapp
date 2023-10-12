import { createSpace, getSpace } from "~/utils/schemas/space";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const spaceRouter = createTRPCRouter({
  create: publicProcedure.input(createSpace).mutation(({ input, ctx }) => {
    return ctx.db.space.create({ data: { name: input.name } });
  }),
  getByid: publicProcedure.input(getSpace).query(({ input, ctx }) => {
    return ctx.db.space.findUnique({
      where: {
        id: input.id,
      },
      include: {
        ubications: true,
      },
    });
  }),
});
