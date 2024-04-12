import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";

export default function Page() {
	return (
		<div className="container flex flex-col justify-center items-center p-8">
			<div className="mx-auto w-[250px]">
				<AspectRatio>
					<Image src="/assets/email.svg" alt="" fill />
				</AspectRatio>
			</div>
			<div className="pt-5 space-y-4 text-center">
				<h1 className="text-4xl font-semibold">
					We&apos;ve sent you a verification email.
				</h1>
				<h2 className="max-w-xl text-base text-muted/90">
					Please check it and confirm your account. Check your spam folder if
					you can&apos;t find it in inbox.
				</h2>
			</div>
		</div>
	);
}
