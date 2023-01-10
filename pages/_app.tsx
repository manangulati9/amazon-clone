import "../styles/globals.css";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import localFont from "@next/font/local";
import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
const emberReg = localFont({ src: "../public/fonts/AmazonEmber_Rg.ttf" });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  return (
    <main className={`${emberReg.className}`}>
      {router.pathname !== "/user/sign-up" &&
      router.pathname !== "/user/login" &&
      router.pathname !== "/seller/dashboard" &&
      router.pathname !== "/seller/login" ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </main>
  );
}
