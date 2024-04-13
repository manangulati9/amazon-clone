import * as z from "zod";
import { ProductCategory } from "@prisma/client";
import { type CompleteUser, RelatedUserModel } from "./index";

export const OrderModel = z.object({
	id: z.string(),
	name: z.string(),
	category: z.nativeEnum(ProductCategory),
	price: z.number(),
	quantity: z.number().int(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	createdById: z.string(),
});

export interface CompleteOrder extends z.infer<typeof OrderModel> {
	createdBy: CompleteUser;
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() =>
	OrderModel.extend({
		createdBy: RelatedUserModel,
	}),
);
