import ProductCard from "./productCard";
export default function CardGroup() {
  return (
    <div className="grid gap-4 mx-3 grid-cols-2 md:grid-cols-4">
      <ProductCard
        cat0="smartphones"
        cat1="clothing"
        cat2="watches"
        cat3="toys"
        title="Most searched categories"
      />
      <ProductCard
        cat0="air conditioners"
        cat1="microwaves"
        cat2="washing machines"
        cat3="refrigerators"
        title="Up to 65% off | Appliances for your home"
      />
      <ProductCard
        cat0="toys"
        cat1="books"
        cat2="trimmers"
        cat3="gaming accessories"
        title="Starting ₹49 | Books, toys & more"
      />
      <ProductCard
        cat0="kitchen appliances"
        cat1="cooking utensils"
        cat2="dinner sets"
        cat3="kitchen organsiser"
        title="Up to 70% off | Kitchen picks from local shops"
      />
    </div>
  );
}
