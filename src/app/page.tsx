"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { AiOutlineArrowRight } from "react-icons/ai";
import Testimonials from "../components/common/Testimonials";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

import export1 from "../../public/assets/export-1.svg";
import export2 from "../../public/assets/export-2.svg";
import export3 from "../../public/assets/export-3.svg";
import export4 from "../../public/assets/export-4.svg";
import export5 from "../../public/assets/export-5.svg";
import { ButtonHoverEffect } from "@/components/ui/button-hover-effect";
import { ArrowRight, Briefcase, Code, GitFork } from "lucide-react";
import { formatDate } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Job {
  id: string;
  [key: string]: any;
}

export default function Home() {
  const [isMarqueeVisible, setIsMarqueeVisible] = useState(false);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMarqueeVisible(true);
  }, []);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const jobsCollection = collection(db, "jobsDataCollection");
        const q = query(
          jobsCollection,
          orderBy("createdAt", "desc"),
          limit(3)
        );

        const querySnapshot = await getDocs(q);
        const jobsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const createdAt = formatDate(data.createdAt.toDate());

          return {
            id: doc.id,
            ...data,

            createdAt,
          };
        });

        setRecentJobs(jobsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recent jobs:", error);
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

  return (
    <div className="flex md:justify-center md:items-center items-start min-h-screen w-full">
      <div className="flex flex-col items-center justify-center pt-20 pb-4 w-full">
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
        {/* <section className="flex gap-y-3 mt-4 z-0">
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
          <Link href="/visualizing_paths">
            <button className="bg-[#5E548E] px-12 flex hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] justify-center rounded-lg py-2 group relative overflow-hidden w-full">
              <div className="flex items-center gap-x-2 z-10 text-white text-xl font-medium w-full justify-center">
                Tech Roadmap
                <AiOutlineArrowRight className="group-hover:translate-x-1 duration-200 transition-all ease-in-out text-white" />
              </div>
            </button>
          </Link>
        </section> */}

        <section className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0">
          <Button asChild size="lg" className="w-full bg-black sm:w-auto">
            <Link href="/jobs">
              <Briefcase className="mr-2 h-5 w-5" />
              Explore Jobs
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/questions">
              <Code className="mr-2 h-5 w-5" />
              Browse Questions
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/visualizing_paths">
              <GitFork className="mr-2 h-5 w-5" />
              Tech Roadmaps
            </Link>
          </Button>
        </section>


        <div className=" mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recently Added <span className="text-blue-500">Jobs</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="text-center py-6">Loading recent jobs...</div>
            ) : recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <JobCard

                  key={job.id}
                  job={job}
                  id={job.id}
                  title={job.title || ""}
                  description={job.description || ""}
                  createdAt={job.createdAt || ""}
                />
              ))
            ) : (
              <div className="text-center py-6">No jobs available right now</div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/jobs" className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors text-lg font-medium">
              View More Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>



        <Testimonials />

        <div className=" w-full pt-8 border-t border-white/10 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Coding Activist Community. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}
