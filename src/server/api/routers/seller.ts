import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ProductModel } from "@/zod";
import { addProductFormSchema } from "@/zod/custom";
import { nanoid } from "nanoid";

export const sellerRouter = createTRPCRouter({
	addProduct: protectedProcedure
		.input(addProductFormSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.product.create({
				data: {
					...input,
					id: `PID-${nanoid(14)}`,
					createdById: ctx.user.id,
				},
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
