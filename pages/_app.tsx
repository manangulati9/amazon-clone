import "../styles/globals.css";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { ProductInfo } from "../utils/interfaces";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [cartItems, setcartItems] = useState<ProductInfo[]>([]);
  const routes = [
    "/user/sign-up",
    "/user/login",
    "/seller/dashboard",
    "/seller/sign-up",
    "/seller/login",
  ];
  const currentRoute = router.pathname;
  return (
    <>
      <Head>
        <title>AmazonClone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-emberRg">
        {!routes.includes(currentRoute) ? (
          <Layout cartItems={cartItems.length}>
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
    </>
  );
}
