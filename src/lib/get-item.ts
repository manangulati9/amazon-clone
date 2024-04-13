import { cache } from "react";
import "server-only";

export const getData = async <T>(callback: () => Promise<T>) => {
	const cachedCallback = cache(callback);
	const data = await cachedCallback();
	return data;
};
