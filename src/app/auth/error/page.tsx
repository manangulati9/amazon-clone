import { AspectRatio } from "@/ui/aspect-ratio";
import { buttonVariants } from "@/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page({
	searchParams,
}: { searchParams: Record<string, string | undefined> }) {
	const errorReason = searchParams.error;
	const isAccessDenied = errorReason === "AccessDenied";

	return (
		<main className="container flex flex-col justify-center items-center p-8 space-y-8 text-center">
			<div className="mx-auto w-[250px]">
				<AspectRatio>
					<Image src="/assets/mail_verification_failed.svg" alt="" fill />
				</AspectRatio>
			</div>
			<div className="pt-5 space-y-4">
				<h1 className="text-4xl font-semibold">Uh oh! Something went wrong</h1>
				<div>
					<h2 className="text-base text-muted/90">
						There was an error trying to sign you in.
					</h2>
					<h2 className="text-base text-muted/90">
						{isAccessDenied
							? "This email is already registered with a different account."
							: "Please check your credentials or try again later."}
					</h2>
				</div>
				<Link
					href={isAccessDenied ? "/auth/login" : "/"}
					className={buttonVariants({
						variant: "default",
					})}
				>
					{isAccessDenied ? "Sign in instead" : "Go to homepage"}
				</Link>
			</div>
		</main>
	);
}
