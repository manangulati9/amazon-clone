import { handleAuthChange } from "../../utils/functions";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import amazonLogo from "../../public/assets/navbar/amazon_logo.png";
import indiaFlag from "../../public/assets/navbar/Flag_of_India.png";
import cart from "../../public/assets/navbar/cart.png";
import searchIcon from "../../public/assets/navbar/search.png";
import Link from "next/link";
import { Tooltip } from "flowbite-react";
import { HiChevronDown } from "react-icons/hi";
import { BiMap } from "react-icons/bi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getUserData } from "../../utils/functions";
import { NavSearch, UserInterface } from "../../utils/interfaces";
import { useRouter } from "next/router";
import { Url } from "url";
export default function Navbar({ cartItems }: { cartItems: number }) {
  return (
    <>
      <nav className="lg:flex bg-amznDarkBlue text-white gap-2 justify-around items-center p-2">
        <Logo_Address />
        <Searchbar />
        <SignIn_Cart cartItems={cartItems} />
      </nav>
      <Nav2 />
    </>
  );
}

function Logo_Address() {
  return (
    <div className="flex justify-between gap-7 items-center">
      <div className="hover:outline outline-1 rounded-[2px] p-2">
        <Link href="/">
          <Image src={amazonLogo} className="h-8 w-auto" alt="amzn_logo" />
        </Link>
      </div>
      <button className="text-left flex hover:outline outline-1 rounded-[2px] px-1">
        <BiMap className="text-xl mt-4" />
        <div className="flex flex-col h-fit  py-1 px-1">
          <div className="text-xs">Hello</div>
          <div className="font-emberBd text-sm">Select Your Address</div>
        </div>
      </button>
    </div>
  );
}

function Searchbar() {
  const formRef = useRef<any>(null);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const searchQuery = (
          (e.target as HTMLFormElement).elements as NavSearch
        ).search.value;
        if (searchQuery) {
          const url = `/results/${searchQuery}` as unknown as Url;
          router.push(url);
          formRef.current.reset();
        } else {
          alert("Please enter a valid category");
        }
      }}
      className="flex text-black h-10 lg:m-0 my-2 lg:w-[44rem] w-full focus-within:outline outline-[3px] outline-orange-400 rounded"
      ref={formRef}
    >
      <select
        name="search_in"
        className={`w-20 font-emberRg rounded-l bg-[#f3f3f3] hover:bg-[#dadada] text-xs border-r border-gray-400 focus:border-orange-400 focus:border-r-[3px]`}
      >
        <option value="all" className="text-sm">
          All
        </option>
        <option value="alexaSkills" className="text-sm">
          Alexa Skills
        </option>
        <option value="amazonDevices" className="text-sm">
          Amazon Devices
        </option>
        <option value="amazonFashion" className="text-sm">
          Amazon Fashion
        </option>
        <option value="amazonFresh" className="text-sm">
          Amazon Fresh
        </option>
        <option value="amazonPharmacy" className="text-sm">
          Amazon Pharmacy
        </option>
        <option value="appliances" className="text-sm">
          Appliances
        </option>
        <option value="apps&Games" className="text-sm">
          Apps & Games
        </option>
        <option value="baby" className="text-sm">
          Baby
        </option>
        <option value="beauty" className="text-sm">
          Beauty
        </option>
        <option value="books" className="text-sm">
          Books
        </option>
        <option value="car&Motorbike" className="text-sm">
          Car & Motorbike
        </option>
        <option value="clothing&Accessories" className="text-sm">
          Clothing & Accessories
        </option>
        <option value="collectibles" className="text-sm">
          Collectibles
        </option>
        <option value="computers&Accessories" className="text-sm">
          Computers & Accessories
        </option>
        <option value="deals" className="text-sm">
          Deals
        </option>
        <option value="electronics" className="text-sm">
          Electronics
        </option>
        <option value="furniture" className="text-sm">
          Furniture
        </option>
        <option value="garden&Outdoors" className="text-sm">
          Garden & Outdoors
        </option>
        <option value="giftCards" className="text-sm">
          Gift Cards
        </option>
        <option value="grocery&GourmetFoods" className="text-sm">
          Grocery & Gourmet Foods
        </option>
        <option value="health&PersonalCare" className="text-sm">
          Health & Personal Care
        </option>
        <option value="home&Kitchen" className="text-sm">
          Home & Kitchen
        </option>
        <option value="industrial&Scientific" className="text-sm">
          Industrial & Scientific
        </option>
        <option value="jewellery" className="text-sm">
          Jewellery
        </option>
        <option value="kindleStore" className="text-sm">
          Kindle Store
        </option>
        <option value="luggage&Bags" className="text-sm">
          Luggage & Bags
        </option>
        <option value="luxuryBeauty" className="text-sm">
          Luxury Beauty
        </option>
        <option value="movies&TVShows" className="text-sm">
          Movies & TV Shows
        </option>
        <option value="music" className="text-sm">
          Music
        </option>
        <option value="musicalInstruments" className="text-sm">
          Musical Instruments
        </option>
        <option value="officeProducts" className="text-sm">
          Office Products
        </option>
        <option value="petSupplies" className="text-sm">
          Pet Supplies
        </option>
        <option value="primeVideo" className="text-sm">
          Prime Video
        </option>
        <option value="shoes&Handbags" className="text-sm">
          Shoes & Handbags
        </option>
        <option value="software" className="text-sm">
          Software
        </option>
        <option value="sportsFitness&Outdoors" className="text-sm">
          Sports, Fitness & Outdoors
        </option>
        <option value="subscribe&Save" className="text-sm">
          Subscribe & Save
        </option>
        <option value="tools&HomeImprovement" className="text-sm">
          Tools & Home Improvement
        </option>
        <option value="toys&Games" className="text-sm">
          Toys & Games
        </option>
        <option value="under500" className="text-sm">
          Under ₹500
        </option>
        <option value="videoGames" className="text-sm">
          Video Games
        </option>
        <option value="watches" className="text-sm">
          Watches
        </option>
      </select>
      <input
        className="w-full px-2 focus:outline-none"
        type="search"
        name="search"
      />
      <button
        className="bg-amznOrange-50 hover:bg-amznOrange-100 px-3 rounded-r shrink-0"
        type="submit"
      >
        <Image src={searchIcon} alt="searchIcon" className="w-6" quality={10} />
      </button>
    </form>
  );
}

