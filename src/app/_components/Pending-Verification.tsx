import { getBaseUrl } from "@/lib/utils";
import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import { buttonVariants } from "@/app/_components/ui/button";
import Link from "next/link";
import Image from "next/image";

export async function PendingVerification({ email }: { email: string | string[] | undefined }) {
  try {
    await fetch(`${getBaseUrl()}/api/verify_email`, {
      method: "POST",
      body: JSON.stringify({
        email
      })
    })
  } catch (error) {
    console.error(error)
    return (
      <>
        <div className="mx-auto w-[250px]">
          <AspectRatio>
            <Image src="/assets/mail_verification_failed.svg" alt="" fill />
          </AspectRatio>
        </div>
        <div className="pt-5 max-w-xl space-y-2">
          <h1 className="text-4xl font-semibold">Sorry, your email could not be verified.</h1>
          <h2 className="text-xl text-wrap">Please try again later</h2>
          <Link href="/" className={buttonVariants({
            variant: "default",
          })}>
            Go to homepage
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mx-auto w-[250px]">
        <AspectRatio>
          <Image src="/assets/mail_verified.svg" alt="" fill />
        </AspectRatio>
      </div>
      <div className="pt-5 max-w-xl space-y-2">
        <h1 className="text-4xl font-semibold">Congrats! Your account is verified.</h1>
        <h2 className="text-xl text-wrap">Please sign in to continue</h2>
        <Link href="/auth/login" className={buttonVariants({
          variant: "default",
        })}>
          Sign in
        </Link>
      </div>
    </>
  )
}
