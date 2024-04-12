import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@ui/button";

export default function NotFound() {
	return (
		<main className="container flex flex-col gap-8 justify-center items-center p-8 h-full">
			<div className="w-full max-w-[450px]">
				<AspectRatio>
					<Image src="/assets/404.svg" fill alt="" />
				</AspectRatio>
			</div>
			<h2 className="text-3xl font-semibold">
				Oops! The page you&apos;re looking for doesn&apos;t exist
			</h2>
			<Link href="/" className={buttonVariants({ variant: "default" })}>
				Go home
			</Link>
		</main>
	);
}
