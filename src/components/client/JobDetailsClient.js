"use client";

import { useState } from "react";
import { FaShare } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const JobDetailsClient = ({ job }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);

    toast.success("Copied to clipboard!", {
      position: "top-right",
    });

    // Reset the copied state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-between items-start text-black">
        <div className="flex flex-col">
          <img
            src={job?.image}
            height={100}
            width={100}
            alt="company-logo"
            className="rounded-full w-20 h-20 bg-white object-contain shadow-2xl shadow-blue-500/20"
          />
          <p className="text-2xl">Role: {job?.role}</p>
          <p className="text-xl">{job?.name}</p>
        </div>
        <button
          className="bg-violet-500 px-3 py-1 rounded-md flex items-center gap-x-2"
          onClick={handleCopyToClipboard}
        >
          Share <FaShare />
        </button>
      </div>
      <div className="mt-10">
        <p className="text-violet-600">
          Location: <span className="text-white">{job?.address}</span>
        </p>
        <div className="text-violet-600 flex gap-2 items-center flex-wrap">
          Skills Required:
          {job?.skills?.map((item, index) => (
            <p className="bg-violet-300 px-2 py-1 rounded-md" key={index}>
              {item}
            </p>
          ))}
        </div>
        <div className="text-violet-600">
          Qualification:
          {job?.qualification?.map((item, index) => (
            <ul className="list-disc pl-10 text-black" key={index}>
              <li>{item}</li>
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <div className="text-violet-600">
          Responsibilities:
          {job?.responsibility?.map((item, index) => (
            <ul className="pl-10 list-disc text-black" key={index}>
              <li>{item}</li>
            </ul>
          ))}
        </div>
      </div>
      <div className="flex justify-end w-full mt-5">
        <button className="bg-violet-500 px-3 py-1 rounded-md flex items-center gap-x-2">
          <Link href={job?.apply}>Apply Now</Link>
        </button>
      </div>
    </>
  );
};

export default JobDetailsClient;
