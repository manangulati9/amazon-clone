import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { Resend } from "resend";
import { signUpFormSchema } from "@/zod/custom";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserType } from "@prisma/client";
import { env } from "@/env";
import { getBaseUrl } from "@/lib/utils";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import VerifyEmail from "@/app/_components/emails/account-verification";
import Notification from "@/app/_components/emails/notification";
import AuthorizeSeller from "@/app/_components/emails/authorize-seller";

export const commonRouter = createTRPCRouter({
	getData: protectedProcedure.query(({ ctx }) => {
		return ctx.user;
	}),

	createAccount: publicProcedure
		.input(signUpFormSchema)
		.mutation(async ({ ctx, input }) => {
			try {
				const pw_hash = await bcrypt.hash(input.password, 10);
				await ctx.db.user.create({
					data: {
						name: input.name,
						email: input.email,
						verified: false,
						pw_hash,
						type: input.type,
					},
				});
			} catch (error) {
				throw new TRPCError({
					code: "CONFLICT",
				});
			}

			const { email, type } = input;

			const token = jwt.sign(
				{
					email,
					type,
				},
				env.NEXTAUTH_SECRET,
				{
					expiresIn: "10m",
				},
			);

			const redirectURL = new URL(
				`/auth/authorize-account?token=${token}`,
				getBaseUrl(),
			).toString();

			const resend = new Resend(env.RESEND_API_KEY);

			const { error } = await resend.emails.send({
				from: env.MAIL_ID,
				to: [email],
				subject: "Verify email - Amazon Clone",
				react: VerifyEmail({ href: redirectURL }),
			});

			if (error) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: error.message,
				});
			}
		}),

	authorizeAccount: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			let payload;

			try {
				payload = jwt.verify(input, env.NEXTAUTH_SECRET);
			} catch (error) {
				return {
					status: "failed" as const,
					message: "Invalid token provided or link is expired",
					error,
				};
			}

			const result = z
				.object({
					email: z.string().email(),
					type: z.nativeEnum(UserType),
				})
				.safeParse(payload);

			if (!result.success)
				return {
					status: "failed" as const,
					message: "Invalid token provided",
					error: result.error,
				};

			const { email, type } = result.data;

			if (type === "CUSTOMER") {
				await ctx.db.user.update({
					where: {
						email,
						type,
					},
					data: {
						verified: true,
					},
				});
				return {
					status: "success" as const,
					message: "Customer account verified",
					error: null,
				};
			}

			const token = jwt.sign(
				{
					...result.data,
					role: "admin",
				},
				env.NEXTAUTH_SECRET,
				{
					expiresIn: "10m",
				},
			);

			const redirectURL = new URL(
				`/auth/authorize-seller?token=${token}`,
				getBaseUrl(),
			).toString();

			const resend = new Resend(env.RESEND_API_KEY);

			const { error } = await resend.emails.send({
				from: env.MAIL_ID,
				to: [env.PERSONAL_MAIL_ID],
				subject: "Authorize seller - Amazon Clone",
				react: AuthorizeSeller({ email, href: redirectURL }),
			});

			if (error) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: error.message,
				});
			}

			return {
				status: "pending" as const,
				message: "Awaiting admin authorization",
				error: null,
			};
		}),

	authorizeSeller: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			let payload;

			try {
				payload = jwt.verify(input, env.NEXTAUTH_SECRET);
			} catch (error) {
				return {
					status: "failed" as const,
					message: "Invalid token provided or link is expired",
					email: null,
					error,
				};
			}

			const result = z
				.object({
					email: z.string().email(),
					type: z.nativeEnum(UserType),
					role: z.enum(["admin"]),
				})
				.safeParse(payload);

			if (!result.success)
				return {
					status: "failed" as const,
					message: "Invalid token provided",
					email: null,
					error: result.error,
				};

			const { email, type } = result.data;

			await ctx.db.user.update({
				where: {
					email,
					type,
				},
				data: {
					verified: true,
				},
			});

			const redirectURL = new URL(`/dashboard`, getBaseUrl()).toString();

			const resend = new Resend(env.RESEND_API_KEY);

			const { error } = await resend.emails.send({
				from: env.MAIL_ID,
				to: [email],
				subject: "Verification successfull! - Amazon Clone",
				react: Notification({ href: redirectURL }),
			});

			if (error) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: error.message,
				});
			}

			return {
				status: "success" as const,
				message: "Seller account authorized",
				email,
				error: null,
			};
		}),
});
