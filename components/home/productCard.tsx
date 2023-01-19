import Image from "next/image";
import Link from "next/link";

export default function ({
  cat1,
  cat2,
  cat3,
  cat4,
  title,
}: {
  cat1: string;
  cat2: string;
  cat3: string;
  cat4: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4 justify-between w-[22rem] bg-white rounded-md text-sm px-6 py-4 shadow-lg my-5 drop-shadow-sm">
      <h3 className="text-lg font-emberBd">{title}</h3>
      <div className="grid grid-cols-2 place-items-center gap-4">
        <Link href="" className="flex flex-col gap-2 w-fit">
          <Image
            src={`https://source.unsplash.com/120x120/?${cat1}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>{cat1.charAt(0).toUpperCase() + cat1.slice(1)}</p>
        </Link>
        <Link href="" className="flex flex-col gap-2 w-fit">
          <Image
            src={`https://source.unsplash.com/120x120/?${cat2}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>{cat2.charAt(0).toUpperCase() + cat2.slice(1)}</p>
        </Link>
        <Link href="" className="flex flex-col gap-2 w-fit">
          <Image
            src={`https://source.unsplash.com/120x120/?${cat3}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>{cat3.charAt(0).toUpperCase() + cat3.slice(1)}</p>
        </Link>
        <Link href="" className="flex flex-col gap-2 w-fit">
          <Image
            src={`https://source.unsplash.com/120x120/?${cat4}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p>{cat4.charAt(0).toUpperCase() + cat4.slice(1)}</p>
        </Link>
      </div>
      <Link
        href=""
        className="text-md text-blue-600 hover:underline self-start"
      >
        See More
      </Link>
    </div>
  );
}
