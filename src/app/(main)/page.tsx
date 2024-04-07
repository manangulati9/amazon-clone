import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  return <div>Hello world</div>
}
