import CardGroup from "../components/home/cardGroup";
import TodaysDeals from "../components/home/todaysDeals";
import Carousel from "../components/home/carousel";
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
    <div>
      <Carousel />
      <div className="flex flex-1 flex-col items-center bg-transparent p-3 gap-2 relative bottom-20 sm:bottom-28 md:bottom-[21rem]">
        <CardGroup />
        <TodaysDeals prods={props.smartphones.slice(0, 6)} />
        <CardGroup />
        <TodaysDeals prods={props.watches.slice(0, 6)} />
      </div>
    </div>
  );
}
