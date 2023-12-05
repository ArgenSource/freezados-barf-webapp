import { createSpace, getSpace } from "~/utils/schemas/space";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const spaceRouter = createTRPCRouter({
  create: protectedProcedure.input(createSpace).mutation(({ input, ctx }) =>
    ctx.db.space.create({
      data: { name: input.name, ownerId: ctx.session.user.id },
    }),
  ),

  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.db.space.findMany({
      where: {
        OR: [
          { ownerId: ctx.session.user.id },
          { users: { some: { id: ctx.session.user.id } } },
        ],
      },
    }),
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
