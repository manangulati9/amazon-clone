import React from "react";
import { Footer } from "@/app/_components/Footer";
import { Navbar } from "@/app/_components/Navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-full">
      <Navbar />
      <div className="flex-grow pt-48 lg:pt-28 xs:pt-44">{children}</div>
      <Footer />
    </main>
  );
}
