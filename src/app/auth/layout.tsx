import { Button } from "@ui/button"
import Link from "next/link"
import Image from "next/image"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-col gap-4 items-center p-4 pt-10 text-xs">
        <Link href="/">
          <Image src="/assets/amzn_logo_black.svg" alt="" height={200} width={200} />
        </Link>
        {children}
      </div>
      <div className="flex flex-col gap-2 items-center py-5 mt-4 w-full h-full text-xs border-t border-muted/10 bg-muted/10">
        <div className="flex gap-6 justify-center">
          <Button variant="link" className="p-0 text-xs h-fit">Conditions of User</Button>
          <Button variant="link" className="p-0 text-xs h-fit">Privacy Notice</Button>
          <Button variant="link" className="p-0 text-xs h-fit">Help</Button>
        </div>
        <p className="text-muted/90">
          @ 1996-{new Date().getFullYear()} Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </main>
  )
}
