"use client";

import HotUpdates from "@/components/core/HotUpdates";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "@/utils/index";
import _ from "lodash";
import Loading from "@/components/common/Loading";
import { VscSettings } from "react-icons/vsc";
import { ArrowUp, Briefcase, MapPin, TrendingUp, Copy, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/ui/stats-card";
import TrendingSidebar from "@/components/ui/TrendingSidebar";
import { Tabs } from "../../components/ui/tabs";
import JobTrends from "@/components/common/JobTrends";
import AdComponent from "@/components/common/AdComponent";
import toast from "react-hot-toast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

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

  const copyTodaysJobDetails = async () => {
    try {
      // Get today's start and end timestamps
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const startTimestamp = Timestamp.fromDate(today);
      const endTimestamp = Timestamp.fromDate(tomorrow);

      const jobsCollection = collection(db, "jobsDataCollection");
      const q = query(
        jobsCollection,
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<", endTimestamp)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No jobs found for today.");
        return;
      }

      // Format jobs into numbered list with individual job URLs
      const jobsList = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return `${index + 1}. ${data.role} at ${data.name} - https://codingactivist.com/job-details/${doc.id}`;
      }).join('\n\n');

      // Copy to clipboard
      await navigator.clipboard.writeText(jobsList);
      toast.success("Today's job details copied to clipboard!");
    } catch (e) {
      toast.error("Error copying jobs");
      console.error("Error copying jobs: ", e);
    }
  };

  const copyTodaysJobs = async () => {
    try {
      // Get today's start and end timestamps
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const startTimestamp = Timestamp.fromDate(today);
      const endTimestamp = Timestamp.fromDate(tomorrow);

      const jobsCollection = collection(db, "jobsDataCollection");
      const q = query(
        jobsCollection,
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<", endTimestamp)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No jobs found for today.");
        return;
      }

      // Format jobs into numbered list with main jobs page URL
      const jobsList = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return `${index + 1}. ${data.role} at ${data.name} - https://codingactivist.com/jobs`;
      }).join('\n\n');

      // Copy to clipboard
      await navigator.clipboard.writeText(jobsList);
      toast.success("Today's jobs copied to clipboard!");
    } catch (e) {
      toast.error("Error copying jobs");
      console.error("Error copying jobs: ", e);
    }
  };

  return (
    <div className="w-4/5 mx-auto pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-8"
      >
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={copyTodaysJobDetails}
            className="p-2 rounded-full bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
            title="Copy Today's Job Details"
          >
            <FileText className="w-5 h-5 text-violet-500" />
          </button>
          <button
            onClick={copyTodaysJobs}
            className="p-2 rounded-full bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
            title="Copy Today's Jobs"
          >
            <Copy className="w-5 h-5 text-violet-500" />
          </button>
        </div>
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
      <AdComponent adSlot="5438523302" adFormat="in-feed" />
    </div>
  );
};
