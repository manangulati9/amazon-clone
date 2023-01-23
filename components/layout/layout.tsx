import Navbar from "./navbar";
import { ReactElement } from "react";
import Footer from "./footer";
export default function ({
  children,
  cartItems,
}: {
  children: ReactElement<any, any>;
  cartItems: number;
}) {
  return (
    <>
      <Navbar cartItems={cartItems} />
      {children}
      <Footer />
    </>
  );
}
