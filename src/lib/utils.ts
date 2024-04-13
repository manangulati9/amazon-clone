import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { unstable_cache as cache } from "next/cache";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getCachedData = async <T>(
	callback: () => Promise<T>,
	keyParts: string[],
	tags?: string[],
) => {
	const cachedCallback = cache(callback, keyParts, { revalidate: 3600, tags });
	const data = await cachedCallback();
	return data;
};

export function getBaseUrl() {
	if (typeof window !== "undefined") return window.location.origin;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getDay(date: number) {
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	return days[date];
}

export function getMonth(monNum: number) {
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return month[monNum];
}

export type ToastOpts = {
	title: string;
	description?: string;
	variant: "error" | "success";
};
