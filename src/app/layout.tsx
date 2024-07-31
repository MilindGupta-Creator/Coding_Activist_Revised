"use client";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import BottomBar from "@/components/common/BottomBar";
import Blur from "../../public/assets/blur-23.png";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const metadata: Metadata = {
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
      <head>
        <title>Coding Activist | Jobs for Freshers</title>
      </head>
      <body
        className={`${inter.className} relative bg-blue-charcoal-950 text-white bg-hero bg-contain bg-no-repeat`}
      >
        <div>
          <section className="fixed top-0 w-full z-10">
            <Navbar />
          </section>
          {children}
        </div>
        <div
          className={`fixed bottom-0 w-full transition-transform duration-300 ease-in-out`}
        >
          <BottomBar />
        </div>

        <Image
          src={Blur}
          alt="blur"
          className="absolute bottom-0"
          loading="lazy"
        />
      </body>
    </html>
  );
}
