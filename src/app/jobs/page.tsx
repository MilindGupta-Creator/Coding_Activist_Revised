"use client";

import HotUpdates from "@/components/core/HotUpdates";
import JobCard from "@/components/core/JobCard";
import { db } from "@/firebase/firebase";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "@/utils/index";
import { throttle } from "lodash";

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

  const fetchJobsData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    let query = db
      .collection("jobsDataCollection")
      .orderBy("createdAt", "desc")
      .limit(5);

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
    } finally {
      setLoading(false);
    }
  }, [lastVisible, loading, hasMore]);

  useEffect(() => {
    fetchJobsData();
  }, [fetchJobsData]);

  const handleScroll = useCallback(
    throttle(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollTop === documentHeight && !loading) {
        fetchJobsData();
      }
    }, 200),
    [fetchJobsData, loading]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled calls
    };
  }, [handleScroll]);

  return (
    <div className="flex justify-between h-screen mt-20 gap-x-5">
      <div className="flex flex-wrap justify-between items-start gap-5 md:w-4/5 w-full overflow-scroll jobs-section">
        {jobData.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {loading && <p>Loading more jobs...</p>}
        {!hasMore && <p>No more jobs to load.</p>}
      </div>
      <div className="w-1/5 md:block hidden">
        <HotUpdates />
      </div>
    </div>
  );
};

export default Home;
