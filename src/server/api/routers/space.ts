import {
  createSpace,
  editSpace,
  getSpace,
  invitation,
  joinRequest,
  joinWithInvitationRequest,
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

  getById: publicProcedure.input(getSpace).query(({ input, ctx }) =>
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

  join: protectedProcedure.input(joinRequest).mutation(({ input, ctx }) =>
    ctx.db.space.update({
      where: {
        id: input.spaceId,
        sharedConfig: "PUBLIC_LINK",
        ownerId: { not: ctx.session.user.id },
        users: {
          none: { id: ctx.session.user.id },
        },
      },
      data: {
        users: { connect: { id: ctx.session.user.id } },
      },
    }),
  ),

  joinWithInvitation: protectedProcedure
    .input(joinWithInvitationRequest)
    .mutation(({ input, ctx }) =>
      ctx.db.space.update({
        where: {
          id: input.spaceId,
          sharedConfig: {
            not: "PRIVATE",
          },
          ownerId: {
            not: ctx.session.user.id,
          },
          invitations: {
            some: { id: input.invitationId },
          },
          users: {
            none: { id: ctx.session.user.id },
          },
        },
        data: {
          users: {
            connect: { id: ctx.session.user.id },
          },
          invitations: {
            delete: { id: input.invitationId },
          },
        },
      }),
    ),

  createInvitation: protectedProcedure
    .input(invitation)
    .mutation(({ input, ctx }) =>
      ctx.db.invitation.create({
        data: {
          spaceId: input.spaceId,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      }),
    ),

  getHistory: protectedProcedure.input(getSpace).query(({ ctx, input }) =>
    ctx.db.food.findMany({
      where: {
        ubication: {
          spaceId: input.id,
        },
        usedAt: {
          not: null,
        },
      },
      orderBy: {
        storedAt: "desc",
      },
    }),
  ),

  delete: protectedProcedure.input(getSpace).mutation(({ ctx, input }) =>
    ctx.db.space.delete({
      where: {
        id: input.id,
        ownerId: ctx.session.user.id,
      },
    }),
  ),

  edit: protectedProcedure.input(editSpace).mutation(({ ctx, input }) => {
    ctx.db.space.update({
      where: {
        id: input.id,
        ownerId: ctx.session.user.id,
      },
      data: {
        name: input.name,
      },
    });
  }),
});
