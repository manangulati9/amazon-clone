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
		cell: ({ row }) => <div className="w-[150px]">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<div className="line-clamp-1 w-[175px]">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "category",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Category" />
		),
		cell: ({ row }) => {
			return <div className="w-[100px]">{row.getValue("category")}</div>;
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
			return <div className="line-clamp-1">{row.getValue("description")}</div>;
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