function SignIn_Cart({ cartItems }: { cartItems: number }) {
  const [user, setuser] = useState("");
  const [usrType, setusrType] = useState("");
  onAuthStateChanged(auth, async (user) => {
    const usrData = await handleAuthChange(user);
    setuser(usrData ? usrData.firstName : "");
    setusrType(usrData ? usrData.usertype : "");
    let userSessionTimeout = null;
    if (user && userSessionTimeout === null) {
      user.getIdTokenResult().then((idTokenResult) => {
        const authTime = parseInt(idTokenResult.claims.auth_time!) * 1000;
        const sessionDurationInMilliseconds = 60 * 60 * 2000; // 120 min
        const expirationInMilliseconds =
          sessionDurationInMilliseconds - (Date.now() - authTime);
        userSessionTimeout = setTimeout(
          () => auth.signOut(),
          expirationInMilliseconds
        );
      });
    } else if (userSessionTimeout) {
      clearTimeout(userSessionTimeout);
      userSessionTimeout = null;
    }
  });
  return (
    <div className="flex justify-around h-fit gap-5 lg:pt-0 items-center">
      <Tooltip
        content={<LanguageSelectModal />}
        placement="bottom"
        style="light"
      >
        <button className="gap-2 items-center hover:outline outline-1 rounded-[2px] pt-4 px-2 min-[450px]:flex hidden">
          <Image src={indiaFlag} alt="flag" className="w-auto h-3 " />
          <div className="flex gap-1 font-emberBd text-sm">
            EN
            <HiChevronDown className="mt-1" />
          </div>
        </button>
      </Tooltip>
      <Tooltip
        content={<SignInModal usertype={usrType} />}
        placement="bottom"
        style="light"
      >
        <button className="flex flex-col text-left hover:outline outline-1 rounded-[2px] py-1 px-2">
          <div className="text-xs">{`Hello, ${
            user ? user.charAt(0).toUpperCase() + user.slice(1) : "Sign in"
          }`}</div>
          <div className=" flex gap-1 font-emberBd text-sm">
            Account & Lists <HiChevronDown className="mt-1" />
          </div>
        </button>
      </Tooltip>
      <button className="flex flex-col hover:outline text-left outline-1 rounded-[2px] py-1 px-2">
        <div className="text-xs">Returns</div>
        <div className="font-emberBd text-sm">& Orders</div>
      </button>
      <Link href="/cart" className="flex gap-2 w-fit">
        <span className="text-orange-500 font-emberBd relative h-fit right-[-2.6rem] bottom-[0.3rem]">
          {cartItems}
        </span>
        <div className="hover:outline outline-1 rounded-[2px] flex gap-2 py-1 px-2">
          <div>
            <Image src={cart} className="w-auto h-8 self-center" alt="cart" />
          </div>
          <div className="font-emberBd text-sm h-fit self-end">Cart</div>
        </div>
      </Link>
    </div>
  );
}

