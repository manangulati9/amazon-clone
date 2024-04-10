"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { getDay, getMonth } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { useStore } from "@/lib/StoreProvider";

export function ActionBox({
	productData,
}: { productData: Product & { seller: string | undefined } }) {
	const today = new Date().getDate();
	const monNum = new Date().getMonth();
	const { setCartItems } = useStore();

	return (
		<Card className="px-4 text-sm">
			<CardHeader>
				<CardTitle className="text-lg text-blue-500">FREE DELIVERY</CardTitle>
				<div className="text-muted-foreground">
					<p>
						Get it by {getDay(((today + 2) % 7) - 1)}, {today + 2}{" "}
						{getMonth(monNum)}
					</p>
					<p className="text-foreground/80">
						Or fastest delivery Tomorrow, {getMonth(monNum)} {today + 1}.
						<br />
						Order within 3 hrs 47 mins.
					</p>
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-2xl font-bold text-green-600">In stock</p>
				<p>Sold by {productData.seller} and fulfilled by Amazon</p>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Choose quantity" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="one">1</SelectItem>
						<SelectItem value="two">2</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
			<CardFooter className="block space-y-6">
				<Button
					className="w-full rounded-full"
					onClick={() =>
						setCartItems((prev) => {
							if (!prev.includes(productData)) {
								return [...prev, productData];
							}

							return prev;
						})
					}
				>
					Add to cart
				</Button>
				<Button
					className="w-full bg-orange-400 rounded-full hover:bg-orange-500"
					onClick={() => alert("Thank you for your purchase!")}
				>
					Buy now
				</Button>
			</CardFooter>
		</Card>
	);
}
