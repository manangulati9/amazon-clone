import { Skeleton } from "@ui/skeleton";

export function LoadingSkeleton() {
	return (
		<>
			<Skeleton className="w-[350px] h-[200px]" />
			<div className="pt-5 space-y-2 max-w-xl">
				<Skeleton className="w-full h-8" />
				<Skeleton className="w-full h-12" />
				<Skeleton className="h-8 w-[10rem]" />
			</div>
		</>
	);
}
