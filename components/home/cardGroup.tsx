import React from "react";
import ProductCard from "./productCard";
export default function CardGroup() {
  return (
    <div className="flex gap-x-7 gap-y-0 flex-1 flex-wrap items-center justify-center">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
