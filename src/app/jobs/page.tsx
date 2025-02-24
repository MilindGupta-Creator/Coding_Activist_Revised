"use client";

import HotUpdates from "@/components/core/HotUpdates";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "@/utils/index";
import _ from "lodash";
import Loading from "@/components/common/Loading";
import { VscSettings } from "react-icons/vsc";
import { ArrowUp, Mail, Search, Star } from "lucide-react";
import { Lock } from "lucide-react";
import { FaRunning } from "react-icons/fa";

interface JobData {
  type: string;
  name: any;
  id: string;
  title: string;
  description: string;
  createdAt: string;
  address: string; // Assuming location field exists
}

interface Props {
  searchQuery: string;
}

const Home: React.FC = () => {
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showfilter, setShowFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState("all");
  const [showRemote, setShowRemote] = useState<boolean>(false); // New state for remote filter
  const [isPremium, setIsPremium] = useState(false);
  const FREE_JOB_LIMIT = 8;

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setFilters(event.target.value);
    setShowFilter((prev) => !prev);
  };

  // Updated filteredJobs logic to consider remote filter
  const filteredJobs = jobData.filter((item: JobData) => {
    return (
      (filters === "all" || item.type === filters) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showRemote || item.address === "Remote") // Check for remote filter
    );
  });

  const fetchJobsData = async () => {
    if (loading || !hasMore || (!isPremium && jobData.length >= FREE_JOB_LIMIT))
      return;
    setLoading(true);
    let query = db
      .collection("jobsDataCollection")
      .orderBy("createdAt", "desc")
      .limit(6);
    if (lastVisible) {
      query = query.startAfter(lastVisible);
    }
    try {
      const snapshot = await query.get();
      if (snapshot.empty) {
        setHasMore(false);
      } else {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          const createdAt = formatDate(docData.createdAt.toDate());
          return { ...docData, id: doc.id, createdAt } as JobData;
        });

        setJobData((prevData) => [...prevData, ...data]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching jobs data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobsData();
  }, [filters, showRemote]); // Include showRemote in dependency array

  const handleScroll = useCallback(
    _.throttle(() => {
      if (!isPremium && jobData.length >= FREE_JOB_LIMIT) return; // Stop fetching for free users
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const offset = 100; // Buffer before bottom
      if (scrollPosition >= document.documentElement.offsetHeight - offset) {
        fetchJobsData();
      }
    }, 300),
    [fetchJobsData, isPremium, jobData.length]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayedJobs = isPremium
    ? filteredJobs
    : filteredJobs.slice(0, FREE_JOB_LIMIT);
  const hasMoreJobs = filteredJobs.length > FREE_JOB_LIMIT;

  console.log(displayedJobs, "=>", hasMoreJobs);
  

  return (
    <div className="w-4/5 mx-auto pt-20">
      <div className="flex justify-end w-[calc(80%-20px)] gap-2">
        {/* Remote button */}
        <button
          className={`border-blue-500 border mt-5 py-2 px-4 rounded-lg ${
            showRemote ? "bg-slate-800 text-white" : ""
          }`}
          onClick={() => setShowRemote((prev) => !prev)}
        >
          Remote
        </button>

        {/* Filter button */}
        {!showfilter && (
          <button
            className={`
            border border-violet-500 mt-5 py-2 rounded-lg 
            flex items-center px-4 tracking-wider
            hover:bg-violet-700 
            ${showfilter ? "bg-violet-50" : ""}
          `}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <span className="mr-2">Filter</span>
            <VscSettings className="w-4 h-4" />
          </button>
        )}
      </div>
      {showfilter && (
        <div className="md:w-[calc(80%-15px)] mt-1 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Filter</h1>
            <button
              className="text-gray-800 bg-gray-100 border border-gray-300 hover:bg-gray-200 px-3 py-1 rounded-full transition duration-300"
              onClick={() => setShowFilter(false)}
            >
              &times; Close
            </button>
          </div>
          <hr className="border-gray-300" />
          <div className="flex gap-x-5 mt-5">
            <label className="block text-gray-800 text-sm font-medium">
              Job Type
              <select
                name="jobType"
                id=""
                className="block w-full mt-2 p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-200"
                onChange={handleChange}
                value={filters}
              >
                <option value="all">🔍 All </option>
                <option value="fulltime">💼 Full Time</option>
                <option value="internship">👩‍💻 Internship</option>
              </select>
            </label>
          </div>
        </div>
      )}


      <div className="flex justify-between mt-10 gap-x-5">
        <div className="flex flex-wrap justify-between items-start gap-5 md:w-2/3 overflow-scroll jobs-section">
          {filteredJobs ? (
            <>
              {displayedJobs.map((job, index) => (
                <div key={index}>
                  <JobCard
                    key={job.id}
                    job={job}
                    id={""}
                    title={""}
                    description={""}
                    createdAt={""}
                    className={index >= displayedJobs.length - 2 ? "blur" : ""}
                  />
                  {/* {(index + 1) % 6 === 0 && (
                    <section className="section-container flex pt-6" style={{alignItems:"end"}}>
                      <Link href="/jobs" className="back-link">
          <FaArrowLeft /> Back to Jobs
        </Link>
                      <div className="block md:hidden">
                        <HotUpdates />
                      </div>
                    </section>
                  )} */}
                </div>
              ))}
            </>
          ) : (
            <>
              {jobData.map((job, index) => (
                <div key={index}>
                  <JobCard
                    key={job.id}
                    job={job}
                    id={""}
                    title={""}
                    description={""}
                    createdAt={""}
                  />
                  {/* {(index + 1) % 6 === 0 && (
                    <section className="section-container">
                      <Link href="/jobs" className="back-link">
          <FaArrowLeft /> Back to Jobs
        </Link>
                      <div className="block md:hidden">
                        <HotUpdates />
                      </div>
                    </section>
                  )} */}
                </div>
              ))}
            </>
          )}
          {loading && <Skeleton />}
          {!hasMore && <p>No more jobs to load.</p>}
        </div>
        {/* <div className="w-1/5 md:block hidden sticky top-0 right-0">
          <HotUpdates />
        </div> */}
      </div>
      {!isPremium && hasMoreJobs && (
        <div className="relative z-0 mt-8 overflow-hidden rounded-xl bg-[#1c1c2e] p-6 sm:p-8 md:p-10">
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Lock className="h-5 w-5 text-violet-200" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
                  Unlock More Opportunities
                </h2>
              </div>
              <p className="mt-2 sm:mt-3 text-center text-violet-100 text-sm sm:text-base px-2 sm:px-4 max-w-2xl mx-auto">
                Upgrade to premium to access our full database of job listings
                and take your career to the next level
              </p>
            </div>

            <br />

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-800">
                  <Search className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Discover hidden jobs
                  </h3>
                  <p className="text-gray-400 text-sm">
                    We scan the internet everyday and find jobs not posted on
                    LinkedIn or other job boards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-800">
                  <FaRunning className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Head start against the competition
                  </h3>
                  <p className="text-gray-400 text-sm">
                    We find jobs within 24 hours of being posted, so you can
                    apply before everyone else.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-800">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Be the first to know
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Daily emails with new job openings straight to your inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">
                Choose your membership
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setIsPremium(true)}
                className="w-full p-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
              >
                😎 $6 / week
              </button>
              <button
                onClick={() => setIsPremium(true)}
                className="w-full p-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
              >
                🚀 $18 / month
              </button>
              <button
                onClick={() => setIsPremium(true)}
                className="w-full p-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
              >
                🎯 $54 / year
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#1c1c2e] overflow-hidden"
                  >
                    <img
                      src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZviVppGVqhXlN6WIItcIZyo5EMVMTH.png`}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Loved by 10,000+ remote workers
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        </div>
      )}
      <button
        className="mb-16 fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Home;

const Skeleton = () => {
  return (
    <div className="mb-2 w-full px-4 grid lg:grid-cols-2 gap-4 ">
      <div className="bg-gray-300 bg-opacity-10 w-full h-[350px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[350px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[350px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[350px] rounded-xl animate-pulse"></div>
    </div>
  );
};
