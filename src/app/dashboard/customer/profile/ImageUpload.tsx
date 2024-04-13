import Uppy from "@uppy/core";
import Tus, { type TusOptions } from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import { useEffect, useState } from "react";
import { env } from "@/env";
import { useSession } from "next-auth/react";
import { createClient } from "@/lib/supabase/client";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Toast } from "@/ui/toast";

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
	refetch,
}: {
	dimensions: { mobile: number; tablet: number; desktop: number };
	refetch: ReturnType<typeof api.common.getData.useQuery>["refetch"];
}) {
	const { mobile, tablet, desktop } = dimensions;
	const { data: session } = useSession();

	const [uppyMobile] = useState(() =>
		new Uppy({
			restrictions: { minNumberOfFiles: 1, maxNumberOfFiles: 1 },
			id: "uppyAvatarMobile",
		}).use(Tus, tusOpts),
	);

	const [uppyTablet] = useState(() =>
		new Uppy({
			restrictions: { minNumberOfFiles: 1, maxNumberOfFiles: 1 },
			id: "uppyAvatarTablet",
		}).use(Tus, tusOpts),
	);

	const [uppyDesktop] = useState(() =>
		new Uppy({
			restrictions: { minNumberOfFiles: 1, maxNumberOfFiles: 1 },
			id: "uppyAvatarDesktop",
		}).use(Tus, tusOpts),
	);

	const supabase = createClient();

	const { mutate: updateImage } = api.customer.updateImage.useMutation({
		onSuccess: async () => {
			await refetch();
			toast.success(
				<Toast
					opts={{
						variant: "success",
						title: "Profile picture added!",
					}}
				/>,
			);
		},

		onError: (error) => {
			console.error(error);
			toast.error(
				<Toast
					opts={{
						variant: "error",
						title: "Profile updation failed!",
						description: "Something went wrong. Try again later.",
					}}
				/>,
			);
		},
	});

	useEffect(() => {
		const handleUpload = (uppy: Uppy) => {
			let filePath = "";

			uppy.on("file-added", (file) => {
				const formattedFileName = file.name.toLowerCase().replace(/\s+/g, "-");
				const supabaseMetadata = {
					bucketName: "avatars",
					objectName: folder
						? `${folder}/${formattedFileName}`
						: formattedFileName,
					contentType: file.type,
				};

				file.meta = {
					...file.meta,
					...supabaseMetadata,
				};

				filePath = supabaseMetadata.objectName;
			});

			uppy.on("complete", (result) => {
				if (result.successful) {
					const imageURL = supabase.storage
						.from("avatars")
						.getPublicUrl(filePath).data.publicUrl;

					updateImage(imageURL);
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
				className="md:hidden"
				uppy={uppyMobile}
				height={mobile}
				showProgressDetails
			/>
			<Dashboard
				className="hidden md:max-lg:block"
				uppy={uppyTablet}
				height={tablet}
				showProgressDetails
			/>
			<Dashboard
				className="hidden lg:block w-fit"
				uppy={uppyDesktop}
				height={desktop}
				showProgressDetails
			/>
		</>
	);
}
