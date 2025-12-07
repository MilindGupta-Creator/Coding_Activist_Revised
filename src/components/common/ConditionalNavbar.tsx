"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();
  
  // Don't render navbar on /product route
  if (pathname === "/product") {
    return null;
  }
  
  return (
    <section className="fixed top-0 w-full z-50">
      <Navbar />
    </section>
  );
};

export default ConditionalNavbar;

