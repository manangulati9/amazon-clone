import React from "react";
import { Footer } from "@/app/_components/Footer"
import { Navbar } from "@/app/_components/Navbar"
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession()
  let userData = null;

  if (session) {
    userData = await api.customer.getData()
  }

  return (
    <main className="flex flex-col h-full">
      <Navbar userData={userData} />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </main>
  )
}
