import Link from "next/link";
import Image from "next/image";

export default function () {
  return (
    <div>
      <div className="flex gap-3 px-3 pb-5 pt-8">
        <ProductImage />
        <ProductDetails />
        <Buybox />
      </div>
    </div>
  );
}

function ProductImage() {
  return (
    <div className="mr-5">
      <Image
        src="https://source.unsplash.com/1000x1100/?smartphone"
        alt="..."
        width={1000}
        height={1100}
        className="rounded"
      />
    </div>
  );
}

function ProductDetails() {
  return (
    <div>
      <div className="grid gap-2">
        <h1 className="text-2xl font-emberBd">Product Name</h1>
        <div className="flex gap-5 items-center">
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
          <Link href="" className="text-blue-500 hover:underline">
            28,039 ratings
          </Link>
        </div>
      </div>
      <hr className="border bg-slate-500 my-2.5" />
      <div>
        <p className="text-xl my-2 font-emberBd">Price</p>
        <div className="flex gap-2 text-slate-600">
          M.R.P: <p className="line-through">74,999</p>{" "}
        </div>
        <p>Inclusive of all taxes</p>
        <p> EMI starts at ₹1,672. No Cost EMI available</p>
      </div>
      <hr className="border bg-slate-500 my-2.5" />
      <div className="grid gap-2">
        <h2 className="font-emberBd">About this item</h2>
        <ul className="list-disc list-inside">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat
            illum cum, corporis est similique eius repellat temporibus dolore
            doloribus saepe, vitae omnis?
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat
            illum cum, corporis est similique eius repellat temporibus dolore
            doloribus saepe, vitae omnis?
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat
            illum cum, corporis est similique eius repellat temporibus dolore
            doloribus saepe, vitae omnis?
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat
            illum cum, corporis est similique eius repellat temporibus dolore
            doloribus saepe, vitae omnis?
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat
            illum cum, corporis est similique eius repellat temporibus dolore
            doloribus saepe, vitae omnis?
          </li>
        </ul>
      </div>
    </div>
  );
}

function Buybox() {
  return (
    <div className="p-6 flex flex-col gap-6 rounded border border-gray-400 text-sm h-fit shadow-lg">
      <div className="flex flex-col gap-2">
        <Link href="" className="text-blue-600 hover:underline">
          FREE DELIVERY
        </Link>
        <p className="font-emberBd">Thursday, 12 January.</p>
      </div>
      <p>
        Or fastest delivery Tomorrow, January 11. Order within 3 hrs 47 mins.
      </p>
      <p className="text-lg text-green-600 font-emberBd">In stock.</p>
      <p>Sold by SellerName and Fulfilled by Amazon</p>
      <div className="flex gap-3 items-center">
        <label htmlFor="quantity">Quantity</label>
        <select name="quantity" className="rounded py-0 pl-2 pr-0">
          <option value="1" className="font-emberRg">
            1
          </option>
          <option value="2" className="font-emberRg">
            2
          </option>
        </select>
      </div>
      <button className="rounded-2xl bg-[#ffd814] hover:bg-[#f7ca00] self-center w-full p-2 shadow-md">
        Add to cart
      </button>
      <button className="rounded-2xl bg-[#ffa41c] hover:bg-[#fa8900] self-center w-full p-2 shadow-md">
        Buy now
      </button>
    </div>
  );
}
