"use client";

import Link from "next/link";
import Image from "next/image";
import { type ProductData, useStore } from "@/lib/StoreProvider";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Separator } from "@ui/separator";
import { Button } from "@ui/button";
import { AspectRatio } from "@ui/aspect-ratio";
import { notFound } from "next/navigation";

export default function Page() {
	const { cartItems, setCartItems } = useStore();
	const total = cartItems
		.reduce((accumulator, product) => accumulator + product.price, 0)
		.toFixed(2);

	if (cartItems.length === 0) {
		notFound();
	}

	const handleRemoveItem = (item: ProductData) => {
		const updatedCartItems = cartItems.filter((i) => i.id !== item.id);
		setCartItems(updatedCartItems);
		localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
	};

	return (
		<main className="h-full bg-muted/10">
			<div className="container flex flex-wrap gap-4 justify-between p-8 sm:flex-nowrap">
				<Card className="flex-grow order-2 md:order-1">
					<CardHeader className="flex-row justify-between">
						<h2 className="text-2xl">Shopping Cart</h2>
						<span>Price</span>
					</CardHeader>
					<Separator className="w-[95%] mx-auto mb-6" />
					<CardContent className="space-y-6">
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="flex flex-col gap-3 justify-center p-2 rounded transition-colors md:flex-row lg:justify-start hover:bg-muted/10"
							>
								<Link href={`/product?id=${item.id}`} className="w-[200px]">
									<AspectRatio ratio={3 / 4}>
										<Image
											src={item.images[0]!}
											alt="..."
											fill
											className="rounded"
										/>
									</AspectRatio>
								</Link>
								<div className="pl-4 w-full">
									<div className="flex justify-between items-center w-full">
										<h2>{item.name}</h2>
										<h3 className="font-bold">₹{item.price.toFixed(2)}</h3>
									</div>
									<div className="flex flex-col gap-2 my-4 text-xs w-fit">
										<p className="text-green-600">In stock</p>
										<p className="text-gray-600">Eligible for FREE Shipping</p>
										<div className="flex gap-2 items-center">
											<input
												type="checkbox"
												className="rounded border-gray-400"
												name="gift_check"
											/>
											<label htmlFor="gift_check">This will be a gift</label>
											<Link href="" className="text-blue-600 hover:underline">
												Learn more
											</Link>
										</div>
										<div className="space-x-1">
											<span className="font-emberBd">Category:</span>
											<span>
												{item.category.charAt(0).toUpperCase() +
													item.category.slice(1)}
											</span>
										</div>
										<div className="space-x-1">
											<span className="font-emberBd">Quantity:</span>
											<span>{item.quantity}</span>
										</div>
										<div className="space-x-3 text-blue-600">
											<button
												onClick={() => handleRemoveItem(item)}
												className="hover:underline"
											>
												Delete
											</button>
											<button className="hover:underline">
												Save for later
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</CardContent>
					<Separator className="w-[95%] mx-auto mb-6" />
					<CardFooter className="block text-end">
						<p>{`Subtotal (${
							cartItems.length > 1
								? cartItems.length + " items"
								: cartItems.length + " item"
						}): ₹${total}`}</p>
					</CardFooter>
				</Card>

				{/* Payment box */}
				<Card className="order-1 w-full md:order-2 h-fit md:w-fit">
					<CardHeader className="lg:text-lg">
						<p>{`Total (${
							cartItems.length > 1
								? cartItems.length + " items"
								: cartItems.length + " item"
						}): ₹${total}`}</p>
					</CardHeader>
					<CardContent>
						{parseInt(total) !== 0 && (
							<div className="flex flex-col gap-2 md:justify-center md:items-center">
								<div className="flex gap-2 items-center">
									<input
										type="checkbox"
										name="gift_check_2"
										className="rounded"
									/>
									<label
										htmlFor="gift_check_2"
										className="text-sm lg:text-base"
									>
										This order contains a gift
									</label>
								</div>
								<Button
									className="rounded-full"
									onClick={() => {
										alert(`Total checkout amount: ${total}`);
									}}
								>
									Proceed to buy
								</Button>
								<p className="text-sm">EMI available</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
