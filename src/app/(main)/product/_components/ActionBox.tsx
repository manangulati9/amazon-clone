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
import { Button } from "@ui/button";
import { type ProductData, useStore } from "@/lib/StoreProvider";
import { useEffect, useState } from "react";

export function ActionBox({
	productData,
}: {
	productData: ProductData;
}) {
	const today = new Date().getDate();
	const monNum = new Date().getMonth();
	const { cartItems, setCartItems } = useStore();
	const [quantity, setQuantity] = useState("");
	const [isProdInCart, setIsProdInCart] = useState(false);

	const handleCartAdd = () => {
		const data = { ...productData, quantity };
		const updatedCartItems = [...cartItems, data];

		setCartItems((prev) => {
			if (!prev.includes(data)) {
				return [...prev, data];
			}

			return prev;
		});

		localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
		setIsProdInCart(true);
	};

	useEffect(() => {
		const storedItems = localStorage.getItem("cartItems");

		if (!storedItems) {
			return;
		}

		const parsedItems = JSON.parse(storedItems) as ProductData[];
		const storedProdData = parsedItems.find(
			(item) => item.id === productData.id,
		);
		const storedQuantityVal = storedProdData?.quantity;
		const isPresent = !!storedProdData;

		setIsProdInCart(isPresent);
		storedQuantityVal && setQuantity(storedQuantityVal);
	}, [productData.id]);

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
				<Select value={quantity} onValueChange={setQuantity}>
					<SelectTrigger>
						<SelectValue placeholder="Choose quantity" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">1</SelectItem>
						<SelectItem value="2">2</SelectItem>
						<SelectItem value="3">3</SelectItem>
						<SelectItem value="4">4</SelectItem>
						<SelectItem value="5">5</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
			<CardFooter className="block space-y-6">
				<Button
					className="w-full rounded-full"
					disabled={isProdInCart}
					onClick={handleCartAdd}
				>
					{isProdInCart ? "Added to cart" : "Add to cart"}
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
