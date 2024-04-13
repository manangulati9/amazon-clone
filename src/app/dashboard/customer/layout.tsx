import { type Metadata } from "next";
import Image from "next/image";
import { Separator } from "@ui/separator";
import { SidebarNav } from "./_components/Sidebar-Nav";
import { AspectRatio } from "@/ui/aspect-ratio";
import Link from "next/link";
import { SIDEBAR_NAV_ITEMS } from "@/lib/data/dashboard";
import { MobileMenu } from "./_components/Mobile-Menu";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Customer dashboard",
};

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: SettingsLayoutProps) {
	return (
		<div className="flex flex-col p-10 pb-16 h-full lg:space-y-6">
			<div className="flex justify-between items-center">
				<div className="space-y-0.5">
					<h2 className="text-2xl font-bold tracking-tight md:text-4xl">
						Dashboard
					</h2>
					<p className="text-xs md:max-w-lg md:text-base max-w-[10rem] text-muted-foreground">
						Check your orders, manage account settings and more.
					</p>
				</div>
				<Link href="/" className="hidden lg:block w-[150px]">
					<AspectRatio ratio={15 / 5}>
						<Image src="/assets/amzn_logo_black.svg" fill alt="" />
					</AspectRatio>
				</Link>
				<MobileMenu />
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col flex-grow lg:flex-row lg:space-y-0 lg:space-x-12">
				<aside className="hidden flex-col lg:flex lg:w-1/6">
					<SidebarNav items={SIDEBAR_NAV_ITEMS} />
				</aside>
				<div className="flex-1">{children}</div>
			</div>
		</div>
	);
}
