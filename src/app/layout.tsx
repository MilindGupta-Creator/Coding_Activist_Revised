import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import BottomBar from "@/components/common/BottomBar";
import Blur from "../../public/assets/blur-23.png";
import Image from "next/image";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Coding Activist | Jobs for Freshers",
  description:
    "Coding Activist helps freshers find their dream jobs in the tech industry. Discover job opportunities, career resources, and coding tips to kickstart your professional journey. Join the community and start your career with Coding Activist today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative bg-blue-charcoal-950 text-white bg-hero bg-cover bg-center`}
      >
        <section className="w-4/5 mx-auto">
          <Navbar />
          {children}
        </section>
        <BottomBar />
        <Image src={Blur} alt="blur" className="absolute bottom-0"/>
      </body>
    </html>
  );
}
