import { env } from "@/env";
import { getBaseUrl } from "@/lib/utils";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	const userMail = ((await req.json()) as { email: string }).email;

	const mailTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: env.MAIL_ID,
			pass: env.MAIL_PASSWORD,
		},
	});

	const redirectURL = new URL(
		`/auth/verify-email?mailId=${userMail}`,
		getBaseUrl(),
	).toString();

	const mailOptions = {
		from: {
			name: "Manan Gulati",
			address: env.MAIL_ID,
		},
		replyTo: env.MAIL_ID,
		to: userMail,
		subject: "Welcome to Amazon Clone - Verify Your Account",
		html: `<h2>Welcome to Amazon Clone!</h2>
        <p>Thank you for signing up. To verify your account, please click the following link:</p>
        <a href="${redirectURL}">Verify your account</a>
        <p>If you did not sign up for an account, please ignore this email. Your account will not be activated until you verify your email address.</p>
        <p>Thank you,</p>
        <p>The Amazon Clone Team</p>`,
	};

	await mailTransport.sendMail(mailOptions);
}
