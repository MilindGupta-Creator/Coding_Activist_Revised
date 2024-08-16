import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Home() {
  return (
    <div className="flex md:justify-center md:items-center items-start h-screen">
      <div className="flex flex-col items-center gap-y-12 pt-28">
        <h1 className="font-extrabold text-6xl text-center leading-tight">
          Create .Connect. Discover
        </h1>
        <p className="text-center text-xl font-bold">
          This is a Community of Coders{" "}
          <span className="text-red-500"> who are passionate</span> in Computer
          Science Field,
          <span className="text-yellow-400">
            {" "}
            <br />
            Hunting for their next tech job
          </span>{" "}
          and are building a unique product.
        </p>
        <Link
          href="/jobs"
          className="flex items-center justify-center bg-[#5E548E] px-12 py-2 rounded-lg group relative overflow-hidden hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
        >
          <div className="flex items-center gap-x-2 z-10 text-white text-xl">
            Jobs
            <AiOutlineArrowRight className="group-hover:translate-x-1 duration-200 transition-all ease-in-out text-black" />
          </div>
        </Link>
      </div>
    </div>
  );
}
