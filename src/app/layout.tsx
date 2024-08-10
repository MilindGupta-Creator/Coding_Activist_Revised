import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import BottomBar from "@/components/common/BottomBar";
import Blur from "../../public/assets/blur-23.png";
import Image from "next/image";
import _ from "lodash";
import EmailPopUp from "@/components/common/EmailPopUp";
import { Toaster } from "react-hot-toast";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Coding Activist | Jobs for Freshers</title>
      </head>
      <body
        className={`${inter.className} relative bg-[#2C2B2B] bg-hero text-white bg-contain bg-no-repeat`}
      >
        <section className="fixed top-0 w-full z-10">
          <Navbar />
        </section>
        {children}
        <EmailPopUp />
        <Toaster />
        <div
          className={`fixed bottom-0 w-full transition-transform duration-300 ease-in-out`}
        >
          <BottomBar />
        </div>

        <Image
          src={Blur}
          alt="blur"
          className="absolute bottom-0 -z-10"
          loading="lazy"
        />
      </body>
    </html>
  );
}
