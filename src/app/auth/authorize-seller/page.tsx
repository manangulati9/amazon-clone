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
	const result = await getData(() => api.common.authorizeSeller(token));

	if (result.status === "failed") {
		console.error(result.error);
		return (
			<main className="container flex flex-col justify-center items-center p-8">
				<div className="w-[250px]">
					<AspectRatio>
						<Image src="/assets/mail_verification_failed.svg" alt="" fill />
					</AspectRatio>
				</div>
				<div className="pt-5 space-y-4 text-center">
					<h1 className="text-4xl font-semibold">Authorization failed!</h1>
					<h2 className="text-xl text-wrap">{result.message}</h2>
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

	return (
		<div className="container flex flex-col justify-center items-center p-8">
			<div className="w-[250px]">
				<AspectRatio>
					<Image src="/assets/mail_verified.svg" alt="" fill />
				</AspectRatio>
			</div>
			<div className="pt-5 space-y-4 text-center">
				<h1 className="text-4xl font-semibold">Verification complete!</h1>
				<h2 className="text-base text-muted/90">The user has been notified.</h2>
			</div>
		</div>
	);
}
