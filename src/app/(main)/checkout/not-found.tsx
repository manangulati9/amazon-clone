import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";

export default function NotFound() {
	return (
		<main className="h-full">
			<div className="container flex flex-col justify-center items-center p-8 space-y-4 h-full">
				<div className="w-full max-w-[350px]">
					<AspectRatio>
						<Image src="/assets/cart_items_not_found.svg" fill alt="" />
					</AspectRatio>
				</div>
				<div>
					<h1 className="text-3xl font-bold">Your cart is empty</h1>
					<h2 className="text-lg text-muted-foreground">
						Add some items to checkout
					</h2>
				</div>
			</div>
		</main>
	);
}
