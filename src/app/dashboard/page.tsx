import { columns } from "@/app/dashboard/_components/Columns";
import { DataTable } from "@/app/dashboard/_components/Data-Table";
import { UserNav } from "@/app/dashboard/_components/User-Nav";
import { getCachedData } from "@/lib/utils";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
	const userData = await api.common.getData();
	const isCustomer = userData.type === "CUSTOMER";

	if (isCustomer) {
		return <div />;
	}

	const products = await getCachedData(
		async () => api.seller.getProducts(),
		["products"],
	);

	return (
		<div className="flex-col flex-1 p-8 space-y-8 h-full md:flex">
			<Link href="/" className="flex justify-between space-y-2">
				<Image
					src="/assets/amzn_logo_black.svg"
					alt=""
					height={200}
					width={200}
				/>
				<UserNav />
			</Link>
			<DataTable data={products} columns={columns} />
		</div>
	);
}
