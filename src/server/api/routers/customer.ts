import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
});
