import Link from "next/link";
import { auth } from "../firebase/firebase";
import Image from "next/image";
import { ProductInfo } from "../utils/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import { toTitleCase } from "../utils/functions";
export default function ({
  cartItems,
  setcartItems,
}: {
  cartItems: ProductInfo[];
  setcartItems: Dispatch<SetStateAction<ProductInfo[]>>;
}) {
  if (auth.currentUser == null)
    return (
      <div className="grid place-items-center min-h-[20rem] font-emberBd text-2xl">
        Please sign in to view cart
      </div>
    );
  let amts = 0;
  cartItems.forEach((item) => (amts += item.price));
  const [total, setTotal] = useState<number>(amts);
  return (
    <div className="flex justify-center gap-3 bg-gray-200 py-6 px-4 flex-wrap sm:flex-nowrap ">
      <CartDetails
        cartItems={cartItems}
        setcartItems={setcartItems}
        total={total}
        setTotal={setTotal}
      />
      <PaymentBox total={total} cartItems={cartItems} />
    </div>
  );
}

function CartDetails({
  cartItems,
  setcartItems,
  total,
  setTotal,
}: {
  cartItems: ProductInfo[];
  setcartItems: Dispatch<SetStateAction<ProductInfo[]>>;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="bg-white flex flex-col gap-2 w-full p-4 rounded justify-start">
      <div className="flex justify-between">
        <h1 className="text-2xl">Shopping Cart</h1>
        <p>Price</p>
      </div>
      <hr className="bg-gray-400" />
      {cartItems.map((item) => {
        return (
          <CartItem
            key={item.name}
            cartItems={cartItems}
            total={total}
            data={item}
            setcartItems={setcartItems}
            setTotal={setTotal}
          />
        );
      })}
      {total !== 0 ? <hr className="bg-gray-400" /> : null}
      <div className="flex gap-2 text-xl justify-end w-full">
        <p>Subtotal</p>
        <p>
          (
          {cartItems.length > 1
            ? cartItems.length + " items"
            : cartItems.length + " item"}
          ):
        </p>
        <p className="font-emberBd">₹{total.toLocaleString()}</p>
      </div>
    </div>
  );
}

function CartItem({
  data,
  setcartItems,
  setTotal,
  cartItems,
  total,
}: {
  data: ProductInfo;
  setcartItems: Dispatch<SetStateAction<ProductInfo[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
  cartItems: ProductInfo[];
  total: number;
}) {
  const imgUrl = data.imgUrl ? data.imgUrl : "";
  return (
    <div className="flex gap-3 flex-col md:flex-row lg:justify-start justify-center">
      <div className="mr-5 grow-0">
        <Image
          src={imgUrl}
          alt="..."
          width={200}
          height={200}
          className="rounded"
        />
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="flex w-full items-center justify-between md:text-xl text-base sm:text-lg flex-col md:flex-row">
          <h2>{toTitleCase(data.name)}</h2>
          <h3 className="font-emberBd">₹{data.price.toLocaleString()}</h3>
        </div>
        <div className="flex flex-col gap-2 text-xs w-fit my-4">
          <p className="text-green-600">In stock</p>
          <p className="text-gray-600">Eligible for FREE Shipping</p>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="rounded border-gray-400"
              name="gift_check"
            />
            <label htmlFor="gift_check">This will be a gift</label>
            <Link href="" className="text-blue-600 hover:underline">
              Learn more
            </Link>
          </div>
          <div className="flex gap-2">
            <p className="font-emberBd">Category: </p>
            <p>
              {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-emberBd">Quantity: </p>
            <p>{data.quantity}</p>
          </div>
          <div className="flex gap-3 text-blue-600">
            <button
              onClick={() => {
                setcartItems(
                  cartItems.filter((item) => {
                    return item !== data;
                  })
                );
                setTotal(total - data.price);
              }}
              className="hover:underline"
            >
              Delete
            </button>
            <button className="hover:underline">Save for later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentBox({
  total,
  cartItems,
}: {
  total: number;
  cartItems: ProductInfo[];
}) {
  return (
    <div className="bg-white rounded p-4 min-w-fit h-fit">
      <div className="grid h-full justify-center gap-6">
        <div className="flex text-xl gap-1 ">
          <p>Subtotal</p>
          <p>
            (
            {cartItems.length > 1
              ? cartItems.length + " items"
              : cartItems.length + " item"}
            ):
          </p>
          <p className="font-emberBd">₹{total.toLocaleString()}</p>
        </div>
        {total !== 0 ? (
          <div className="grid gap-2 self-center justify-items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="gift_check_2" className="rounded" />
              <label htmlFor="gift_check_2">This order contains a gift</label>
            </div>

            <button
              onClick={() => {
                alert(`Total checkout amount: ${total.toLocaleString()}`);
              }}
              className="rounded-2xl bg-[#ffd814] hover:bg-[#f7ca00] text-sm self-center w-full p-2 shadow-md"
            >
              Proceed to buy
            </button>
            <p className="text-sm">EMI available</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
