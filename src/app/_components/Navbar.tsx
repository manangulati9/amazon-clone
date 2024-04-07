'use client'
import { User } from "@prisma/client";
import { AspectRatio } from "@ui/aspect-ratio";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/popover";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@ui/sheet";
import { ChevronDown, MapPin, Menu, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

export function Navbar({ userData }: { userData: User | null }) {
  const [language, setLanguage] = useState("english")
  const { data: session, status } = useSession()
  const isSignedIn = status === "authenticated"
  const user = session?.user;
  const cartItems = 3

  return (
    <>
      <nav className="flex sticky top-0 z-10 flex-col gap-2 justify-between items-center p-4 text-xs sm:text-base lg:flex-row bg-secondary_dark text-secondary_dark-foreground h-18">

        {/* Logo and address */}
        <div className="flex gap-2 justify-between items-center w-full h-full lg:w-fit">
          <div className="flex gap-2">
            <Link href="/" className="block p-2 rounded outline-1 w-[115px] hover:outline">
              <AspectRatio ratio={16 / 5}>
                <Image src="/assets/amzn_logo_white.svg" fill alt="amzn_logo" />
              </AspectRatio>
            </Link>
            <button className="flex text-left rounded outline-1 hover:outline">
              <MapPin className="mt-4 w-5 h-5" />
              <div className="flex flex-col py-1 px-1 h-fit">
                <div className="text-xs">Hello</div>
                <div className="text-xs font-bold sm:text-sm">
                  Select Your Address
                </div>
              </div>
            </button>
          </div>
          <Sheet>
            <SheetTrigger>
              <Menu className="lg:hidden h-6 w-6 self-center" />
            </SheetTrigger>
            <SheetContent>
              <div>
                <h3>All categories</h3>

              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Searchbar */}
        <div className="flex flex-grow w-full h-10 rounded text-foreground lg:w-fit">
          <Select>
            <SelectTrigger className="bg-background/80 text-xs text-nowrap focus-visible:ring-offset-0 w-fit border-r border-muted/10 rounded-r-none [&>span]:line-clamp-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {SEARCH_BAR_CATEGORIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input className="rounded-none focus-visible:ring-offset-0" />
          <button
            className="px-3 rounded-r bg-primary_light hover:bg-primary_light/90"
            type="submit"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2 justify-between w-full h-full lg:w-fit">

          {/* Language select */}
          <Popover>
            <PopoverTrigger className="flex gap-1 items-center h-full rounded outline-1 border-background hover:outline">
              <Image src="/assets/flag.png" alt="" height={40} width={40} className="w-6 h-4" />
              <div className="flex items-center">
                <span className="text-sm font-bold">{language.slice(0, 3).toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <RadioGroup value={language} onValueChange={setLanguage} >
                {LANGUAGE_OPTIONS.map(item => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label htmlFor={item.value}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </PopoverContent>
          </Popover>

          {/* Sign in button */}
          <Popover>
            <PopoverTrigger className="flex px-1 text-left rounded outline-1 hover:outline">
              <div className="flex flex-col py-1 px-1 h-fit">
                <div className="text-xs">
                  {isSignedIn ? `Hi, ${user?.name?.split(" ")[0]}` : "Hello, sign in"}
                </div>
                <div className="flex items-center text-xs font-bold sm:text-sm">
                  Account &amp; lists
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="text-nowrap w-fit">
              <div className="p-2 space-y-2 text-xs">
                <div className="flex flex-col gap-2 justify-center items-center">
                  {!isSignedIn ? (
                    <div className="flex flex-col w-full gap-2 justify-center items-center">
                      <Link className={buttonVariants({
                        variant: "default",
                        className: "w-full h-8"
                      })} href="/auth/login">
                        Sign in
                      </Link>
                      <p>
                        New user?{" "}
                        <Link
                          href="/auth/sign-up"
                          className="text-blue-600 hover:underline"
                        >
                          Start here
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <Button onClick={async () => await signOut()} className="w-full">
                      Sign out
                    </Button>
                  )}
                </div>
                <Separator className="h-[2px] bg-muted/10" />
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-emberBd">Your lists</h3>
                    <Link
                      href=""
                      className="block hover:underline"
                    >
                      Create a Wish List
                    </Link>
                    <Link
                      href=""
                      className="block hover:underline"
                    >
                      Wishlist
                    </Link>
                    <Link
                      href=""
                      className="block hover:underline"
                    >
                      Baby Wishlist
                    </Link>
                    <Link
                      href=""
                      className="block hover:underline"
                    >
                      Discover Your Style
                    </Link>
                    <Link
                      href=""
                      className="block hover:underline"
                    >
                      Explore Showroom
                    </Link>
                  </div>
                  <div className="border border-muted/10 mx-4" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-emberBd">Your Account</h3>
                    <Link
                      href={
                        userData?.type === "CUSTOMER" ? "/user/dashboard" : "/seller/dashboard"
                      }
                      className="block text-xs hover:underline"
                    >
                      Your Account
                    </Link>
                    <Link
                      href=""
                      className="block text-xs hover:underline"
                    >
                      Your Orders
                    </Link>
                    <Link
                      href=""
                      className="block text-xs hover:underline"
                    >
                      Your Wish List
                    </Link>
                    <Link
                      href=""
                      className="block text-xs hover:underline"
                    >
                      Your Recommendations
                    </Link>
                    <Link
                      href=""
                      className="block text-xs hover:underline"
                    >
                      Your Prime Membership
                    </Link>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Return and orders */}
          <button className="flex flex-col py-1 px-2 text-left rounded outline-1 hover:outline">
            <div className="text-xs">Returns</div>
            <div className="text-xs font-bold sm:text-sm">&amp; Orders</div>
          </button>

          {/* Cart button */}
          <Link
            href="/cart"
            className="flex relative gap-2 justify-between items-end py-1 px-2 outline-1 rounded-[2px] hover:outline"
          >
            <span className="absolute font-bold text-orange-500 left-[1.6rem] top-2 md:top-0 h-fit">
              {cartItems}
            </span>
            <Image src="/assets/cart.png" height={50} width={50} className="self-center w-auto h-8" alt="cart" />
            <div className="self-end text-xs font-bold sm:text-sm">Cart</div>
          </Link>
        </div>
      </nav >

      {/* Secondary navbar */}
      < div className="hidden flex-wrap justify-around py-1 px-3 lg:flex bg-secondary text-secondary-foreground" >
        <button className="flex gap-1 items-center py-1 px-2 text-xs font-bold rounded sm:text-sm outline-1 hover:outline">
          <Menu className="w-4 h-4" />
          <span>All</span>
        </button>
        {
          NAVBAR_ITEMS.map((item) => (
            <button key={item} className="py-1 px-2 text-xs rounded sm:text-sm outline-1 hover:outline">
              {item}
            </button>
          ))
        }
      </div >
    </>
  );
}

const SEARCH_BAR_CATEGORIES = [
  { value: "alexaSkills", label: "Alexa Skills" },
  { value: "amazonDevices", label: "Amazon Devices" },
  { value: "amazonFashion", label: "Amazon Fashion" },
  { value: "amazonFresh", label: "Amazon Fresh" },
  { value: "amazonPharmacy", label: "Amazon Pharmacy" },
  { value: "appliances", label: "Appliances" },
  { value: "apps&Games", label: "Apps & Games" },
  { value: "baby", label: "Baby" },
  { value: "beauty", label: "Beauty" },
  { value: "books", label: "Books" },
  { value: "car&Motorbike", label: "Car & Motorbike" },
  { value: "clothing&Accessories", label: "Clothing & Accessories" },
  { value: "collectibles", label: "Collectibles" },
  { value: "computers&Accessories", label: "Computers & Accessories" },
  { value: "deals", label: "Deals" },
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "garden&Outdoors", label: "Garden & Outdoors" },
  { value: "giftCards", label: "Gift Cards" },
  { value: "grocery&GourmetFoods", label: "Grocery & Gourmet Foods" },
  { value: "health&PersonalCare", label: "Health & Personal Care" },
  { value: "home&Kitchen", label: "Home & Kitchen" },
  { value: "industrial&Scientific", label: "Industrial & Scientific" },
  { value: "jewellery", label: "Jewellery" },
  { value: "kindleStore", label: "Kindle Store" },
  { value: "luggage&Bags", label: "Luggage & Bags" },
  { value: "luxuryBeauty", label: "Luxury Beauty" },
  { value: "movies&TVShows", label: "Movies & TV Shows" },
  { value: "music", label: "Music" },
  { value: "musicalInstruments", label: "Musical Instruments" },
  { value: "officeProducts", label: "Office Products" },
  { value: "petSupplies", label: "Pet Supplies" },
  { value: "primeVideo", label: "Prime Video" },
  { value: "shoes&Handbags", label: "Shoes & Handbags" },
  { value: "software", label: "Software" },
  { value: "sportsFitness&Outdoors", label: "Sports, Fitness & Outdoors" },
  { value: "subscribe&Save", label: "Subscribe & Save" },
  { value: "tools&HomeImprovement", label: "Tools & Home Improvement" },
  { value: "toys&Games", label: "Toys & Games" },
  { value: "under500", label: "Under ₹500" },
  { value: "videoGames", label: "Video Games" },
  { value: "watches", label: "Watches" },
];

const NAVBAR_ITEMS = [
  "Amazon miniTV",
  "Sell",
  "Best Sellers",
  "Mobiles",
  "Today's Deals",
  "Customer Service",
  "Electronics",
  "Prime",
  "Fashion",
  "Amazon Pay",
  "Home & Kitchen",
  "New Releases",
  "Computers",
  "Beauty & Personal Care",
  "Books",
];

const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "bengali", label: "Bengali" },
  { value: "malayalam", label: "Malayalam" },
  { value: "telugu", label: "Telugu" },
];
