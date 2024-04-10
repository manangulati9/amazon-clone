import { ActionBox } from "@/app/_components/product/ActionBox";
import { ImageCarousel } from "@/app/_components/product/ProdImgCarousel";
import StarRating from "@/app/_components/product/StarRating";
import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import { api } from "@/trpc/server";
import Image from "next/image";

export default async function Page({
	searchParams,
}: {
	params: { slug: string };
	searchParams: Record<string, string | undefined>;
}) {
	const productID = searchParams["id"];

	if (!productID) {
		return (
			<main className="container flex flex-col justify-center items-center h-full">
				<div className="w-full max-w-[350px]">
					<AspectRatio>
						<Image src="/assets/404.svg" alt="" fill />
					</AspectRatio>
				</div>
				<div className="text-3xl font-bold">
					Sorry, the page you&apos;re looking for doesn't exist.
				</div>
			</main>
		);
	}

	const productData = await api.customer.getProductById(productID);

	return (
		<main className="container flex flex-col gap-4 justify-between p-8 md:flex-row">
			<ImageCarousel images={productData.images} />

			<div className="flex flex-col gap-8 md:flex-row">
				{/* Product details */}
				<div className="max-w-lg">
					<h1 className="text-xl font-semibold md:text-3xl">
						{productData.name}
					</h1>
					<StarRating />
					<hr className="my-2.5 border bg-slate-500" />
					<div>
						<p className="my-2 text-lg sm:text-xl md:text-2xl">
							₹{productData.price.toLocaleString()}
						</p>
						<div className="flex space-x-2 text-sm sm:text-base md:text-lg text-slate-600">
							<span>M.R.P -</span>
							<p className="line-through">
								₹{(productData.price + 1000).toLocaleString()}
							</p>{" "}
						</div>
						<p className="text-xs sm:text-sm">Inclusive of all taxes</p>
						<p className="text-xs sm:text-sm">
							{" "}
							EMI starts at ₹{(productData.price / 6).toFixed(2)}. No Cost EMI
							available
						</p>
					</div>
					<hr className="my-2.5 border bg-slate-500" />
					<div className="space-y-2">
						<h2 className="font-bold">About this item</h2>
						<p className="text-sm sm:text-base">{productData.description}</p>
					</div>
				</div>

				{/* Action section */}
				<ActionBox productData={productData} />
			</div>
		</main>
	);
}
