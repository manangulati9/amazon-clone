import { ProductCategory } from "@prisma/client";
import { z } from "zod";

export const signUpFormSchema = z
	.object({
		name: z.string().min(1, "Min. length is 1 character(s)"),
		email: z.string().email("Invalid email"),
		password: z.string().min(8, "Min. length is 8 character(s)"),
		confirmPassword: z.string().min(8, "Min. length is 8 character(s)"),
		type: z.enum(["SELLER", "CUSTOMER"]),
	})
	.refine((val) => val.password === val.confirmPassword, {
		message: "Passwords don't match",
		path: ["password"],
	});

export type TSignUpForm = z.infer<typeof signUpFormSchema>;

export const loginFormSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Min. length is 8 characters"),
});

export type TLoginForm = z.infer<typeof loginFormSchema>;

export const addProductFormSchema = z.object({
	name: z.string().min(5, "Min. 5 characters are required"),
	description: z.string().min(50, "Min. 50 characters are required"),
	category: z.nativeEnum(ProductCategory),
	price: z.coerce
		.number()
		.nonnegative("Please enter a valid number")
		.refine((value) => value >= 20, {
			message: "Price must be greater than ₹ 20",
			path: ["price"],
		}),
	images: z.array(z.string()).min(1, "Atleast 1 image is needed"),
});

export type TAddProductForm = z.infer<typeof addProductFormSchema>;

export const profileFormSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1, "Min. 1 character is required"),
	image: z.string(),
});

export type TProfileForm = z.infer<typeof profileFormSchema>;
