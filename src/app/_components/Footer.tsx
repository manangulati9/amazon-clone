import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="text-background">
      <Link href="#" className="block py-3 text-sm text-center align-bottom bg-muted hover:bg-muted/90">Back to top</Link>
      <div className="bg-secondary grid place-content-center">
        <div className="grid grid-cols-2 md:flex gap-4 py-4 px-4 md:px-8 bg-secondary">
          <div className="px-2 md:px-8">
            <h2 className="font-bold">Get To Know Us</h2>
            <Link
              href="#"
              className="block text-sm hover:underline text-muted-foreground"
            >
              About Us
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Careers
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Press Releases
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Amazon Science
            </Link>
          </div>
          <div className="px-2 md:px-8">
            <h2 className="font-bold">Connect with Us</h2>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Facebook
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Twitter
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Instagram
            </Link>
          </div>
          <div className="px-2 md:px-8">
            <h2 className="font-bold">Make Money with Us</h2>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Sell on Amazon
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Sell under Amazon Accelerator
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Protect and Build Your Brand
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Amazon Global Selling
            </Link>
          </div>
          <div className="px-2 md:px-8">
            <h2 className="font-bold">Let Us Help You</h2>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              COVID-19 and Amazon
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Your Account
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              Returns Centre
            </Link>
            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href="#"
            >
              100% Purchase Protection
            </Link>
          </div>
        </div>
      </div>
      <div className="py-3 text-center bg-secondary_dark">
        <div className="flex gap-4 justify-center mb-1">
          <Link
            className="text-xs hover:underline"
            href="#"
          >
            Conditions of Use & Sale
          </Link>
          <Link
            className="text-xs hover:underline"
            href="#"
          >
            Privacy Notice
          </Link>
          <Link
            className="text-xs hover:underline"
            href="#"
          >
            Interest-Based Ads
          </Link>
        </div>
        <p className="text-xs">
          @ 1996-{new Date().getFullYear()} Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer >
  );
}
