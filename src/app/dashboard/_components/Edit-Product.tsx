"use client";
import {
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerFooter,
} from "@ui/drawer";
import { Button } from "@ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TAddProductForm, addProductFormSchema } from "@/zod/custom";
import { api } from "@/trpc/react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/select";
import { PRODUCT_CATEGORIES } from "@/lib/data/navbar";
import ImageUpload from "./ImageUpload";
import { revalidate } from "@/lib/actions";
import { type Product } from "@prisma/client";
import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";

export function EditProduct({
	product,
	setIsOpen,
}: { product: Product; setIsOpen: Dispatch<SetStateAction<boolean>> }) {
	const form = useForm<TAddProductForm>({
		resolver: zodResolver(addProductFormSchema),
		defaultValues: {
			name: product.name,
			price: product.price,
			description: product.description,
			images: product.images,
		},
	});

	const onSuccess = () => {
		void revalidate("/dashboard");
		toast.success("Details updated successfully!");
		setIsOpen(false);
		form.reset();
	};

	const { mutate: removeImages, isPending: isRemoving } =
		api.seller.deleteImages.useMutation({
			onSuccess,
		});

	const { mutate: editProduct, isPending: isEditing } =
		api.seller.editProduct.useMutation({
			onSuccess,
		});

	const onSubmit = (values: TAddProductForm) => {
		editProduct({ id: product.id, newData: values });
	};

	return (
		<DrawerContent className="container">
			<DrawerHeader className="px-0">
				<DrawerTitle className="text-2xl">Edit product details</DrawerTitle>
				<DrawerDescription>
					Fill the form below and click submit
				</DrawerDescription>
			</DrawerHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col grid-cols-2 gap-2 lg:grid xs:gap-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Product name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent>
										{PRODUCT_CATEGORIES.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem className="row-span-2">
								<FormLabel>Upload images (max 5)</FormLabel>
								<div className="flex flex-wrap gap-4 justify-evenly mb-2">
									{field.value.map((url, i) => (
										<div
											className={cn("relative", {
												"opacity-50": isRemoving,
											})}
											key={i}
										>
											<div className="w-[45px] xs:w-[55px] md:w-[100px]">
												<AspectRatio ratio={1 / 1}>
													<Image
														src={url}
														alt=""
														fill
														className="object-cover rounded-md drop-shadow-lg"
													/>
												</AspectRatio>
											</div>
											<button
												className="absolute top-1 right-1 p-1 bg-white rounded-full transition-colors hover:bg-accent"
												disabled={isRemoving}
												onClick={() =>
													removeImages({ data: product, imagesToRemove: [url] })
												}
											>
												<Cross2Icon />
											</button>
										</div>
									))}
								</div>
								<ImageUpload
									dimensions={{
										mobile: 150,
										tablet: 210,
										desktop: 220,
									}}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product description</FormLabel>
								<FormControl>
									<Textarea
										className="min-h-[8rem] lg:min-h-[15rem]"
										placeholder="Product's description goes here..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DrawerFooter className="flex gap-2 px-0">
						<Button type="submit" className="w-fit" disabled={isEditing}>
							{isEditing ? "Submitting..." : "Submit"}
						</Button>
					</DrawerFooter>
				</form>
			</Form>
		</DrawerContent>
	);
}
