"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@ui/button";
import { signOut } from "next-auth/react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
	}[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	const pathname = usePathname();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<nav
			className={cn(
				"flex flex-col lg:space-x-0 lg:space-y-1 flex-grow justify-between",
				className,
			)}
			{...props}
		>
			<div className="space-y-2">
				{items.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							buttonVariants({ variant: "ghost" }),
							pathname === item.href
								? "bg-primary hover:bg-primary font-semibold"
								: "hover:bg-primary/20 hover:underline",
							"justify-start block transition-colors text-base",
						)}
					>
						{item.title}
					</Link>
				))}
			</div>
			<Button onClick={handleSignOut}>Sign out</Button>
		</nav>
	);
}
