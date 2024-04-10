import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const customerRouter = createTRPCRouter({
	todaysDeals: publicProcedure.query(async ({ ctx }) => {
		const todays_deals = await ctx.db.product.findMany({
			take: 6,
			where: {
				images: {
					isEmpty: false,
				},
			},
		});

		return todays_deals;
	}),

	topSmartphones: publicProcedure.query(async ({ ctx }) => {
		const top_smartphones = await ctx.db.product.findMany({
			take: 6,
			where: {
				category: "Mobile",
			},
		});

		return top_smartphones;
	}),

	getProductById: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const product = await ctx.db.product.findFirst({
				where: {
					id: input,
				},
			});

			if (!product) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			const sellerData = await ctx.db.user.findFirst({
				where: {
					id: product.createdById,
				},
			});

			return { ...product, seller: sellerData?.name };
		}),
});
