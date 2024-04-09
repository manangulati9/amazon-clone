import { columns } from "@/app/_components/dashboard/Columns";
import { DataTable } from "@/app/_components/dashboard/Data-Table";
import { UserNav } from "@/app/_components/dashboard/User-Nav";
import { api } from "@/trpc/server";
import Image from "next/image";

export default async function Page() {
  const userData = await api.common.getData();
  const isCustomer = userData.type === "CUSTOMER";

  if (isCustomer) {
    return <div />;
  }

  const products = await api.seller.getProducts();

  return (
    <div className="flex-col flex-1 p-8 space-y-8 h-full md:flex">
      <div className="flex justify-between space-y-2">
        <Image
          src="/assets/amzn_logo_black.svg"
          alt=""
          height={200}
          width={200}
        />
        <UserNav />
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
