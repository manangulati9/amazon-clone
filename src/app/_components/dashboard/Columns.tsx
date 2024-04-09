"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@ui/checkbox";
import { DataTableColumnHeader } from "./Data-Table-Column-Header";
import { DataTableRowActions } from "./Data-Table-Row-Actions";
import { type Product } from "@prisma/client";

export const columns: ColumnDef<Product>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => <span>{row.getValue("id")}</span>,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<span className="font-medium truncate">{row.getValue("name")}</span>
		),
	},
	{
		accessorKey: "category",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Category" />
		),
		cell: ({ row }) => {
			return <span>{row.getValue("category")}</span>;
		},
		filterFn: (row, id, value: string) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => {
			return <span className="truncate">{row.getValue("description")}</span>;
		},
		filterFn: (row, id, value: string) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Price" />
		),
		cell: ({ row }) => {
			return <span>₹ {row.getValue("price")}</span>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
