import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Home() {
  return (
    <div className="flex md:justify-center md:items-center items-start md:min-h-screen h-screen p-3">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="font-extrabold md:text-6xl mb-5 text-4xl text-center leading-tight">
          Create .Connect. Discover
        </h1>
        <p className="text-center md:text-xl font-bold">
          This is a Community of Coders{" "}
          <span className="text-red-800"> who are passionate</span> in Computer
          Science Field,
          <span className="text-yellow-400">
            {" "}
            <br />
            Hunting for their next tech job
          </span>{" "}
          and are building a unique product.
        </p>
        <div className="md:w-1/2 w-full h-0.5 bg-white opacity-10  mb-3 mt-10" />
        <div className="flex md:flex-row flex-col items-center md:w-1/2 w-full">
          <Marquee
            className="gap-5 flex-1 -z-10"
            gradient={true}
            gradientColor={"#2C2B2B"}
            pauseOnHover={true}
          >
            <div className="flex gap-x-5 md:gap-x-10">
              <Image
                src={require("../../public/assets/export-1.svg")}
                alt="export"
                className="hover:opacity-50 object-contain duration-300  transition-all"
              />
              <Image
                src={require("../../public/assets/export-2.svg")}
                alt="export"
                className="hover:opacity-50 duration-300 object-contain transition-all"
              />
              <Image
                src={require("../../public/assets/export-3.svg")}
                alt="export"
                className="hover:opacity-50 duration-300 mt-4 transition-all"
              />
              <Image
                src={require("../../public/assets/export-4.svg")}
                alt="export"
                className="hover:opacity-50 duration-300  transition-all"
              />
              <Image
                src={require("../../public/assets/export-5.svg")}
                alt="export"
                className="hover:opacity-50 duration-300 -mt-1 transition-all"
              />
            </div>
          </Marquee>
        </div>
        <div className="md:w-1/2 w-full h-0.5 bg-white opacity-10 mt-3 mb-10" />
        <button className="bg-[#5E548E] px-12 flex hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] justify-center rounded-lg py-2 group relative overflow-hidden">
          <Link
            href="/jobs"
            className="flex items-center gap-x-2 z-10 text-white text-xl font-medium"
          >
            Jobs
            <AiOutlineArrowRight className="group-hover:translate-x-1 duration-200 transition-all ease-in-out text-white" />
          </Link>
        </button>
      </div>
    </div>
  );
}