function Nav2() {
  return (
    <nav className="md:flex justify-around bg-[#232f3e] text-white px-3 py-1 hidden text-wrap">
      <button className="hover:outline outline-1 rounded-[2px] flex gap-2 items-center px-2">
        <div className="flex flex-col gap-1">
          <hr className="bg-white w-4 h-[0.1rem]" />
          <hr className="bg-white w-4 h-[0.1rem]" />
          <hr className="bg-white w-4 h-[0.1rem]" />
        </div>
        <p className="font-emberBd">All</p>
      </button>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Amazon miniTV{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Sell{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Best Sellers
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Mobiles{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Today's Deals{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Customer Service{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Electronics{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Prime{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Fashion{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Amazon Pay{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Home & Kitchen{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        New Releases{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Books{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Computers{" "}
      </Link>
      <Link
        href=""
        className="hover:outline outline-1 block rounded-[2px] py-1 px-2 text-sm"
      >
        Beauty & Personal Care
      </Link>
    </nav>
  );
}

function SignInModal({ usertype }: { usertype: string }) {
  const [userType, setuserType] = useState("customer");
  useEffect(() => {
    (async () => {
      const userData = (await getUserData()) as UserInterface;
      if (userData) setuserType(userData.usertype);
    })();
  });
  return (
    <div className="flex flex-col gap-2 text-emberRg text-xs w-[28rem] text-black p-2">
      <div className="flex flex-col justify-center items-center gap-2 ">
        {auth.currentUser === null ? (
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <Link href="/user/login">
                <button className="bg-gradient-to-t from-yellow-300 to-yellow-100  rounded hover:to-yellow-200 w-48 py-1.5 border-orange-300 border text-sm">
                  Sign in as customer
                </button>
              </Link>
              <Link href="/seller/login">
                <button className="bg-gradient-to-t from-yellow-300 to-yellow-100  rounded hover:to-yellow-200 w-48 py-1.5 border-orange-300 border text-sm">
                  Sign in as seller
                </button>
              </Link>
            </div>
            <p>
              New Customer?{" "}
              <Link
                href="/user/sign-up"
                className="text-blue-600 hover:underline"
              >
                Start here
              </Link>
            </p>
          </div>
        ) : (
          <button
            onClick={async () => {
              try {
                await signOut(auth);
              } catch (error) {
                alert("An error has occured");
                console.log(error);
              }
            }}
            className="bg-gradient-to-t from-yellow-300 to-yellow-100  rounded hover:to-yellow-200 w-48 py-1.5 border-orange-300 border text-sm"
          >
            Sign out
          </button>
        )}
      </div>
      <div className="bg-gray-400 border"></div>
      <div className="flex justify-around gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-emberBd mb-2 text-base">Your lists</h3>
          <Link
            href=""
            className="hover:underline hover:text-amznOrange-100 block"
          >
            Create a Wish List
          </Link>
          <Link
            href=""
            className="hover:underline hover:text-amznOrange-100 block"
          >
            Wish from Any Website
          </Link>
          <Link
            href=""
            className="hover:underline hover:text-amznOrange-100 block"
          >
            Baby Wishlist
          </Link>
          <Link
            href=""
            className="hover:underline hover:text-amznOrange-100 block"
          >
            Discover Your Style
          </Link>
          <Link
            href=""
            className="hover:underline hover:text-amznOrange-100 block"
          >
            Explore Showroom
          </Link>
        </div>
        <div className="bg-gray-400 border ml-10"></div>
        <div className="flex flex-col gap-2 ">
          <h3 className="font-emberBd mb-1 text-base">Your Account</h3>
          <Link
            href={
              userType === "customer" ? "/user/dashboard" : "/seller/dashboard"
            }
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Account
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Orders
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Wish List
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Recommendations
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Prime Membership
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Prime Video
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Subscribe & Save Items
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Memberships & Subscriptions
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Amazon Business Account
          </Link>
          <Link
            href="/seller/dashboard"
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Your Seller Account
          </Link>
          <Link
            href={usertype === "seller" ? "/seller/dashboard" : "/seller/login"}
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Manage Your Content and
          </Link>
          <Link
            href=""
            className="block text-xs hover:underline hover:text-amznOrange-100"
          >
            Devices
          </Link>
        </div>
      </div>
    </div>
  );
}

function LanguageSelectModal() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <form action="" method="post">
        <div className="flex gap-2">
          <input type="radio" id="english" name="language" value="english" />
          <label htmlFor="english">English</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="hindi" name="language" value="hindi" />
          <label htmlFor="hindi">Hindi</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="tamil" name="language" value="tamil" />
          <label htmlFor="tamil">Tamil</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="telugu" name="language" value="telugu" />
          <label htmlFor="telugu">Telugu</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="kannada" name="language" value="kannada" />
          <label htmlFor="kannada">Kannada</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="malyalam" name="language" value="malyalam" />
          <label htmlFor="malyalam">Malyalam</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="bengali" name="language" value="bengali" />
          <label htmlFor="bengali">Bengali</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="marathi" name="language" value="marathi" />
          <label htmlFor="marathi">Marathi</label>
        </div>
      </form>
      <Link href="" className="text-xs text-blue-500 hover:underline">
        Learn more
      </Link>
      <div className="bg-gray-500 border"></div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <Image src={indiaFlag} alt="flag" className="w-auto h-3 " />
          <p>You're shopping on AmazonClone.in</p>
        </div>
        <Link href="" className="text-xs text-blue-500 hover:underline">
          Change country/region
        </Link>
      </div>
    </div>
  );
}
