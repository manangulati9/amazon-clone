import React from "react";
import ProductCard from "./productCard";
export default function CardGroup() {
  return (
    <div className="flex gap-4 mx-3 flex-1 items-stretch flex-wrap justify-center sm:flex-nowrap">
      <ProductCard
        cat1="smartphones"
        cat2="clothing"
        cat3="watches"
        cat4="toys"
        title="Most searched categories"
      />
      <ProductCard
        cat1="air conditioners"
        cat2="microwaves"
        cat3="washing machines"
        cat4="refrigerators"
        title="Up to 65% off | Appliances for your home"
      />
      <ProductCard
        cat1="toys"
        cat2="books"
        cat3="trimmers"
        cat4="gaming accessories"
        title="Starting ₹49 | Books, toys & more"
      />
      <ProductCard
        cat1="kitchen appliances"
        cat2="cooking utensils"
        cat3="dinner sets"
        cat4="kitchen organsiser"
        title="Up to 70% off | Kitchen picks from local shops"
      />
    </div>
  );
}
