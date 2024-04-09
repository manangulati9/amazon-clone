import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { sellerRouter } from "@/server/api/routers/seller";
import { customerRouter } from "@/server/api/routers/customer";
import { commonRouter } from "@/server/api/routers/common";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	seller: sellerRouter,
	customer: customerRouter,
	common: commonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
