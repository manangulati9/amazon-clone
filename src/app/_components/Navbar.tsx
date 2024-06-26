"use client";

import { AspectRatio } from "@ui/aspect-ratio";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@ui/sheet";
import { ChevronDown, MapPin, Menu, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { type FormEvent, useState } from "react";
import { Button, buttonVariants } from "@ui/button";
import { Separator } from "@ui/separator";
import {
  LANGUAGE_OPTIONS,
  NAVBAR_ITEMS,
  POPOVER_LINK_ITEMS,
  PRODUCT_CATEGORIES,
} from "@/lib/data/navbar";
import { useStore } from "@/lib/StoreProvider";
import { getBaseUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { type User } from "@prisma/client";

export function Navbar({ user }: { user: User | null }) {
  const [language, setLanguage] = useState("english");
  const { cartItems } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const isSignedIn = !!user;
  const popover_index = user ? user.type : "CUSTOMER";
  const [categorySelect, setCategorySelect] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const baseURL = getBaseUrl();

    const searchParams = new URLSearchParams();
    searchParams.append("query", query);

    if (categorySelect) searchParams.append("category", categorySelect);

    const redirectURL = `${baseURL}/search?` + searchParams.toString();

    router.push(redirectURL);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/login" });
    localStorage.removeItem("cartItems");
  };

  return (
    <div className="fixed z-50 w-full h-48 lg:h-28 xs:h-44">
      <nav className="flex flex-col gap-2 justify-between items-center p-4 text-xs sm:text-base lg:flex-row bg-secondary_dark text-secondary_dark-foreground">
        {/* Logo and address */}
        <div className="flex gap-2 justify-between items-center w-full h-full lg:w-fit">
          <div className="flex gap-2">
            <Link
              href="/"
              className="block p-2 rounded outline-1 w-[115px] hover:outline"
            >
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
              <Menu className="self-center w-6 h-6 lg:hidden" />
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-4 text-sm">
                <h3 className="text-2xl font-bold">
                  {isSignedIn
                    ? `Hi, ${user?.name?.split(" ")[0]}`
                    : "Hello, sign in"}
                </h3>
                <div className="space-y-2">
                  <h3 className="text-base font-bold">Categories</h3>
                  <div className="space-y-1">
                    {PRODUCT_CATEGORIES.slice(0, 15).map((cat) => (
                      <p key={cat.value}>{cat.label}</p>
                    ))}
                  </div>
                </div>
                {isSignedIn ? (
                  <Button onClick={handleSignOut} className="w-full">
                    Sign out
                  </Button>
                ) : (
                  <Link
                    className={buttonVariants({
                      variant: "default",
                      className: "w-full h-8",
                    })}
                    href="/auth/login"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Searchbar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-grow w-full h-10 rounded text-foreground lg:w-fit"
        >
          <Select value={categorySelect} onValueChange={setCategorySelect}>
            <SelectTrigger className="bg-background/80 text-xs text-nowrap focus-visible:ring-offset-0 w-fit border-r border-muted/10 rounded-r-none [&>span]:line-clamp-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-none focus-visible:ring-offset-0"
            placeholder="Search products..."
          />
          <button
            className="px-3 rounded-r bg-primary_light hover:bg-primary_light/90"
            type="submit"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>

        <div className="flex gap-2 justify-between w-full h-full lg:w-fit">
          {/* Language select */}
          <Popover>
            <PopoverTrigger className="flex gap-1 items-center rounded group outline-1 border-background hover:outline">
              <Image
                src="/assets/flag.png"
                alt=""
                height={40}
                width={40}
                className="w-6 h-4"
              />
              <div className="flex items-center">
                <span className="text-sm font-bold">
                  {language.slice(0, 3).toUpperCase()}
                </span>
                <ChevronDown className="w-4 h-4 transition-all group-hover:rotate-180" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <RadioGroup value={language} onValueChange={setLanguage}>
                {LANGUAGE_OPTIONS.map((item) => (
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
            <PopoverTrigger className="flex px-1 text-left rounded outline-1 group hover:outline">
              <div className="flex flex-col py-1 px-1 h-fit">
                <div className="text-xs">
                  {isSignedIn
                    ? `Hi, ${user?.name?.split(" ")[0]}`
                    : "Hello, sign in"}
                </div>
                <div className="flex items-center text-xs font-bold sm:text-sm">
                  Account &amp; lists
                  <ChevronDown className="w-4 h-4 transition-all group-hover:rotate-180" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="text-nowrap w-fit">
              <div className="p-2 space-y-2 text-xs">
                <div className="flex flex-col gap-2 justify-center items-center">
                  {!isSignedIn ? (
                    <div className="flex flex-col gap-2 justify-center items-center w-full">
                      <Link
                        className={buttonVariants({
                          variant: "default",
                          className: "w-full h-8",
                        })}
                        href="/auth/login"
                      >
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
                    <Button onClick={handleSignOut} className="w-full">
                      Sign out
                    </Button>
                  )}
                </div>
                <Separator className="h-[2px] bg-muted/10" />
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base">
                      {POPOVER_LINK_ITEMS[popover_index][0]?.title}
                    </h3>
                    {POPOVER_LINK_ITEMS[popover_index][0]?.items.map((item) => (
                      <Link
                        href={item.href}
                        key={item.href}
                        className="block hover:underline"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mx-4 border border-muted/10" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base">
                      {POPOVER_LINK_ITEMS[popover_index][1]?.title}
                    </h3>
                    {POPOVER_LINK_ITEMS[popover_index][1]?.items.map((item) => (
                      <Link
                        href={item.href}
                        key={item.href}
                        className="block text-xs hover:underline"
                      >
                        {item.label}
                      </Link>
                    ))}
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
            href="/checkout"
            className="flex relative gap-2 justify-between items-end py-1 px-2 outline-1 rounded-[2px] hover:outline"
          >
            <span className="absolute top-2 font-bold text-orange-500 xs:top-0 left-[1.6rem] h-fit">
              {cartItems.length}
            </span>
            <Image
              src="/assets/cart.png"
              height={50}
              width={50}
              className="self-center w-auto h-8"
              alt="cart"
            />
            <div className="self-end text-xs font-bold sm:text-sm">Cart</div>
          </Link>
        </div>
      </nav>

      {/* Secondary navbar */}
      <div className="hidden flex-wrap justify-around py-1 px-3 lg:flex bg-secondary text-secondary-foreground">
        <button className="flex gap-1 items-center py-1 px-2 text-xs font-bold rounded sm:text-sm outline-1 hover:outline">
          <Menu className="w-4 h-4" />
          <span>All</span>
        </button>
        {NAVBAR_ITEMS.map((item) => (
          <button
            key={item}
            className="py-1 px-2 text-xs rounded sm:text-sm outline-1 hover:outline"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
