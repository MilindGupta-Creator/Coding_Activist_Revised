"use client";

import HotUpdates from "@/components/core/HotUpdates";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { useEffect, useState, useCallback, useRef } from "react";
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

  const containerRef = useRef(null);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setFilters(event.target.value);
    setShowFilter((prev) => !prev);
  };

  const filteredJobs = jobData.filter((item: JobData) => {
    return (
      (filters === "all" ||
        item.type === filters ||
        (item.type === "internship" && filters === "fulltime")) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [filters]);

  const handleScroll = useCallback(
    _.debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      fetchJobsData();
    }, 300),
    [fetchJobsData]
  );

  useEffect(() => {
    const element = containerRef.current as HTMLElement | null;

    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);
  return (
    <div className="flex items-center justify-center">
      <div className="container flex gap-2 relative ">
        <div
          ref={containerRef}
          className="lg:w-4/5 w-full px-6 lg:px-0 h-[100vh] overflow-scroll hideScroll "
        >
          <div className="flex justify-end px-10 mt-24">
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
            <div className=" w-full p-5 mt-1  bg-[#8244FF] rounded-lg">
              <h1 className="text-lg tracking-wide">Filter</h1>
              <hr />
              <div className="flex gap-x-5 mt-5">
                <label htmlFor="">
                  <p>Job Type</p>
                  <select
                    name="jobType"
                    id=""
                    className="text-black outline-none rounded-lg"
                    onChange={handleChange}
                    value={filters}
                  >
                    <option value="all">All</option>
                    <option value="fulltime">Full Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="bg-blue-charcoal-950 px-2 py-2 rounded-lg mt-2"
                >
                  Hide
                </button>
              </div>
            </div>
          )}
          <div className="overflow-scroll jobs-section columns md:columns-2 lg:columns-3 gap-4 mt-5 w-full">
            {filteredJobs ? (
              <>
                {filteredJobs.map((job, index) => (
                  <div key={index} className="mb-2 w-full break-inside-avoid ">
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
            {!hasMore && <p>No more jobs to load.</p>}
          </div>

          {loading && <Skeletion />}
        </div>
        <div className="w-1/5  mt-20 hidden absolute top-0  right-0 lg:block  p-5 text-white ">
          <div className="    h-full">
            <HotUpdates />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const Skeletion = () => {
  return (
    <div className="mb-2 w-full px-4 grid lg:grid-cols-3 gap-4 ">
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
      <div className="bg-gray-300 bg-opacity-10 w-full h-[300px] rounded-xl animate-pulse"></div>
    </div>
  );
};
