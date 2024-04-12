import { CARD_GROUP } from "@/lib/data/home-page";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/card";
import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@ui/button";
import { ImageCarousel } from "../_components/ImageCarousel";
import { api } from "@/trpc/server";
import { cn, getCachedData } from "@/lib/utils";

export default async function Page() {
	const [todays_deals, top_smartphones] = await getCachedData(
		async () =>
			Promise.all([api.customer.todaysDeals(), api.customer.topSmartphones()]),
		["home-data"],
	);

	return (
		<div className="container px-4">
			<ImageCarousel />

			{/* Card Group */}
			<div className="py-4 px-8 space-y-4 lg:-mt-[15rem]">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					{CARD_GROUP.slice(0, 4).map((card, i) => (
						<Card key={i} className="flex z-10 flex-col justify-between">
							<CardHeader>
								<CardTitle>{card.title}</CardTitle>
							</CardHeader>
							<CardContent className="text-sm">
								<div className="flex flex-wrap gap-4">
									{card.items.map((item, ind) => (
										<Link
											href={item.href}
											key={ind}
											className="flex-1 space-y-1 aspect-square min-w-[70px] lg:min-w-[100px]"
										>
											<AspectRatio ratio={1 / 1}>
												<Image
													src={item.image}
													alt=""
													className={cn("object-cover", item.object_fit)}
													fill
												/>
											</AspectRatio>
											<p>{item.name}</p>
										</Link>
									))}
								</div>
							</CardContent>
							<CardFooter>
								<Link
									href="#"
									className={buttonVariants({
										variant: "link",
										size: "link",
									})}
								>
									See more
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>

				{/* Hot Deals */}
				<Card>
					<CardHeader>
						<CardTitle>Hot deals!</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-4">
							{todays_deals.map((item, ind) => (
								<Link
									href={`/product?id=${item.id}`}
									key={ind}
									className="flex-1 space-y-1"
								>
									<div className="max-w-[200px]">
										<AspectRatio ratio={1 / 1}>
											<Image
												src={item.images[0]!}
												alt=""
												className="object-contain"
												fill
											/>
										</AspectRatio>
									</div>
									<p>{item.name}</p>
								</Link>
							))}
						</div>
					</CardContent>
					<CardFooter>
						<Link
							href=""
							className={buttonVariants({
								variant: "link",
								size: "link",
							})}
						>
							See More
						</Link>
					</CardFooter>
				</Card>

				{/* Card Group */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					{CARD_GROUP.slice(1, 5).map((card, i) => (
						<Card key={i} className="flex flex-col justify-between">
							<CardHeader>
								<CardTitle>{card.title}</CardTitle>
							</CardHeader>
							<CardContent className="text-sm">
								<div className="flex flex-wrap gap-4">
									{card.items.map((item, ind) => (
										<Link
											key={ind}
											href={item.href}
											className="flex-1 space-y-1 aspect-square min-w-[70px] lg:min-w-[100px]"
										>
											<AspectRatio ratio={1 / 1}>
												<Image
													src={item.image}
													alt=""
													className={cn("object-cover", item.object_fit)}
													fill
												/>
											</AspectRatio>
											<p>{item.name}</p>
										</Link>
									))}
								</div>
							</CardContent>
							<CardFooter>
								<Link
									href="#"
									className={buttonVariants({
										variant: "link",
										size: "link",
									})}
								>
									See more
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>

				{/* Top Smartphones */}
				<Card>
					<CardHeader>
						<CardTitle>Top Smartphones</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-4">
							{top_smartphones.map((item, ind) => (
								<Link
									key={ind}
									href={`/product?id=${item.id}`}
									className="flex-1 space-y-1"
								>
									<div className="max-w-[200px]">
										<AspectRatio ratio={1 / 1}>
											<Image
												src={item.images[0]!}
												alt=""
												className="object-contain"
												fill
											/>
										</AspectRatio>
									</div>
									<p>{item.name}</p>
								</Link>
							))}
						</div>
					</CardContent>
					<CardFooter>
						<Link
							href=""
							className={buttonVariants({
								variant: "link",
								size: "link",
							})}
						>
							See More
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
