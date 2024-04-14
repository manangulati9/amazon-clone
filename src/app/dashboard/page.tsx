import { getData } from "@/lib/get-item";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
	const userData = await getData(api.common.getUserData);

	if (userData?.type === "CUSTOMER") {
		redirect("/dashboard/customer/orders");
	}

	redirect("/dashboard/seller");
}
