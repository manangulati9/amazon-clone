import Image from "next/image";
import Link from "next/link";

export default function () {
  return (
    <div className=" bg-white rounded-md text-center text-sm px-8 py-4 shadow-lg my-5 drop-shadow-2xl">
      <h3 className="text-lg font-emberBd">Up to 60% off | Styles for Women</h3>
      <div className="grid grid-cols-2 justify-evenly gap-4 my-4">
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/120x120/?clothes"
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>Clothing</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/120x120/?sports"
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>Sports Equipments</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/120x120/?smartphones"
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>Smartphones</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <Image
            src="https://source.unsplash.com/120x120/?watches"
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>Watches</p>
        </div>
      </div>
      <Link href="" className="text-md text-blue-600 hover:underline">
        See More
      </Link>
    </div>
  );
}
