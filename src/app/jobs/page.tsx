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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="w-4/5 mx-auto pt-20">
      <div className="flex justify-end w-[calc(80%-20px)]">
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
        <div className="md:w-[calc(80%-15px)]  mt-1  0 bg-[#8244FF] p-2 rounded-lg">
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
        </div>
      )}
      <div className="flex justify-between mt-10 gap-x-5 ">
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
          {loading && <Loading />}
          {!hasMore && <p>No more jobs to load.</p>}
        </div>
        <div className="w-1/5 md:block hidden sticky top-0 right-0">
          <HotUpdates />
        </div>
      </div>
    </div>
  );
};

export default Home;
