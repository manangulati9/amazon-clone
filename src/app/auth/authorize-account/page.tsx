import { notFound } from "next/navigation";
import { z } from "zod";
import { AspectRatio } from "@ui/aspect-ratio";
import { buttonVariants } from "@ui/button";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/server";
import { getData } from "@/lib/get-item";

export default async function Page({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const param = searchParams.token;
	const parseResult = z.string().safeParse(param);

	if (!parseResult.success) {
		notFound();
	}

	const token = parseResult.data;
	const result = await getData(() => api.common.authorizeAccount(token));

	if (result.status === "failed") {
		console.error(result.error);
		return (
			<main className="container flex flex-col justify-center items-center p-8 space-y-8 text-center">
				<div className="mx-auto w-[250px]">
					<AspectRatio>
						<Image src="/assets/mail_verification_failed.svg" alt="" fill />
					</AspectRatio>
				</div>
				<div className="pt-5 space-y-4">
					<h1 className="text-4xl font-semibold">Verification failed!</h1>
					<h2 className="text-base text-muted/90">{result.message}</h2>
					<Link
						href="/"
						className={buttonVariants({
							variant: "default",
						})}
					>
						Go to homepage
					</Link>
				</div>
			</main>
		);
	}

	if (result.status === "pending") {
		return (
			<div className="container flex flex-col justify-center items-center p-8">
				<div className="mx-auto w-[250px]">
					<AspectRatio>
						<Image src="/assets/email.svg" alt="" fill />
					</AspectRatio>
				</div>
				<div className="pt-5 space-y-4 text-center">
					<h1 className="text-4xl font-semibold">
						Thank your for your interest!
					</h1>
					<div className="space-y-1">
						<h2 className="text-base text-muted/90">
							We appreciate your interest in signing up as a seller.
						</h2>
						<h2 className="text-base text-muted/90">
							We&apos;ll let you know once your request is approved.
						</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container flex flex-col justify-center items-center p-8 text-center">
			<div className="mx-auto w-[250px]">
				<AspectRatio>
					<Image src="/assets/mail_verified.svg" alt="" fill />
				</AspectRatio>
			</div>
			<div className="pt-5 space-y-4">
				<h1 className="text-4xl font-semibold">You&apos;re all set!</h1>
				<h2 className="text-base text-muted/90">
					Login and you&apos;re free to start exploring.
				</h2>
				<Link
					href="/auth/login"
					className={buttonVariants({ variant: "default" })}
				>
					Login
				</Link>
			</div>
		</div>
	);
}
