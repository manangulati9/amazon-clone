"use client";

import { api } from "@/trpc/react";
import { ProductModel } from "@/zod";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";

import { Button } from "@ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { EditProduct } from "./Edit-Product";
import { Drawer, DrawerTrigger } from "@ui/drawer";
import { toast } from "sonner";
import { useState } from "react";
import { notFound } from "next/navigation";
import { revalidate } from "@/lib/actions";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const parseResult = ProductModel.safeParse(row.original);
	const [isOpen, setIsOpen] = useState(false);

	if (!parseResult.success) {
		notFound();
	}

	const parsedProd = parseResult.data;

	const { mutate: copyRow } = api.seller.addProduct.useMutation({
		onSuccess: () => {
			void revalidate("/dashboard/seller");
			toast.success("Copy created successfully");
		},
	});

	const { mutate: deleteRow } = api.seller.deleteProduct.useMutation({
		onSuccess: () => {
			void revalidate("/dashboard/seller");
			toast.success("Product deleted!");
		},
	});

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted/20"
					>
						<DotsHorizontalIcon className="w-4 h-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<DrawerTrigger className="w-full">
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DrawerTrigger>
					<DropdownMenuItem onClick={() => copyRow(parsedProd)}>
						Make a copy
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							deleteRow([{ id: parsedProd.id, images: parsedProd.images }])
						}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<EditProduct setIsOpen={setIsOpen} product={parsedProd} />
		</Drawer>
	);
}
