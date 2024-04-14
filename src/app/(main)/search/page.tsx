import StarRating from "@/app/(main)/product/_components/StarRating";
import { AspectRatio } from "@ui/aspect-ratio";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@ui/card";
import { getDay, getMonth } from "@/lib/utils";
import { getData } from "@/lib/get-item";
import { z } from "zod";
import { ProductCategory } from "@prisma/client";

export default async function Page({
	searchParams,
}: {
	params: { slug: string };
	searchParams: Record<string, string | undefined>;
}) {
	const query = searchParams.query;
	const category = searchParams.category;

	if (!query && !category) {
		notFound();
	}

	const products = await getProducts(query, category);

	if (!products) {
		notFound();
	}

	const today = new Date().getDate();
	const monNum = new Date().getMonth();

	return (
		<main className="container flex flex-wrap gap-4 justify-evenly p-8">
			{products.map((item) => (
				<Link
					key={item.id}
					href={`/product?id=${item.id}`}
					className="block w-fit"
				>
					<Card>
						<CardContent className="pt-6 space-y-4">
							<div className="w-[250px]">
								<AspectRatio ratio={3 / 4}>
									<Image
										src={item.images[0]!}
										alt="img"
										fill
										className="object-contain rounded"
									/>
								</AspectRatio>
							</div>
							<div className="space-y-2">
								<p className="text-xl">{item.name}</p>
								<div className="flex gap-1 items-center">
									<p className="text-sm">4.6</p>
									<StarRating />
									<p className="text-xs text-blue-500">(188)</p>
								</div>
								<div className="flex gap-1 items-center">
									<p className="text-base font-semibold sm:text-lg md:text-xl">
										₹{item.price.toLocaleString()}
									</p>
									<p className="text-xs text-gray-600 line-through">
										₹{item.price + 1000}
									</p>
									<p className="text-xs">(4% off)</p>
								</div>
								<div className="flex gap-1 items-center text-xs">
									<Image
										src="/assets/prime_logo.png"
										alt="..."
										width={60}
										height={60}
									/>
									<p>
										Get it by {getDay(((today + 2) % 7) - 1)}, {today + 2}{" "}
										{getMonth(monNum)}
									</p>
								</div>
								<p className="text-xs">FREE Delivery by Amazon</p>
							</div>
						</CardContent>
					</Card>
				</Link>
			))}
		</main>
	);
}

async function getProducts(
	query: string | undefined,
	category: string | undefined,
) {
	const parseCategories = () => {
		const categorySchema = z.nativeEnum(ProductCategory);

		const categories = category!
			.split(" ")
			.map((cat) => {
				const parseResult = categorySchema.safeParse(cat);

				if (!parseResult.success) {
					console.error("Parse error: ", parseResult.error);
					return null;
				}

				return parseResult.data;
			})
			.filter((cat) => cat !== null);

		return categories as ProductCategory[];
	};

	const queries = query ? query.split(" ") : null;

	const categories = category ? parseCategories() : null;

	if (queries && categories) {
		const products = await getData(() =>
			api.customer.searchProducts({
				queries: queries,
				categories: categories,
			}),
		);

		return products;
	}

	if (queries) {
		const products = await getData(() =>
			api.customer.searchProductByQuery(queries),
		);
		return products;
	}

	const products = await getData(() =>
		api.customer.searchProductByCategory(categories!),
	);

	return products;
}
