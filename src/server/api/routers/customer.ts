import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { signUpFormSchema } from "@/zod/custom";
import bcrypt from "bcrypt"

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

  createAccount: publicProcedure.input(signUpFormSchema).mutation(async ({ ctx, input }) => {
    const pw_hash = await bcrypt.hash(input.password, 10);

    await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        verified: false,
        pw_hash,
        type: input.accountType,
      }
    })
  })
});
