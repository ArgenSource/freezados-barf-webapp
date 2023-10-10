import { createTRPCRouter } from "~/server/api/trpc";
import { spaceRouter } from "./routers/space";
import { foodRouter } from "./routers/food";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  space: spaceRouter,
  food: foodRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
