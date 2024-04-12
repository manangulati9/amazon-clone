import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";

export default function NotFound() {
	return (
		<main className="container flex flex-col justify-center items-center h-full">
			<div className="w-full max-w-[350px]">
				<AspectRatio>
					<Image src="/assets/product_not_found.svg" alt="" fill />
				</AspectRatio>
			</div>
			<div className="text-3xl font-bold">
				Sorry, the page you&apos;re looking for doesn&apos;t exist.
			</div>
		</main>
	);
}
