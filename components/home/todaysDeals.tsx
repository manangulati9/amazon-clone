import Image from "next/image";
import Link from "next/link";

export default function () {
  return (
    <div className="flex flex-col gap-3 drop-shadow-2xl shadow-2xl text-sm m-2 px-6 pt-4 pb-6 rounded-md bg-white">
      <div className="flex gap-5 mb-2 items-center ">
        <h3 className="text-lg font-emberBd">Today's Deals</h3>
        <Link href="" className="text-md text-blue-600 hover:underline">
          See More
        </Link>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/220x220/?clothes"
            alt="product_img"
            width={220}
            height={220}
            className="rounded-sm"
          />
          <p>Clothing</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/220x220/?clothes"
            alt="product_img"
            width={220}
            height={220}
            className="rounded-sm"
          />
          <p>Clothing</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/220x220/?clothes"
            alt="product_img"
            width={220}
            height={220}
            className="rounded-sm"
          />
          <p>Clothing</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/220x220/?clothes"
            alt="product_img"
            width={220}
            height={220}
            className="rounded-sm"
          />
          <p>Clothing</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/220x220/?clothes"
            alt="product_img"
            width={220}
            height={220}
            className="rounded-sm"
          />
          <p>Clothing</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/220x220/?clothes"
            alt="product_img"
            width={220}
            height={220}
            className="rounded-sm"
          />
          <p>Clothing</p>
        </div>
      </div>
    </div>
  );
}
