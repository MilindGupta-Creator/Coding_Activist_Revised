"use client";

import HotUpdates from "@/components/core/HotUpdates";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "@/utils/index";
import _ from "lodash";
import Loading from "@/components/common/Loading";
import { VscSettings } from "react-icons/vsc";

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
    fetchJobsData();
  }, [filters, showRemote]); // Include showRemote in dependency array

  const handleScroll = useCallback(
    _.debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5
      ) {
        console.log("Bottom of page reached");
      }
      fetchJobsData();
    }, 300),
    [fetchJobsData]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="w-4/5 mx-auto pt-20">
      <div className="flex justify-end w-[calc(80%-20px)] gap-2">
        {/* Remote button */}
        <button
          className={`border-blue-500 border mt-5 py-2 px-4 rounded-lg ${showRemote ? "bg-slate-800 text-white" : ""}`}
          onClick={() => setShowRemote((prev) => !prev)}
        >
          Remote
        </button>
        
        {/* Filter button */}
        {!showfilter && (
          <button
            className="border-violet-500 border mt-5 py-2 rounded-lg flex items-center justify-end gap-x-1 px-2 tracking-wider"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filter
            <VscSettings />
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
        <div className="flex flex-wrap justify-between items-start gap-5 md:w-4/5 overflow-scroll jobs-section">
          {filteredJobs ? (
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
