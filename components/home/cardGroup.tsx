import React from "react";
import ProductCard from "./productCard";
export default function CardGroup({}) {
  return (
    <div className="flex gap-7 flex-1 ">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
