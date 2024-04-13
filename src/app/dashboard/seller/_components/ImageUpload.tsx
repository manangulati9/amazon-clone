import Uppy from "@uppy/core";
import Tus, { type TusOptions } from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import { useEffect, useState } from "react";
import { env } from "@/env";
import { useSession } from "next-auth/react";
import { createClient } from "@/lib/supabase/client";
import { useFormContext } from "react-hook-form";

const supabaseStorageURL = `${env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/upload/resumable`;

const tusOpts = {
	endpoint: supabaseStorageURL,
	headers: {
		authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
		apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	},
	uploadDataDuringCreation: true,
	chunkSize: 2 * 1024 * 1024,
	allowedMetaFields: [
		"bucketName",
		"objectName",
		"contentType",
		"cacheControl",
	],
} satisfies TusOptions;

export default function ImageUpload({
	dimensions,
}: { dimensions: { mobile: number; tablet: number; desktop: number } }) {
	const { mobile, tablet, desktop } = dimensions;
	const { data: session } = useSession();
	const [uppyMobile] = useState(() =>
		new Uppy({
			restrictions: { minNumberOfFiles: 1, maxNumberOfFiles: 5 },
			id: "uppyMobile",
		}).use(Tus, tusOpts),
	);

	const [uppyTablet] = useState(() =>
		new Uppy({
			restrictions: { minNumberOfFiles: 1, maxNumberOfFiles: 5 },
			id: "uppyTablet",
		}).use(Tus, tusOpts),
	);

	const [uppyDesktop] = useState(() =>
		new Uppy({
			restrictions: { minNumberOfFiles: 1, maxNumberOfFiles: 5 },
			id: "uppyDesktop",
		}).use(Tus, tusOpts),
	);

	const { setValue } = useFormContext();
	const supabase = createClient();

	useEffect(() => {
		const handleUpload = (uppy: Uppy) => {
			const filePaths: string[] = [];

			uppy.on("file-added", (file) => {
				const formattedFileName = file.name.toLowerCase().replace(/\s+/g, "-");
				const supabaseMetadata = {
					bucketName: "products",
					objectName: folder
						? `${folder}/${formattedFileName}`
						: formattedFileName,
					contentType: file.type,
				};

				file.meta = {
					...file.meta,
					...supabaseMetadata,
				};

				filePaths.push(supabaseMetadata.objectName);
			});

			uppy.on("complete", (result) => {
				if (result.successful) {
					const imageURLs = filePaths.map(
						(path) =>
							supabase.storage.from("products").getPublicUrl(path).data
								.publicUrl,
					);

					setValue("images", imageURLs);
				}
			});
		};

		handleUpload(uppyMobile);
		handleUpload(uppyTablet);
		handleUpload(uppyDesktop);

		return () => {
			uppyMobile.close();
			uppyTablet.close();
			uppyDesktop.close();
		};
	}, []);

	if (!session) {
		return;
	}

	const folder = session.user.id;

	return (
		<>
			<Dashboard
				id="uppyMobile"
				className="md:hidden"
				uppy={uppyMobile}
				height={mobile}
				showProgressDetails
			/>
			<Dashboard
				id="uppyTablet"
				className="hidden md:max-lg:block"
				uppy={uppyTablet}
				height={tablet}
				showProgressDetails
			/>
			<Dashboard
				id="uppyDesktop"
				className="hidden lg:block"
				uppy={uppyDesktop}
				height={desktop}
				showProgressDetails
			/>
		</>
	);
}
