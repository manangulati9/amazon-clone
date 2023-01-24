import Image from "next/image";
import Link from "next/link";

export default function ({
  cat0,
  cat1,
  cat2,
  cat3,
  title,
}: {
  cat0: string;
  cat1: string;
  cat2: string;
  cat3: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 justify-between bg-white rounded-md text-xs sm:text-sm px-6 py-4 shadow-lg drop-shadow-sm ">
      <h3 className="md:text-lg text-sm font-emberBd">{title}</h3>
      <div className="grid grid-cols-2 place-items-center gap-4">
        <Link
          href={`/results/${cat0.replaceAll(" ", "-")}`}
          className="flex flex-col gap-2 w-[70px] sm:w-[100px] xl:w-[120px]"
        >
          <Image
            src={`https://source.unsplash.com/120x120/?${cat0}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p className="truncate grow-0">
            {cat0.charAt(0).toUpperCase() + cat0.slice(1)}
          </p>
        </Link>
        <Link
          href={`/results/${cat1.replaceAll(" ", "-")}`}
          className="flex flex-col gap-2 w-[70px] sm:w-[100px] xl:w-[120px]"
        >
          <Image
            src={`https://source.unsplash.com/120x120/?${cat1}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p className="truncate grow-0">
            {cat1.charAt(0).toUpperCase() + cat1.slice(1)}
          </p>
        </Link>
        <Link
          href={`/results/${cat2.replaceAll(" ", "-")}`}
          className="flex flex-col gap-2 w-[70px] sm:w-[100px] xl:w-[120px]"
        >
          <Image
            src={`https://source.unsplash.com/120x120/?${cat2}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p className="truncate grow-0">
            {cat2.charAt(0).toUpperCase() + cat2.slice(1)}
          </p>
        </Link>
        <Link
          href={`/results/${cat3.replaceAll(" ", "-")}`}
          className="flex flex-col gap-2 w-[70px] sm:w-[100px] xl:w-[120px]"
        >
          <Image
            src={`https://source.unsplash.com/120x120/?${cat3}`}
            alt="product_img"
            width={120}
            height={120}
            className="rounded-sm"
          />
          <p className="truncate grow-0">
            {cat3.charAt(0).toUpperCase() + cat3.slice(1)}
          </p>
        </Link>
      </div>
      <button className="text-blue-600 hover:underline self-start">
        See More
      </button>
    </div>
  );
}
