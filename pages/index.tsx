import CardGroup from "../components/home/cardGroup";
import Head from "next/head";
import TodaysDeals from "../components/home/todaysDeals";
import Carousel from "../components/home/carousel";
import Script from "next/script";
import { GetStaticProps } from "next";
import { handleNavSearch } from "../utils/functions";
import { ProductInfo } from "../utils/interfaces";

export const getStaticProps: GetStaticProps = async () => {
  const smartphones = await handleNavSearch("smartphones");
  const watches = await handleNavSearch("watches");
  return {
    props: {
      smartphones,
      watches,
    },
  };
};

export default function Home(props: {
  smartphones: ProductInfo[];
  watches: ProductInfo[];
}) {
  return (
    <>
      <Head>
        <title>AmazonClone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js" />
      <Carousel />
      <main className="flex flex-1 flex-col items-center xl:mt-64 mb-4 mt-20 sm:mt-32 md:mt-52 bg-gray-200">
        <CardGroup />
        <TodaysDeals prods={props.smartphones.slice(0, 6)} />
        <CardGroup />
        <TodaysDeals prods={props.watches.slice(0, 6)} />
      </main>
    </>
  );
}
