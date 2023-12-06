import {
  createSpace,
  getSpace,
  joinRequest,
  setPrivacy,
} from "~/utils/schemas/space";

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

  changePrivacyConfig: protectedProcedure
    .input(setPrivacy)
    .mutation(({ input, ctx }) =>
      ctx.db.space.update({
        where: { id: input.id },
        data: {
          sharedConfig: input.config,
        },
      }),
    ),

  join: protectedProcedure
    .input(joinRequest)
    .mutation(async ({ input, ctx }) => {
      const space = await ctx.db.space.findUniqueOrThrow({
        where: { id: input.spaceId },
      });
      if (space.sharedConfig === "PRIVATE")
        throw new Error("This space is private");
      if (space.sharedConfig === "PUBLIC_LINK") {
        return ctx.db.space.update({
          where: { id: space.id },
          data: {
            users: { connect: { id: ctx.session.user.id } },
          },
        });
      }
      throw new Error("Not implemented");
    }),
});
