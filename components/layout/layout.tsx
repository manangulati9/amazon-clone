import Navbar from "./navbar";
import { ReactElement } from "react";
import Footer from "./footer";
export default function ({ children }: { children: ReactElement<any, any> }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
