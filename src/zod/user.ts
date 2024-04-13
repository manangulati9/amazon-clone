import * as z from "zod";
import { UserType } from "@prisma/client";
import {
	type CompleteProduct,
	RelatedProductModel,
	type CompleteOrder,
	RelatedOrderModel,
} from "./index";

export const UserModel = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	verified: z.boolean(),
	pw_hash: z.string().nullish(),
	image: z.string().url().nullish(),
	type: z.nativeEnum(UserType),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
	Product: CompleteProduct[];
	Order: CompleteOrder[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
	UserModel.extend({
		Product: RelatedProductModel.array(),
		Order: RelatedOrderModel.array(),
	}),
);
