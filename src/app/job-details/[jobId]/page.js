"use client";

import Head from "next/head";
import Loading from "@/components/common/Loading";
import HotUpdates from "@/components/core/HotUpdates";
import SimilarJob from "@/components/core/SimilarJob";
import RelatedJobs from "@/components/core/RelatedJobs";
import { db } from "@/firebase/firebase";
import { formatDate } from "@/utils";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaShare } from "react-icons/fa6";
import { FaArrowLeft, FaBriefcase } from "react-icons/fa";
import AdComponent from "@/components/common/AdComponent";

const JobDetails = () => {
  const [job, setJob] = useState(null); // State for a single job
  const [relatedJobs, setRelatedJobs] = useState([]);
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

  const shareJob = () => {
    if (job) {
      navigator.clipboard.writeText(
        `${job.role} at ${job.name} - ${window.location.href}`
      );
      toast.success("Job details copied to clipboard!", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      try {
        const snapshot = await db
          .collection("jobsDataCollection")
          .orderBy("createdAt", "desc")
          .limit(20)
          .get();
        const jobsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setRelatedJobs(jobsData);
      } catch (error) {
        console.error("Error fetching related jobs:", error);
      }
    };

    if (jobId) {
      fetchJob(jobId);
      fetchRelatedJobs();
    }
  }, [jobId]);

  useEffect(() => {
    if (job) {
      // Update the document title when job data is loaded
      document.title = `${job.role} at ${job.name}`;
    }
  }, [job]);

  const [similarJobs, setSimilarJobs] = useState([]);

  const pageTitle = job
    ? `${job.role} at ${job.name} - Job Description`
    : "Loading...";
  const pageDescription = job
    ? `Apply for the ${job.role} position at ${job.name}. Location: ${job.address}. Find out more about the job responsibilities and qualifications.`
    : "Job details are loading...";

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        const snapshot = await db
          .collection("jobsDataCollection")
          .orderBy("createdAt", "desc")
          .limit(6)
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
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={job.image} />
        <link rel="canonical" href={window.location.href} />
      </Head>

      <main className="bg-hero bg-no-repeat">
        <Toaster />
        <p className="pt-20 mb-5 mt-4 text-center font-bold text-3xl">
          Job Description
        </p>

        {/* Top Ad - Before Job Details */}
        <div className="w-4/5 mx-auto mb-8">
          <AdComponent adSlot="5438523302" adFormat="auto" />
        </div>

        <article className="bg-white w-4/5 rounded-lg mx-auto p-5">
          <nav className="section-container">
            <Link href="/jobs" className="back-link">
              <FaArrowLeft /> Back to Jobs
            </Link>
            <div className="hidden lg:block">
              <HotUpdates />
            </div>
          </nav>
          {/* heading */}
          <header className="relative flex justify-between items-start text-black mb-10 bg-gradient-to-r from-violet-50 to-blue-50 p-6 rounded-xl pr-12 sm:pr-20">
            <div className="flex flex-col gap-4">
              {job.image ? (
                <div className="relative group">
                  <img
                    src={job?.image}
                    height={100}
                    width={100}
                    alt="company-logo"
                    className="rounded-full w-28 h-28 bg-white object-contain shadow-2xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300 border-4 border-white"
                  />
                  <div className="absolute inset-0 rounded-full bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-full h-20 w-20 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <FaBriefcase className="text-white text-3xl" />
                </div>
              )}
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-800">{job?.role}</p>
                <p className="text-2xl text-gray-600">{job?.name}</p>
              </div>
            </div>
            {/* share button */}
            <button
              className="absolute top-4 right-2 sm:right-6 bg-violet-500 text-[floralwhite] px-3 py-1 rounded-md flex items-center gap-x-2 shadow-md"
              onClick={shareJob}
              aria-label={`Share ${job.role} job at ${job.name}`}
              style={{maxWidth: '90vw'}}
            >
              Share <FaShare />
            </button>
          </header>
         
          {/* basic details */}
          <section className="mt-10">
            <div className="grid md:grid-cols-2">
              <div>
                <p className="text-violet-600 font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Location: <span className="text-gray-700"> {job?.address}</span>
                </p>
              </div>
              <div>
                <div className="text-violet-600 font-semibold mb-4">
                  Skills Required:
                  <div className="flex gap-2 items-center flex-wrap mt-3">
                    {job.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gradient-to-r from-blue-50 to-violet-50 px-4 py-2 text-sm font-medium text-blue-800 hover:from-blue-100 hover:to-violet-100 transition-all duration-300 border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-violet-600">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-violet-600 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Qualifications
                </h3>
                <ul className="space-y-3">
                  {job?.qualification?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <svg className="h-5 w-5 text-violet-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          {/* Bottom Ad - Before Responsibilities */}
          <div className="my-8">
            <AdComponent adSlot="5438523302" adFormat="in-article" />
          </div>
          {/* salary box */}
          <div className="mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-violet-600 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Responsibilities
              </h3>
              <ul className="space-y-3">
                {job?.responsibility?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <svg className="h-5 w-5 text-violet-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-end w-full mt-5">
            <button className="bg-violet-500 px-3 py-1 rounded-md flex items-center gap-x-2">
              <Link href={job?.apply}>Apply Now</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-external-link ml-2"
              >
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </button>
          </div>
        </article>

        <section
          className="flex pt-6 pr-8"
          style={{ alignItems: "end",display:"flex",flexDirection:"row-reverse"}}
        >
          {/* <Link href="/jobs" className="back-link">
          <FaArrowLeft /> Back to Jobs
        </Link> */}
          <div className="block md:hidden">
            <HotUpdates />
          </div>
        </section>

        {/* Ad before similar jobs */}
        <div className="w-4/5 mx-auto my-8">
          <AdComponent adSlot="5438523302" adFormat="auto" />
        </div>

        {/* similar job section */}
        <section className="w-4/5 mx-auto pb-20 pt-10">
          {job && <RelatedJobs currentJob={job} relatedJobs={relatedJobs} />}
        </section>
      </main>
    </>
  );
};

export default JobDetails;
