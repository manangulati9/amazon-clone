import Image from "next/image";
import primeLogo from "../../public/assets/primeLogo.png";
import { GetServerSideProps } from "next";
import { handleNavSearch, toTitleCase } from "../../utils/functions";
import { ProductInfo } from "../../utils/interfaces";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products = await handleNavSearch(ctx.params!.results as string);
  if (!products) {
    const prods: ProductInfo[] = [];
    return {
      props: {
        prods,
      },
    };
  }
  return {
    props: {
      products,
    },
  };
};

export default function (props: { products: ProductInfo[] }) {
  if (!props.products || props.products.length === 0)
    return (
      <div className="grid place-items-center min-h-[20rem]">
        <h1 className="text-2xl font-emberBd">
          Sorry, products of this category are unavailable
        </h1>
      </div>
    );
  return (
    <div className="flex flex-col gap-6 mx-10 my-4 py-2">
      <h1 className="text-xl font-emberBd">RESULTS</h1>
      {props.products.map((item) => {
        return (
          <Product
            prodName={item.name}
            prodPrice={item.price}
            imgUrl={item.imgUrl}
            key={item.name}
          />
        );
      })}
    </div>
  );
}

function Product({
  prodName,
  prodPrice,
  imgUrl,
}: {
  prodName: string;
  prodPrice: number;
  imgUrl: string | undefined;
}) {
  return (
    <Link href={`/results/product/${prodName}`} className="flex gap-4 w-fit">
      <Image
        src={imgUrl ? imgUrl : ""}
        alt={`${prodName}.img`}
        width={200}
        height={100}
        className="rounded"
      />
      <div className="flex flex-col gap-2 text-start">
        <p className="text-lg font-emberBd">{toTitleCase(prodName)}</p>
        <div className="flex gap-1 items-center">
          <p className="text-sm">4.6</p>
          <ul className="flex justify-center">
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="star"
                className="w-4 text-yellow-500 mr-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="star"
                className="w-4 text-yellow-500"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                ></path>
              </svg>
            </li>
          </ul>
          <p className="text-blue-500 text-xs">(188)</p>
        </div>
        <div className="flex gap-1 items-center">
          <p className="text-2xl font-semibold">
            ₹{prodPrice.toLocaleString()}
          </p>
          <p className="text-gray-600 line-through text-xs">
            ₹{(prodPrice + 10000).toLocaleString()}
          </p>
          <p className="text-xs">(4% off)</p>
        </div>
        <div className="flex gap-1 text-xs items-center">
          <Image src={primeLogo} alt="..." width={60} />
          <p>Get it by</p>
          <p className="font-emberBd">Tuesday, January 24</p>
        </div>
        <p className="text-xs">FREE Delivery by Amazon</p>
      </div>
    </Link>
  );
}
