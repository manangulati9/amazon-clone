import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ProductModel } from "@/zod";
import { addProductFormSchema } from "@/zod/custom";
import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";

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
		.input(z.array(z.object({ id: z.string(), images: z.array(z.string()) })))
		.mutation(async ({ ctx, input }) => {
			const paths = input
				.map((item) =>
					item.images.map((url) => url.split("/").slice(8).join("/")),
				)
				.flat();
			const supabase = createClient();
			const idList = input.map((item) => item.id);

			await Promise.all([
				supabase.storage.from("products").remove(paths),
				ctx.db.product.deleteMany({
					where: {
						id: {
							in: idList,
						},
					},
				}),
			]);
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
