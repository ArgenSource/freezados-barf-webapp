import { createSpace, getSpace } from "~/utils/schemas/space";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const spaceRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSpace)
    .mutation(({ input, ctx }) =>
      ctx.db.space.create({ data: { name: input.name } }),
    ),

  getAll: publicProcedure.query(({ ctx }) =>
    // TODO: Change to get only by user (when some kind of auth is implemented)
    ctx.db.space.findMany(),
  ),

  getByid: protectedProcedure.input(getSpace).query(({ input, ctx }) =>
    ctx.db.space.findUnique({
      where: {
        id: input.id,
      },
      include: {
        ubications: true,
      },
    }),
  ),
});
