import { Separator } from "@ui/separator";
import { ProfileForm } from "./Profile-Form";
import { getData } from "@/lib/get-item";
import { api } from "@/trpc/server";

export default async function Page() {
	const initialData = await getData(api.common.getData);

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-xl font-bold">Profile</h3>
				<p className="text-sm text-muted-foreground">
					This is how others will see you on the site.
				</p>
			</div>
			<Separator />
			<ProfileForm initialData={initialData} />
		</div>
	);
}
