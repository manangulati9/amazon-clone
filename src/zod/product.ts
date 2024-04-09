import * as z from "zod"
import { ProductCategory } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.nativeEnum(ProductCategory),
  price: z.number(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.string(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  createdBy: CompleteUser
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  createdBy: RelatedUserModel,
}))
