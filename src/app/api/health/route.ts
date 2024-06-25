import { db } from "@/server/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
	try {
		const dbResponse = await db.product.findMany({
			take: 6,
			where: {
				images: {
					isEmpty: false,
				},
			},
		});
		const successMessage =
			dbResponse != null && dbResponse?.length > 0 ? "Success" : "Fail";
		return NextResponse.json({ error: null, status: successMessage });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ status: "Fail", error });
	}
}
