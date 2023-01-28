import CardGroup from "../components/home/cardGroup";
import TodaysDeals from "../components/home/todaysDeals";
import Carousel from "../components/home/carousel";
import { GetStaticProps } from "next";
import { handleNavSearch } from "../utils/functions";
import { ProductInfo } from "../utils/interfaces";

export const getStaticProps: GetStaticProps = async () => {
  const [smartphones, watches] = await Promise.all([
    handleNavSearch("smartphones"),
    handleNavSearch("watches"),
  ]);
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
    <div>
      <Carousel />
      <div className="flex flex-col items-center bg-transparent relative p-3 gap-2 -mt-[1.5rem] z-10 sm:-mt[8.5rem] lg:-mt-[17.5rem] md:-mt-[2.5rem]">
        <CardGroup />
        <TodaysDeals prods={props.smartphones.slice(0, 6)} />
        <CardGroup />
        <TodaysDeals prods={props.watches.slice(0, 6)} />
      </div>
    </div>
  );
}
