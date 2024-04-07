import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const customerRouter = createTRPCRouter({
  getData: protectedProcedure.query(async ({ ctx }) => {
    const userData = await ctx.db.user.findUnique({
      where: {
        email: ctx.user.email!,
        id: ctx.user.id,
      }
    })

    if (!userData) {
      throw new TRPCError({ message: "Unable to retrieve user data", code: "NOT_FOUND" })
    }

    return userData;
  }),
});
