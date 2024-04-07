import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import Image from "next/image";

export default function Page() {
  return (
    <div className="my-8">
      <div className="mx-auto w-[250px]">
        <AspectRatio>
          <Image src="/assets/email.svg" alt="" fill />
        </AspectRatio>
      </div>
      <div className="pt-5 max-w-xl">
        <h1 className="text-4xl font-semibold">We&apos;ve sent you a verification email.</h1>
        <h2 className="text-xl text-wrap">Please check it and confirm your account. Be sure to check your spam folder</h2>
      </div>
    </div>
  )
}
