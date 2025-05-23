"use client";

import HotUpdates from "@/components/core/HotUpdates";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "@/utils/index";
import _ from "lodash";
import Loading from "@/components/common/Loading";
import { VscSettings } from "react-icons/vsc";
import { ArrowUp, Briefcase, MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/ui/stats-card";
import TrendingSidebar from "@/components/ui/TrendingSidebar";
import { Tabs } from "../../components/ui/tabs";
import JobTrends from "@/components/common/JobTrends";

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
  const [activeTab, setActiveTab] = useState("jobs");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [loadingTime, setLoadingTime] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<string>("Initializing...");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showfilter, setShowFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState("all");
  const [showRemote, setShowRemote] = useState<boolean>(false); // New state for remote filter
  const [stats, setStats] = useState({
    totalJobs: 0,
    remoteJobs: 0,
    fullTimeJobs: 0,
    internships: 0,
  });

  const tabs = [
    { id: "jobs", label: "Available Jobs" },
    // { id: "stats", label: "Statistics" },
    { id: "insights", label: "Market Insights" },
    // { id: "companies", label: "Company Features" },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (initialLoading) {
      // Start a timer that increments every second
      timer = setInterval(() => {
        setLoadingTime(prev => {
          const newTime = prev + 1;

          // Update loading message based on time elapsed
          if (newTime === 3) {
            setLoadingMessage("Connecting to database...");
          } else if (newTime === 6) {
            setLoadingMessage("Fetching job listings...");
          } else if (newTime === 9) {
            setLoadingMessage("Almost there...");
          } else if (newTime > 12) {
            setLoadingMessage("Still loading... This is taking longer than usual.");
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [initialLoading]);

  const LoadingIndicator = () => (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <div className="bg-gray-300 bg-opacity-10 w-24 h-24 rounded-full flex items-center justify-center mb-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
      </div>
      <p className="text-gray-300 text-lg">{loadingMessage}</p>
      <p className="text-gray-400 text-sm mt-2">Loading for {loadingTime} seconds</p>

      <div className="mt-8 w-full">
        <Skeleton />
      </div>

    </div>
  );


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

  const fetchJobStats = async () => {
    if (!initialLoading) setDataLoading(true);
    try {
      // Use a single query with where clauses or Firebase's aggregation features
      const statsQuery = await db.collection("jobsDataCollection").get();
      const jobs = statsQuery.docs.map(doc => doc.data());

      // Calculate stats from this single query
      setStats({
        totalJobs: jobs.length,
        remoteJobs: jobs.filter((job) => job.address === "Remote").length,
        fullTimeJobs: jobs.filter((job) => job.type === "fulltime").length,
        internships: jobs.filter((job) => job.type === "internship").length,
      });

      // Also set initial job data from this same query
      const formattedJobs = jobs.map(job => ({
        ...job,
        id: job.id,
        createdAt: formatDate(job.createdAt.toDate())
      }));
      setJobData(formattedJobs as JobData[]);

    } catch (error) {
      console.error("Error fetching job stats:", error);
    } finally {
      setInitialLoading(false);
      setDataLoading(false);
    }
  };


  const fetchJobsData = async () => {
    if (loading || !hasMore) return;
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
    const initializeApp = async () => {
      await fetchJobStats(); // This will set initialLoading to false when done
    };

    initializeApp();
  }, []);

  useEffect(() => {
    fetchJobsData();
  }, [filters, showRemote]); // Include showRemote in dependency array

  const handleScroll = useCallback(
    _.throttle(() => {
      if (activeTab === "jobs") {
        const scrollPosition = window.innerHeight + window.pageYOffset;
        const offset = 100; // Buffer before bottom
        if (scrollPosition >= document.documentElement.offsetHeight - offset) {
          fetchJobsData();
        }
      }
    }, 300),
    [fetchJobsData, activeTab]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="w-4/5 mx-auto pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Find Your Dream <span className="text-violet-500">Tech Job</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Browse through hundreds of tech opportunities from top companies around the world.
        </p>
      </motion.div>

      {initialLoading || dataLoading ? (
        <LoadingIndicator />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 mt-8">

            <>
              <StatsCard
                title="Total Jobs"
                value={stats.totalJobs}
                icon={<Briefcase className="text-violet-500" />}
                change={{ value: "12%", positive: true }}
              />
              <StatsCard
                title="Remote Jobs"
                value={stats.remoteJobs}
                icon={<MapPin className="text-green-500" />}
                change={{ value: "8%", positive: true }}
              />
              <StatsCard
                title="Full Time"
                value={stats.fullTimeJobs}
                icon={<Briefcase className="text-blue-500" />}
              />
              <StatsCard
                title="Internships"
                value={stats.internships}
                icon={<TrendingUp className="text-yellow-500" />}
                change={{ value: "5%", positive: false }}
              />
            </>

          </div>

          <div className="flex justify-end w-[calc(80%-20px)] gap-2">
            {/* Remote button */}
            <button
              className={`border-blue-500 border mt-5 py-2 px-4 rounded-lg ${showRemote ? "bg-slate-800 text-white" : ""
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
            ${showfilter ? 'bg-violet-50' : ''}
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

          <div style={{ marginTop: "20px" }}>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="sm:flex justify-between mt-10 gap-x-5">
            {activeTab === "jobs" ? (
              <div className="flex flex-wrap justify-between items-start gap-5 md:w-2/3 overflow-scroll jobs-section">
                {initialLoading || dataLoading ? (
                  <LoadingIndicator />
                ) : filteredJobs.length > 0 ? (
                  <>
                    {filteredJobs.map((job, index) => (
                      <div key={index}>
                        <JobCard
                          key={job.id}
                          job={job}
                          id={""}
                          title={""}
                          description={""}
                          createdAt={""}
                        />
                        {(index + 1) % 5 === 0 && index !== filteredJobs.length - 1 && (
                          <Ad />
                        )}
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
                        {(index + 1) % 5 === 0 && index !== jobData.length - 1 && (
                          <Ad />
                        )}
                      </div>
                    ))}
                  </>
                )}
                {loading && <Skeleton />}
                {!hasMore && <p>No more jobs to load.</p>}
              </div>
            ) : activeTab === "insights" ? (
              <div className="w-[109%] ml-[-10px] md:w-3/4">
                <JobTrends />
              </div>
            ) : null}
            <div className="w-1/4 md:block hidden sticky top-20 right-0 h-[calc(100vh-5rem)]">
              <TrendingSidebar trendingJobs={jobData.slice(0, 3)} />
            </div>
          </div>
          <button
            className="mb-16 fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        </div>
      )}
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

// Add Ad component
const Ad = () => {
  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg my-4">
      <div className="text-center text-gray-400">
        <p className="text-sm">Advertisement</p>
        <div className="h-32 flex items-center justify-center">
          <p className="text-lg">Ad Space</p>
        </div>
      </div>
    </div>
  );
};
