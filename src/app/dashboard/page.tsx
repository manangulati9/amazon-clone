import { columns } from "@/app/_components/dashboard/Columns";
import { DataTable } from "@/app/_components/dashboard/Data-Table";
import { UserNav } from "@/app/_components/dashboard/User-Nav";
import { api } from "@/trpc/server";

export default async function Page() {
  const userData = await api.common.getData();
  const isCustomer = userData.type === "CUSTOMER";

  if (isCustomer) {
    return <div />;
  }

  const products = await api.seller.getProducts();

  return (
    <div className="flex-col flex-1 p-8 space-y-8 h-full md:flex">
      <div className="flex justify-between items-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
