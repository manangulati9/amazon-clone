"use client";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@ui/drawer";
import { Button, buttonVariants } from "@ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
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
import { useState } from "react";
import { toast } from "sonner";

export function AddProduct() {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm<TAddProductForm>({
		resolver: zodResolver(addProductFormSchema),
		defaultValues: {
			name: "",
			images: [],
			description: "",
			price: 2000,
		},
	});

	const onSuccess = () => {
		void revalidate("/dashboard/seller");
		toast.success("Product added!");
		setIsOpen(false);
		form.reset();
	};

	const { mutate, isPending } = api.seller.addProduct.useMutation({
		onSuccess,
	});

	const onSubmit = (values: TAddProductForm) => {
		mutate(values);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger
				className={buttonVariants({
					variant: "outline",
					className: "space-x-2",
					size: "sm",
				})}
			>
				<PlusCircledIcon className="size-4" />
				<span>Add item</span>
			</DrawerTrigger>
			<DrawerContent className="container">
				<DrawerHeader className="px-0">
					<DrawerTitle className="text-2xl">Create a new product</DrawerTitle>
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
									<div className="flex gap-4 items-center">
										<FormLabel>Name</FormLabel>
										<FormMessage />
									</div>
									<FormControl>
										<Input placeholder="Product name" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<div className="flex gap-4 items-center">
										<FormLabel>Price</FormLabel>
										<FormMessage />
									</div>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<div className="flex gap-4 items-center">
										<FormLabel>Category</FormLabel>
										<FormMessage />
									</div>
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
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="images"
							render={() => (
								<FormItem className="row-span-2">
									<div>
										<FormLabel>
											Upload images{" "}
											<span className="text-muted-foreground">
												(max 5 images)
											</span>
										</FormLabel>
									</div>
									<ImageUpload
										dimensions={{
											mobile: 150,
											tablet: 210,
											desktop: 308,
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
									<div className="flex gap-4 items-center">
										<FormLabel>Description</FormLabel>
										<FormMessage />
									</div>
									<FormControl>
										<Textarea
											className="min-h-[8rem] lg:min-h-[15rem]"
											placeholder="Product's description goes here..."
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<DrawerFooter className="flex gap-2 px-0">
							<Button type="submit" className="w-fit" disabled={isPending}>
								{isPending ? "Submitting..." : "Submit"}
							</Button>
						</DrawerFooter>
					</form>
				</Form>
			</DrawerContent>
		</Drawer>
	);
}
