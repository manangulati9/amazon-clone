// import { db } from "@/server/db";
// import { NextResponse } from "next/server";

// export async function GET() {
// 	try {
// 		const dbResponse = await db.product.findMany({
// 			take: 6,
// 			where: {
// 				images: {
// 					isEmpty: false,
// 				},
// 			},
// 		});
// 		const successMessage =
// 			dbResponse != null && dbResponse?.length > 0 ? "Success" : "Fail";
// 		return NextResponse.json({ error: null, status: successMessage });
// 	} catch (error) {
// 		console.log(error);
// 		return NextResponse.json({ status: "Fail", error });
// 	}
// }

import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

import { keepAliveConfig as config } from "@/lib/keep-alive-config";
import { type QueryResponse, determineAction } from "./helper";

export const dynamic = "force-dynamic"; // defaults to auto

const querySupabase = async (
	supabase: SupabaseClient,
): Promise<QueryResponse> => {
	const { error } = await supabase.from(config.table).select("*");

	const messageInfo = `Health check`;

	if (error) {
		const errorInfo = `${messageInfo}: ${error.message}`;
		if (config.consoleLogOnError) console.log(errorInfo);
		return {
			successful: false,
			message: errorInfo,
		};
	}

	return {
		successful: true,
		message: `${messageInfo}: OK`,
	};
};

const fetchOtherEndpoints = async (): Promise<string[]> => {
	if (config?.otherEndpoints != null && config?.otherEndpoints.length > 0) {
		const fetchPromises = config.otherEndpoints.map(async (endpoint) => {
			const endpointResults = await fetch(endpoint, { cache: "no-store" });
			const passOrFail = endpointResults?.status == 200 ? "OK" : "Error";
			return `${endpoint} - ${passOrFail}`;
		});

		const fetchResults = await Promise.all(fetchPromises);
		return fetchResults;
	}

	return [];
};

export async function GET() {
	const supabase = createClient(); // maybe switch to ClientSide Client

	let responseMessage = "";
	let successfulResponses = true;

	if (config?.disableRandomStringQuery != true) {
		const querySupabaseResponse: QueryResponse = await querySupabase(supabase);

		successfulResponses =
			successfulResponses && querySupabaseResponse.successful;
		responseMessage += querySupabaseResponse.message + "\n\n";
	}

	if (config?.allowInsertionAndDeletion == true) {
		const insertOrDeleteResults: QueryResponse =
			await determineAction(supabase);

		successfulResponses =
			successfulResponses && insertOrDeleteResults.successful;
		responseMessage += insertOrDeleteResults.message + "\n\n";
	}

	if (config?.otherEndpoints != null && config?.otherEndpoints.length > 0) {
		const fetchResults: string[] = await fetchOtherEndpoints();
		responseMessage += `Other Endpoint Results:\n${fetchResults.join("\n")}`;
	}

	return new Response(responseMessage, {
		status: successfulResponses == true ? 200 : 400,
	});
}
