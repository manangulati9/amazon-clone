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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTimer } from "react-timer-hook";
import { api } from "@/trpc/react";
import type { api as serverApi } from "@/trpc/server";
import { toast } from "sonner";
import { Toast } from "@/ui/toast";

type TProductData = NonNullable<
	Awaited<ReturnType<typeof serverApi.customer.getProductById>>
>;

export function ActionBox({
	productData,
}: {
	productData: TProductData;
}) {
	const today = new Date().getDate();
	const monNum = new Date().getMonth();
	const { cartItems, setCartItems } = useStore();
	const [quantity, setQuantity] = useState("");
	const [isProdInCart, setIsProdInCart] = useState(false);
	const { status } = useSession();
	const isSignedIn = status === "authenticated";
	const router = useRouter();

	const handleCartAdd = () => {
		if (!isSignedIn) {
			router.push("/auth/login");
			return;
		}

		if (!quantity) {
			toast.error(
				<Toast
					opts={{
						variant: "error",
						title: "Invalid quantity!",
						description: "Please select quantity from the dropdown.",
					}}
				/>,
			);
			return;
		}

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

	const { mutate: buyProduct, isPending } = api.customer.buyProduct.useMutation(
		{
			onSuccess: () => {
				toast.success(
					<Toast
						opts={{ variant: "success", title: "Purchase successfull!" }}
					/>,
				);
			},

			onError: (error) => {
				console.error(error);
				toast.error(
					<Toast
						opts={{
							variant: "error",
							title: "Something went wrong!",
							description: "Please try again later.",
						}}
					/>,
				);
			},
		},
	);

	const handleBuyNow = () => {
		if (!isSignedIn) {
			router.push("/auth/login");
			return;
		}

		if (!quantity) {
			toast.error(
				<Toast
					opts={{
						variant: "error",
						title: "Invalid quantity!",
						description: "Please select quantity from the dropdown.",
					}}
				/>,
			);
			return;
		}

		buyProduct({
			product: productData,
			quantity: parseInt(quantity),
		});
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
				<CardTitle className="text-xl text-blue-500">FREE DELIVERY</CardTitle>
				<div className="text-muted-foreground">
					<p>
						Get it by {getDay(((today + 2) % 7) - 1)}, {today + 2}{" "}
						{getMonth(monNum)}
					</p>
					<div className="space-y-4 text-foreground">
						<p>
							Or fastest delivery Tomorrow, {getMonth(monNum)} {today + 1} with
							prime
						</p>
						<Timer />
					</div>
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
					onClick={handleBuyNow}
					disabled={isPending}
				>
					{isPending ? "Purchasing..." : "Buy now"}
				</Button>
			</CardFooter>
		</Card>
	);
}

function Timer() {
	const { seconds, minutes, hours } = useTimer({
		expiryTimestamp: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
	});

	return (
		<p className="text-lg">
			<span>
				Order within <br />
			</span>
			<span className="font-bold">
				{hours} hrs {minutes} mins {seconds} secs
			</span>
		</p>
	);
}
