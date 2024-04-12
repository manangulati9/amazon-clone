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

	deleteProduct: protectedProcedure
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

	deleteImages: protectedProcedure
		.input(
			z.object({ data: ProductModel, imagesToRemove: z.array(z.string()) }),
		)
		.mutation(async ({ ctx, input }) => {
			const paths = input.imagesToRemove.map((url) =>
				url.split("/").slice(8).join("/"),
			);

			const supabase = createClient();
			const updatedData = {
				...input.data,
				images: input.data.images.filter(
					(url) => !input.imagesToRemove.includes(url),
				),
			};

			await Promise.all([
				supabase.storage.from("products").remove(paths),
				ctx.db.product.update({
					where: {
						id: input.data.id,
					},
					data: updatedData,
				}),
			]);
		}),

	editProduct: protectedProcedure
		.input(z.object({ id: z.string(), newData: addProductFormSchema }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.product.update({
				where: {
					id: input.id,
					createdById: ctx.user.id,
				},
				data: input.newData,
			});
		}),
});
