import React from "react";
import { Footer } from "@/app/_components/Footer";
import { Navbar } from "@/app/_components/Navbar";
import { getData } from "@/lib/get-item";
import { api } from "@/trpc/server";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userData = await getData(api.common.getData);

	return (
		<main className="flex flex-col h-full">
			<Navbar user={userData} />
			<div className="flex-grow pt-48 lg:pt-28 xs:pt-44">{children}</div>
			<Footer />
		</main>
	);
}
