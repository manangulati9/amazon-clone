import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import localFont from 'next/font/local'
import { AuthProvider } from "@/lib/AuthProvider";
import { getServerAuthSession } from "@/server/auth";

const ember = localFont({
  src: [
    {
      path: '../../public/AmazonEmber_Lt.ttf',
      weight: '100'
    },
    {
      path: '../../public/AmazonEmber_Rg.ttf',
      weight: '400'
    },
    {
      path: '../../public/AmazonEmber_Bd.ttf',
      weight: '700'
    },
  ],
  display: 'swap',
  variable: '--font-ember'
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Amazon Clone",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className={`h-screen ${inter.variable} ${ember.variable} ${ember.className}`}>
        <AuthProvider session={session}>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
