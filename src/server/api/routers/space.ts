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

  getById: protectedProcedure.input(getSpace).query(({ input, ctx }) =>
    ctx.db.space.findUnique({
      where: {
        id: input.id,
      },
    }),
  ),

  getWithUbications: protectedProcedure
    .input(getSpace)
    .query(({ input, ctx }) =>
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
        include: {
          users: true,
        },
      });
      if (space.sharedConfig === "PRIVATE")
        throw new Error("Este espacio es privado");
      if ([space.ownerId, ...space.users].includes(ctx.session.user.id))
        throw new Error("Ya perteneces a este espacio");
      if (space.sharedConfig === "PUBLIC_LINK") {
        return ctx.db.space.update({
          where: { id: space.id },
          data: {
            users: { connect: { id: ctx.session.user.id } },
          },
          select: {
            id: true,
          },
        });
      }
      throw new Error("Not implemented");
    }),
});
