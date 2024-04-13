import { createClient } from "@/lib/supabase/server";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { Prisma, type Product } from "@prisma/client";
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
				return null;
			}

			const sellerData = await ctx.db.user.findFirst({
				where: {
					id: product.createdById,
				},
			});

			return { ...product, seller: sellerData?.name };
		}),

	searchProduct: publicProcedure.input(z.string()).query(async ({ input }) => {
		const query = `${input
			.split(" ")
			.map((word) => `'${word}'`)
			.join(" | ")}`;

		const supabase = createClient();

		const { data, error } = await supabase
			.from(Prisma.ModelName.Product)
			.select()
			.textSearch("fts", query);

		if (error) {
			throw new TRPCError({ code: "NOT_FOUND" });
		}

		if (!data || data.length === 0) {
			return null;
		}

		return data as Product[];
	}),

	getOrders: protectedProcedure.query(async ({ ctx }) => {
		const orders = await ctx.db.order.findMany({
			where: {
				createdById: ctx.user.id,
			},
		});

		if (!orders) {
			throw new TRPCError({ code: "NOT_FOUND" });
		}

		return orders;
	}),

	cancelOrder: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			await ctx.db.order.delete({
				where: {
					id: input,
					createdById: ctx.user.id,
				},
			});
		}),

	deleteImage: protectedProcedure
		.input(z.string().url())
		.mutation(async ({ ctx, input }) => {
			const isStoredInBucket = input.includes("public/avatars");

			if (isStoredInBucket) {
				const supabase = createClient();
				const path = input.split("/").slice(8).join("/");
				path && (await supabase.storage.from("avatars").remove([path]));
			}

			await ctx.db.user.update({
				where: {
					id: ctx.user.id,
					email: ctx.user.email!,
				},
				data: {
					image: null,
				},
			});
		}),

	updateImage: protectedProcedure
		.input(z.string().url())
		.mutation(async ({ ctx, input }) => {
			await ctx.db.user.update({
				where: {
					id: ctx.user.id,
					email: ctx.user.email!,
				},
				data: {
					image: input,
				},
			});
		}),

	updateName: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			await ctx.db.user.update({
				where: {
					id: ctx.user.id,
					email: ctx.user.email!,
				},
				data: {
					name: input,
				},
			});
		}),
});
