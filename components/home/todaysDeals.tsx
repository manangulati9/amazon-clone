import Image from "next/image";
import Link from "next/link";
import { ProductInfo } from "../../utils/interfaces";
import { toTitleCase } from "../../utils/functions";

export default function ({ prods }: { prods: ProductInfo[] }) {
  return (
    <div className="flex flex-col gap-3 drop-shadow-2xl shadow-2xl text-sm m-2 px-6 pt-4 pb-6 rounded-md bg-white">
      <div className="flex gap-5 mb-2 items-center ">
        <h3 className="text-lg font-emberBd">Today's Deals</h3>
        <Link href="" className="text-md text-blue-600 hover:underline">
          See More
        </Link>
      </div>
      <div className="flex gap-5 flex-wrap items-center">
        {prods?.map((prod) => {
          return (
            <CardItem
              prodName={prod.name}
              key={prod.name}
              imgUrl={prod.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

function CardItem({
  prodName,
  imgUrl,
}: {
  prodName: string;
  imgUrl: string | undefined;
}) {
  return (
    <Link
      href={`/results/product/${prodName}`}
      className="flex flex-col gap-2 flex-1 items-center"
    >
      <Image
        src={imgUrl ? imgUrl : ""}
        alt="product_img"
        width={220}
        height={220}
        className="rounded-sm w-[70px] lg:w-full md:w-[120px]"
      />
      <span className="self-start w-[5rem] sm:w-[13rem] truncate sm:text-sm text-xs">
        {toTitleCase(prodName)}
      </span>
    </Link>
  );
}
