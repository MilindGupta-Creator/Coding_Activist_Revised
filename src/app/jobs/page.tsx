"use client";

import HotUpdates from "@/components/core/HotUpdates";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "@/utils/index";
import _ from "lodash";
import Loading from "./loading";

interface JobData {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
  }, []);

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
    <div className="flex justify-between mt-20 gap-x-5 w-4/5 mx-auto">
      <div className="flex flex-wrap justify-between relative items-start gap-5 md:w-4/5 overflow-scroll jobs-section">
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
        {loading && <Loading />}
        {!hasMore && <p>No more jobs to load.</p>}
      </div>
      <div className="w-1/5 md:block hidden static top-10 right-0">
        <HotUpdates />
      </div>
    </div>
  );
};

export default Home;
