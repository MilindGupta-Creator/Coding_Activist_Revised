"use client";

import Loading from "@/components/common/Loading";
import HotUpdates from "@/components/core/HotUpdates";
import SimilarJob from "@/components/core/SimilarJob";
import { db } from "@/firebase/firebase";
import { formatDate } from "@/utils";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaShare } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

const JobDetails = () => {
  const [job, setJob] = useState(null); // State for a single job
  const { jobId } = useParams(); // Get jobId from URL parameters

  const fetchJob = async (id) => {
    try {
      const jobDoc = await getDoc(doc(db, "jobsDataCollection", id));
      if (jobDoc.exists()) {
        const jobData = jobDoc.data();
        const createdAt = formatDate(jobData.createdAt.toDate()); // Convert Firestore Timestamp to JavaScript Date
        setJob({ id: jobDoc.id, ...jobDoc.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success("Copied to clipboard!", {
      position: "top-right",
    });
  };

  useEffect(() => {
    if (jobId) {
      fetchJob(jobId);
    }
  }, [jobId]);

  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        const snapshot = await db
          .collection("jobsDataCollection")
          .orderBy("createdAt", "desc")
          .limit(2)
          .get();
        const similarJobsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = formatDate(data.createdAt.toDate()); // Convert Firestore Timestamp to JavaScript Date
          return { ...data, id: doc.id, createdAt };
        });
        setSimilarJobs(similarJobsData);
      } catch (error) {
        console.error("Error fetching similar jobs:", error);
      }
    };

    fetchSimilarJobs();
  }, []);

  if (!job) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log(job);
  return (
    <div className="bg-hero bg-no-repeat">
      <Toaster />
      <p className="pt-20 mb-5 mt-4 text-center font-bold text-3xl">
        Job Description
      </p>

      <div className="bg-white w-4/5 rounded-lg mx-auto p-5">
        <Link
          href="/jobs"
          className="inline-flex items-center mb-7 px-6 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white text-lg font-semibold rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
        >
          <FaArrowLeft className="mr-2" /> Back to Jobs
        </Link>
        {/* heading */}
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
          {/* share button */}
          <button
            className="bg-violet-500 text-[floralwhite] px-3 py-1 rounded-md flex items-center gap-x-2"
            onClick={() => handleCopyToClipboard()}
          >
            Share <FaShare />
          </button>
        </div>
        {/* basic details */}
        <div className="mt-10">
          <p className="text-violet-600 mb-4">
            Location: <span className="text-black"> {job?.address}</span>
          </p>
          <div className="text-violet-600 flex gap-2 items-center flex-wrap mb-4">
            Skills Required:
            {job?.skills?.map((item, index) => {
              return (
                <p className="bg-violet-300 px-3 py-1 rounded-md " key={index}>
                  {item}
                </p>
              );
            })}{" "}
          </div>
          <div className="text-violet-600">
            Qualification:{" "}
            {job?.qualification?.map((item, index) => {
              return (
                <ul className="list-disc pl-10 text-black" key={index}>
                  <li>{item}</li>
                </ul>
              );
            })}{" "}
          </div>
        </div>
        {/* salary box */}
        <div className="mt-5">
          <div className="text-violet-600">
            Responsibilities:{" "}
            {job?.responsibility?.map((item, index) => {
              return (
                <ul className="pl-10 list-disc text-black" key={index}>
                  <li>{item}</li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end w-full mt-5">
          <button className="bg-violet-500 px-3 py-1 rounded-md flex items-center gap-x-2">
            <Link href={job?.apply}>Apply Now</Link>
          </button>
        </div>
      </div>

      {/* <div className="w-1/5  sticky top-0 right-0">
        <HotUpdates />
      </div> */}

      {/* similar job section */}
      <section className="w-4/5 mx-auto pb-20 pt-10 ">
        <SimilarJob similarJob={similarJobs} />
      </section>
    </div>
  );
};

export default JobDetails;
