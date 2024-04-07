import { PendingVerification } from "@/app/_components/Pending-Verification";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const email = searchParams.mailId

  return (
    <div className="my-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <PendingVerification email={email} />
      </Suspense>
    </div>
  )
}

function LoadingSkeleton() {
  return <>
    <Skeleton className="w-[350px] h-[200px]" />
    <div className="pt-5 max-w-xl space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-8 w-[10rem]" />
    </div>
  </>
}
