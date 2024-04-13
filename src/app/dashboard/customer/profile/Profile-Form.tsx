"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { type TProfileForm, profileFormSchema } from "@/zod/custom";
import ImageUpload from "./ImageUpload";
import { AspectRatio } from "@/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { api } from "@/trpc/react";
import { Button } from "@/ui/button";
import { toast } from "sonner";
import { Toast } from "@/ui/toast";
import { type User } from "@prisma/client";
import { Label } from "@/ui/label";

export function ProfileForm({ initialData }: { initialData: User }) {
	const { data, refetch } = api.common.getData.useQuery(undefined, {
		initialData,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const form = useForm<TProfileForm>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			email: data.email,
			name: data.name,
			image: data.image ?? "",
		},
	});

	const didChange = form.formState.isDirty;
	const avatarURL = data.image;

	const { mutate: updateName, isPending: isUpdating } =
		api.customer.updateName.useMutation({
			onSuccess: async () => {
				await refetch();
				toast.success(
					<Toast
						opts={{
							variant: "success",
							title: "Profile updated!",
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
							title: "Updation failed!",
							description: "Something went wrong. Try again later.",
						}}
					/>,
				);
			},
		});

	const { mutate: deleteImage, isPending: isDeleting } =
		api.customer.deleteImage.useMutation({
			onSuccess: async () => {
				await refetch();
				toast.success(
					<Toast
						opts={{
							variant: "success",
							title: "Profile picture deleted!",
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

	function onSubmit(data: TProfileForm) {
		updateName(data.name);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input disabled {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="space-y-2 w-full">
					<span className="text-sm font-medium leading-none">
						Update picture
					</span>
					{avatarURL ? (
						<div
							className={cn("relative w-fit", {
								"opacity-50": isDeleting,
							})}
						>
							<div className="w-[150px]">
								<AspectRatio ratio={1 / 1}>
									<Image
										src={avatarURL}
										alt=""
										fill
										className="object-cover rounded-md drop-shadow-lg"
									/>
								</AspectRatio>
							</div>
							<button
								className="absolute top-1 right-1 p-1 bg-white rounded-full transition-colors hover:bg-accent"
								disabled={isDeleting}
								onClick={(e) => {
									e.preventDefault();
									deleteImage(avatarURL);
								}}
							>
								<Cross2Icon />
							</button>
						</div>
					) : (
						<ImageUpload
							dimensions={{
								mobile: 150,
								tablet: 210,
								desktop: 320,
							}}
							refetch={refetch}
						/>
					)}
				</div>
				<Button
					type="submit"
					className="w-fit"
					disabled={!didChange ?? isUpdating}
				>
					{isUpdating ? "Updating..." : "Update"}
				</Button>
			</form>
		</Form>
	);
}
