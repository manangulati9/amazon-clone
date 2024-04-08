import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ProductModel } from "@/zod";

export const sellerRouter = createTRPCRouter({
	addProducts: protectedProcedure
		.input(z.array(ProductModel))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.product.createMany({
				data: input,
				skipDuplicates: true,
			});
		}),

	getProducts: protectedProcedure.query(async ({ ctx }) => {
		const products = await ctx.db.product.findMany({
			where: {
				createdById: ctx.user.id,
			},
		});

		return products;
	}),

	deleteProducts: protectedProcedure
		.input(z.array(z.string()))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.product.deleteMany({
				where: {
					id: {
						in: input,
					},
				},
			});
			// TODO: Add logic to delete stored images from store/bucket
		}),

	editProduct: protectedProcedure
		.input(z.object({ productId: z.string(), newData: ProductModel }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.product.update({
				where: {
					id: input.productId,
					createdById: ctx.user.id,
				},
				data: input.newData,
			});
		}),
});
