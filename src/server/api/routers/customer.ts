import { createClient } from "@/lib/supabase/server";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { ProductModel } from "@/zod";
import { Prisma, ProductCategory } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
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

	searchProducts: publicProcedure
		.input(
			z.object({
				queries: z.array(z.string()),
				categories: z.array(z.nativeEnum(ProductCategory)),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { queries, categories } = input;
			const searchQuery = queries.map((word) => `'${word}'`).join(" | ");
			const supabase = createClient();

			const { data, error } = await supabase
				.from(Prisma.ModelName.Product)
				.select()
				.textSearch("fts", searchQuery);

			if (error) {
				console.error(error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: error.message,
				});
			}

			// No products found based on query, so returning by category
			if (!data || data.length === 0) {
				const products = await ctx.db.product.findMany({
					where: {
						category: {
							in: categories,
						},
					},
				});

				return products.length > 0 ? products : null;
			}

			// Validating data as products
			const productParseResult = z.array(ProductModel).safeParse(data);

			if (!productParseResult.success) {
				throw new TRPCError({
					code: "PARSE_ERROR",
					message: productParseResult.error.message,
				});
			}

			return productParseResult.data;
		}),

	searchProductByQuery: publicProcedure
		.input(z.array(z.string()))
		.query(async ({ input: query }) => {
			const searchQuery = query.map((word) => `'${word}'`).join(" | ");
			const supabase = createClient();

			const { data, error } = await supabase
				.from(Prisma.ModelName.Product)
				.select()
				.textSearch("fts", searchQuery);

			if (error) {
				console.error(error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: error.message,
				});
			}

			if (!data || data.length === 0) {
				return null;
			}

			const parseResult = z.array(ProductModel).safeParse(data);

			if (!parseResult.success) {
				throw new TRPCError({
					code: "PARSE_ERROR",
					message: parseResult.error.message,
				});
			}

			return parseResult.data;
		}),

	searchProductByCategory: publicProcedure
		.input(z.array(z.nativeEnum(ProductCategory)))
		.query(async ({ ctx, input: category }) => {
			const products = await ctx.db.product.findMany({
				where: {
					category: {
						in: category,
					},
				},
			});

			return products.length > 0 ? products : null;
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

	deleteOrder: protectedProcedure
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

	buyProduct: protectedProcedure
		.input(z.object({ product: ProductModel, quantity: z.number() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.order.create({
				data: {
					quantity: input.quantity,
					name: input.product.name,
					category: input.product.category,
					value: input.product.price * input.quantity,
					createdById: ctx.user.id,
					productId: input.product.id,
					id: `OID-${nanoid(14)}`,
				},
			});
		}),

	buyCartItems: protectedProcedure
		.input(z.array(z.object({ product: ProductModel, quantity: z.number() })))
		.mutation(async ({ ctx, input }) => {
			const products = input.map((prod) => ({
				quantity: prod.quantity,
				name: prod.product.name,
				category: prod.product.category,
				value: prod.product.price * prod.quantity,
				createdById: ctx.user.id,
				productId: prod.product.id,
				id: `OID-${nanoid(14)}`,
			}));

			await ctx.db.order.createMany({
				data: products,
			});
		}),
});
