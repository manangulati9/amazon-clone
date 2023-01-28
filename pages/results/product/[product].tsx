import Image from "next/image";
import { ProductInfo, UserInterface } from "../../../utils/interfaces";
import { GetServerSideProps } from "next";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase/firebase";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { getDownloadURL, ref } from "firebase/storage";
import { getDay, getMonth, toTitleCase } from "../../../utils/functions";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prodName = ctx.params!.product;
  const productColRef = collection(db, "products");
  const q = query(productColRef, where("name", "==", prodName));
  const querySnap = await getDocs(q);
  if (!querySnap.empty) {
    const data = querySnap.docs[0].data() as ProductInfo;
    const imageRef = ref(storage, `${data.category}/${prodName}.jpg`);
    const imgUrl = await getDownloadURL(imageRef);
    const selleruid = data.uid;
    const sellerNameQuery = query(
      collection(db, "users"),
      where("uid", "==", selleruid)
    );
    const sellerQuerySnap = await getDocs(sellerNameQuery);
    const sellerData = sellerQuerySnap.docs[0].data() as UserInterface;
    const sellerName = sellerData.firstName + " " + sellerData.lastName;
    return {
      props: {
        data,
        imgUrl,
        sellerName,
      },
    };
  } else {
    const obj = new Object();
    return {
      props: {
        obj,
      },
    };
  }
};

export default function (props: {
  data: ProductInfo;
  setcartItems: Dispatch<SetStateAction<ProductInfo[]>>;
  cartItems: ProductInfo[];
  imgUrl: string;
  sellerName: string;
  obj?: Object;
}) {
  if (props.obj) {
    return (
      <div className="grid place-items-center min-h-[20rem]">
        <h1 className="text-2xl font-emberBd">
          Sorry, this product is not available
        </h1>
      </div>
    );
  }
  const [toastShow, settoastShow] = useState(false);
  return (
    <div>
      <div className="flex gap-3 px-3 pb-5 pt-8 justify-center flex-col lg:flex-row lg:items-start items-center">
        <ProductImage imgUrl={props.imgUrl} />
        <ProductDetails prodData={props.data} />
        <Buybox
          prodData={props.data}
          setcartItems={props.setcartItems}
          cartItems={props.cartItems}
          settoastShow={settoastShow}
          imgUrl={props.imgUrl}
          sellerName={props.sellerName}
        />
        <CartToast show={toastShow} />
      </div>
    </div>
  );
}

function ProductImage({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="mr-5 sm:grow-0 sm:shrink-0">
      <Image
        src={imgUrl}
        alt="..."
        width={500}
        height={500}
        className="rounded sm:h-64 lg:h-96 h-56 w-auto"
      />
    </div>
  );
}

function ProductDetails({ prodData }: { prodData: ProductInfo }) {
  return (
    <div>
      <div className="grid gap-2">
        <h1 className="md:text-2xl font-emberBd sm:text-xl text-lg">
          {toTitleCase(prodData.name)}
        </h1>
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
          <button className="text-blue-500 hover:underline md:text-lg text-xs sm:text-base">
            28,039 ratings
          </button>
        </div>
      </div>
      <hr className="border bg-slate-500 my-2.5" />
      <div>
        <p className="md:text-2xl text-lg sm:text-xl my-2">
          ₹{prodData.price?.toLocaleString()}
        </p>
        <div className="flex gap-2 text-slate-600 md:text-lg text-sm sm:text-base">
          M.R.P:{" "}
          <p className="line-through">
            {(prodData.price + 10000).toLocaleString()}
          </p>{" "}
        </div>
        <p className="text-xs sm:text-sm">Inclusive of all taxes</p>
        <p className="text-xs sm:text-sm">
          {" "}
          EMI starts at ₹1,672. No Cost EMI available
        </p>
      </div>
      <hr className="border bg-slate-500 my-2.5" />
      <div className="grid gap-2">
        <h2 className="font-emberBd">About this item</h2>
        <ul className="list-disc list-inside text-sm sm:text-base">
          {prodData.about?.map((point) => {
            return <li key={point}>{point}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

function Buybox({
  prodData,
  setcartItems,
  cartItems,
  imgUrl,
  settoastShow,
  sellerName,
}: {
  prodData: ProductInfo;
  setcartItems: Dispatch<SetStateAction<ProductInfo[]>>;
  cartItems: ProductInfo[];
  settoastShow: Dispatch<SetStateAction<boolean>>;
  imgUrl: string;
  sellerName: string;
}) {
  const quantityRef = useRef<any>(null);
  const today = new Date().getDate();
  const monNum = new Date().getMonth();
  return (
    <div className="p-6 flex flex-col gap-6 rounded border border-gray-400 text-sm h-fit shadow-lg min-w-[19rem]">
      <div className="flex flex-col gap-2">
        <button className="text-blue-600 hover:underline text-left">
          FREE DELIVERY
        </button>
        <p className="font-emberBd">
          {getDay(((today + 2) % 7) - 1)}, {today + 2} {getMonth(monNum)}.
        </p>
      </div>
      <p>
        Or fastest delivery Tomorrow, {getMonth(monNum)} {today + 1}. Order
        within 3 hrs 47 mins.
      </p>
      <p className="text-lg text-green-600 font-emberBd">In stock.</p>
      <p>Sold by {sellerName} and Fulfilled by Amazon</p>
      <div className="flex gap-3 items-center">
        <label htmlFor="quantity">Quantity</label>
        <select
          name="quantity"
          className="rounded py-0 pl-2 pr-0"
          ref={quantityRef}
        >
          <option value={1} className="font-emberRg">
            1
          </option>
          <option value={2} className="font-emberRg">
            2
          </option>
        </select>
      </div>
      <button
        onClick={() => {
          if (!auth.currentUser) {
            alert("Please sign in first");
            return;
          }
          setcartItems([
            ...cartItems,
            {
              name: prodData.name,
              quantity: quantityRef.current!.value,
              category: prodData.category,
              price: prodData.price,
              imgUrl: imgUrl,
            },
          ]);
          settoastShow(true);
          setTimeout(() => {
            settoastShow(false);
          }, 1500);
        }}
        className="rounded-2xl bg-[#ffd814] hover:bg-[#f7ca00] self-center w-full p-2 shadow-md"
      >
        Add to cart
      </button>
      <button
        onClick={() => {
          alert(`Total amount: ${prodData.price}`);
        }}
        className="rounded-2xl bg-[#ffa41c] hover:bg-[#fa8900] self-center w-full p-2 shadow-md"
      >
        Buy now
      </button>
    </div>
  );
}

function CartToast({ show }: { show: boolean }) {
  return (
    <Toast
      className={`absolute bg-green-500 w-fit rounded-full px-3 py-2 left-[45%] bottom-10 transition-opacity ${
        show === false ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <HiCheck className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal text-white">Added to cart</div>
    </Toast>
  );
}
