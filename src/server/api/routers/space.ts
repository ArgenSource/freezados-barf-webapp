import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const spaceRouter = createTRPCRouter({
    create: publicProcedure.input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
        return ctx.db.space.create({ data: { name: input.name }})
    }),
    getByid: publicProcedure.input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
        return ctx.db.space.findUnique({
            where: {
                id: input.id
            },
            include: {
                ubications: true,
            }
        })
    })
});
