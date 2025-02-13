"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { AiOutlineArrowRight } from "react-icons/ai";

import export1 from "../../public/assets/export-1.svg";
import export2 from "../../public/assets/export-2.svg";
import export3 from "../../public/assets/export-3.svg";
import export4 from "../../public/assets/export-4.svg";
import export5 from "../../public/assets/export-5.svg";

export default function Home() {
  const [isMarqueeVisible, setIsMarqueeVisible] = useState(false);

  useEffect(() => {
    setIsMarqueeVisible(true);
  }, []);

  return (
    <div className="flex md:justify-center md:items-center items-start md:min-h-screen h-screen p-3">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="font-extrabold md:text-6xl mb-5 text-4xl text-center leading-tight mt-12">
          Create .Connect. Discover
        </h1>
        <p className="text-center md:text-xl font-bold">
          This is a Community of Coders{" "}
          <span className="text-red-400"> who are passionate</span> in Computer
          Science Field
          <span className="text-yellow-400">
            {" "}
            <br />
            Hunting for their next tech job
          </span>{" "}
          and are building a unique product.
        </p>
        <div className="md:w-2/3 w-full h-0.5 bg-white opacity-10 mb-3 mt-6" />
        <div className="flex md:flex-row flex-col items-center md:w-1/2 w-full">
          {isMarqueeVisible && (
            <Marquee
              className="gap-5 w-[2/3] -z-10"
              gradient={true}
              gradientColor={"#2C2B2B"}
              pauseOnHover={true}
            >
              <div className="flex gap-x-5 md:gap-x-10">
                <Image
                  src={export1}
                  alt="Community event export graphic 1"
                  className="hover:opacity-50 object-contain duration-300 transition-all"
                />
                <Image
                  src={export2}
                  alt="Community event export graphic 2"
                  className="hover:opacity-50 duration-300 object-contain transition-all"
                />
                <Image
                  src={export3}
                  alt="Community event export graphic 3"
                  className="hover:opacity-50 duration-300 mt-4 transition-all"
                />
                <Image
                  src={export4}
                  alt="Community event export graphic 4"
                  className="hover:opacity-50 duration-300 transition-all"
                />
                <Image
                  src={export5}
                  alt="Community event export graphic 5"
                  className="hover:opacity-50 duration-300 -mt-1 transition-all"
                />
              </div>
            </Marquee>
          )}
        </div>
        <div className="md:w-2/3 w-full h-0.5 bg-white opacity-10 mt-3 mb-6" />
        <section className="flex flex-col gap-y-3 mt-4">
          <Link href="/jobs">
            <button className="bg-[#5E548E] px-12 flex hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] justify-center rounded-lg py-2 group relative overflow-hidden w-full">
              <div className="flex items-center gap-x-2 z-10 text-white text-xl font-medium w-full justify-center">
                Jobs
                <AiOutlineArrowRight className="group-hover:translate-x-1 duration-200 transition-all ease-in-out text-white" />
              </div>
            </button>
          </Link>
          <Link href="/questions">
            <button className="bg-[#5E548E] px-12 flex hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] justify-center rounded-lg py-2 group relative overflow-hidden w-full">
              <div className="flex items-center gap-x-2 z-10 text-white text-xl font-medium w-full justify-center">
                Questions
                <AiOutlineArrowRight className="group-hover:translate-x-1 duration-200 transition-all ease-in-out text-white" />
              </div>
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
