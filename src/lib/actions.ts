"use server";

import { revalidatePath } from "next/cache";

export async function revalidate(
	path: string | string[],
	type?: "page" | "layout" | undefined,
) {
	if (typeof path === "string") {
		revalidatePath(path, type);
		return;
	}

	path.forEach((p) => revalidatePath(p, type));
}
