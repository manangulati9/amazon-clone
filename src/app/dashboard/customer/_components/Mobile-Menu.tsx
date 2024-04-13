"use client";

import { AspectRatio } from "@/ui/aspect-ratio";
import { Sheet, SheetContent, SheetTrigger } from "@ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SidebarNav } from "./Sidebar-Nav";
import { SIDEBAR_NAV_ITEMS } from "@/lib/data/dashboard";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function MobileMenu() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className="self-center lg:hidden">
				<Menu className="w-6 h-6" />
			</SheetTrigger>
			<SheetContent className="flex flex-col p-8 space-y-6">
				<Link href="/" className="block w-[150px]">
					<AspectRatio ratio={15 / 5}>
						<Image src="/assets/amzn_logo_black.svg" fill alt="" />
					</AspectRatio>
				</Link>
				<SidebarNav items={SIDEBAR_NAV_ITEMS} />
			</SheetContent>
		</Sheet>
	);
}
