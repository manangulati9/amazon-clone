import "../styles/globals.css";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import localFont from "@next/font/local";
import { ReactElement, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { CartItem } from "../utils/interfaces";

const emberReg = localFont({ src: "../public/fonts/AmazonEmber_Rg.ttf" });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [cartItems, setcartItems] = useState<CartItem[]>([]);
  return (
    <main className={`${emberReg.className}`}>
      {router.pathname !== "/user/sign-up" &&
      router.pathname !== "/user/login" &&
      router.pathname !== "/seller/dashboard" &&
      router.pathname !== "/seller/sign-up" &&
      router.pathname !== "/seller/login" ? (
        <Layout>
          <Component
            {...pageProps}
            cartItems={cartItems}
            setcartItems={setcartItems}
          />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </main>
  );
}
