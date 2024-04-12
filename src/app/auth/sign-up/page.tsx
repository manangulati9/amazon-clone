"use client";

import { Separator } from "@ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { Button, buttonVariants } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { signUpFormSchema, type TSignUpForm } from "@/zod/custom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toast } from "@ui/toast";

export default function Page() {
	const router = useRouter();
	const form = useForm<TSignUpForm>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			type: "CUSTOMER",
		},
	});

	const { mutate: createAccount, isPending } =
		api.common.createAccount.useMutation({
			onSuccess: () => router.push("/auth/account-verification"),
			onError: (error) => {
				console.error(error);
				if (error.data?.code === "CONFLICT") {
					toast.error(
						<Toast
							opts={{
								variant: "error",
								title: "Sign up failed!",
								description: "This email is already registered.",
							}}
						/>,
					);
				}
			},
		});

	const onSubmit = (values: TSignUpForm) => {
		createAccount(values);
	};

	return (
		<>
			<Card className="relative w-full border border-muted/20 max-w-[25rem]">
				<CardHeader>
					<CardTitle className="text-4xl font-medium">Create account</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="John Davis" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john_davis23@gmail.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Choose account type</FormLabel>
										<RadioGroup
											value={field.value}
											className="flex gap-2"
											onValueChange={field.onChange}
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="CUSTOMER" id="CUSTOMER" />
												<Label htmlFor="CUSTOMER">Customer</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="SELLER" id="SELLER" />
												<Label htmlFor="SELLER">Seller</Label>
											</div>
										</RadioGroup>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Min. 8 characters"
												{...field}
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Re-enter your password"
												{...field}
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? "Submitting..." : "Submit"}
							</Button>
							<div>
								<span>By continuing, you agree to Amazon&apos;s </span>
								<Button variant="link" className="p-0 text-xs h-fit">
									Condition of Use
								</Button>
								<span> and </span>
								<br />
								<Button variant="link" className="p-0 text-xs h-fit">
									Privacy Notice.
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
				<div className="flex absolute -bottom-6 gap-2 items-center w-full">
					<Separator className="flex-1" />
					<span className="shrink-0">Already have an account?</span>
					<Separator className="flex-1" />
				</div>
			</Card>
			<Link
				href="/auth/login"
				className={buttonVariants({
					className: "h-8 relative w-[20rem] top-4",
					variant: "outline",
				})}
			>
				Sign in
			</Link>
		</>
	);
}
