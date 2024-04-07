import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(1, "Min. length is 1 character(s)"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min. length is 8 character(s)"),
  confirmPassword: z.string().min(8, "Min. length is 8 character(s)"),
  accountType: z.enum(["SELLER", "CUSTOMER"])
}).refine((val) => val.password === val.confirmPassword, { message: "Passwords don't match", path: ["password"] })

export type TSignUpForm = z.infer<typeof signUpFormSchema>

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min. length is 8 characters")
})

export type TLoginForm = z.infer<typeof loginFormSchema>
