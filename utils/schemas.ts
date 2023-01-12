import { z } from "zod";
export const emailSchema = z.string().email({
  message: "Invalid email",
});
export const passwordSchema = z.string().min(8, {
  message: "Invalid password",
});
