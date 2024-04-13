import { Separator } from "@ui/separator";
import { columns } from "./_components/Columns";
import { DataTable } from "./_components/Data-Table";
import { api } from "@/trpc/server";
import { getData } from "@/lib/get-item";

export default async function OrdersPage() {
	const orders = await getData(api.customer.getOrders);

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-xl font-bold">Orders</h3>
				<p className="text-sm text-muted-foreground">View your orders here</p>
			</div>
			<Separator />
			<DataTable data={orders} columns={columns} />
		</div>
	);
}
