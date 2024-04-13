"use client";

import { revalidate } from "@/lib/actions";
import { api } from "@/trpc/react";
import { Toast } from "@/ui/toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";

import { Button } from "@ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const { mutate: cancelOrder } = api.customer.cancelOrder.useMutation({
		onSuccess: () => {
			void revalidate("/dashboard/customer/orders");
			toast.success(
				<Toast opts={{ variant: "success", title: "Order cancelled!" }} />,
			);
		},
		onError: () => {
			toast.error(
				<Toast
					opts={{
						variant: "error",
						title: "Something went wrong",
						description: "Please try again later",
					}}
				/>,
			);
		},
	});

	return (
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
				<DropdownMenuItem onClick={() => cancelOrder(row.getValue("id"))}>
					Cancel
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
