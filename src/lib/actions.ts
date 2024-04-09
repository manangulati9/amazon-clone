"use server";

import { revalidatePath } from "next/cache";

export async function revalidate(path: string | string[]) {
	if (typeof path === "string") {
		revalidatePath(path);
		return;
	}

	path.forEach((p) => revalidatePath(p));
}
