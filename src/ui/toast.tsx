import { type ToastOpts } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";

export function Toast({ opts }: { opts: ToastOpts }) {
	return (
		<div className="flex gap-4 items-center">
			{opts.variant === "success" ? (
				<CircleCheck className="size-5" />
			) : (
				<CircleX className="size-5" />
			)}
			<div>
				<p className="text-base font-bold">{opts.title}</p>
				<p>{opts.description}</p>
			</div>
		</div>
	);
}
