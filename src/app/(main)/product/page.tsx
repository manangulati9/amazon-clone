import { ActionBox } from "@/app/(main)/product/_components/ActionBox";
import { ImageCarousel } from "@/app/(main)/product/_components/ProdImgCarousel";
import StarRating from "@/app/(main)/product/_components/StarRating";
import { getData } from "@/lib/get-item";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	params: { slug: string };
	searchParams: Record<string, string | undefined>;
}) {
	const productID = searchParams.id;

	if (!productID) {
		notFound();
	}

	const productData = await getData(() =>
		api.customer.getProductById(productID),
	);

	if (!productData) {
		notFound();
	}

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
							₹{productData.price.toFixed(2)}
						</p>
						<div className="flex space-x-2 text-sm sm:text-base md:text-lg text-slate-600">
							<span>M.R.P -</span>
							<p className="line-through">
								₹{(productData.price + 1000).toFixed(2)}
							</p>
						</div>
						<p className="text-xs sm:text-sm">Inclusive of all taxes</p>
						<p className="text-xs sm:text-sm">
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
