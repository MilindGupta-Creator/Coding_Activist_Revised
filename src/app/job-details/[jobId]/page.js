import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { formatDate } from "@/utils";
import SimilarJob from "@/components/core/SimilarJob";
import JobDetailsClient from "@/components/client/JobDetailsClient"; // A separate client component for the interactive parts

const JobDetails = async ({ params }) => {
  const { jobId } = params;

  // Fetch job data on the server
  let job = null;
  let similarJobs = [];

  try {
    const jobDoc = await getDoc(doc(db, "jobsDataCollection", jobId));
    if (jobDoc.exists()) {
      const jobData = jobDoc.data();
      const createdAt = formatDate(jobData.createdAt.toDate());
      job = { id: jobDoc.id, ...jobData, createdAt };
    }

    const snapshot = await db
      .collection("jobsDataCollection")
      .orderBy("createdAt", "desc")
      .limit(2)
      .get();
    similarJobs = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = formatDate(data.createdAt.toDate());
      return { ...data, id: doc.id, createdAt };
    });
  } catch (error) {
    console.error("Error fetching job or similar jobs:", error);
  }

  if (!job) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-hero bg-no-repeat">
      <p className="pt-20 mb-5 text-center font-bold text-3xl">Job Description</p>
      <div className="bg-white w-4/5 rounded-lg mx-auto p-5">
        <JobDetailsClient job={job} /> {/* Client-side component */}
      </div>
      <section className="w-4/5 mx-auto pb-20 pt-10 ">
        <SimilarJob similarJob={similarJobs} />
      </section>
    </div>
  );
};

export default JobDetails;
