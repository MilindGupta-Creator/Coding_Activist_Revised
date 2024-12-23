import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

interface JobCardProps {
  job: any;
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const JobCard = (jobs: JobCardProps) => {
  return (
    <div className="bg-[#000] rounded-lg p-5 w-80 h-auto items-baseline  ">
      <div className="flex flex-col items-start">
        <div className="flex gap-x-2 items-center">
          <img
            src={jobs.job.image}
            alt="company-logo"
            className="bg-white rounded-full object-contain h-12 w-12"
            loading="lazy"
          />
          <div className="flex flex-col justify-between">
            <p className="text-2xl">{jobs.job.name}</p>
            <p className="text-sm bg-[#8244FF] w-max px-2 rounded-xl mt-2 capitalize">
              {jobs.job.type}
            </p>
          </div>
        </div>
        <p className="mt-5 capitalize">Role: {jobs.job.role}</p>
        <div className="flex w-full gap-x-2 text-center">
          <p className="bg-[#737373] px-3 py-1 rounded-lg text-xs flex items-center">
            <FaLocationDot /> {jobs.job.address}
          </p>
          <p className="bg-[#737373] px-3 py-1 rounded-lg text-xs">
            {jobs.job.salary || "N.A"}
          </p>
        </div>
        <div className="flex my-5 w-full flex-wrap gap-2 items-center">
          <p>Skills : </p>
          {jobs.job.skills.slice(0, 3).map((item: string, index: number) => {
            return (
              <p
                className="border p-1 rounded-md border-violet-600"
                key={index}
              >
                {item}
              </p>
            );
          })}
        </div>
        <p className="mb-2 capitalize">Posted: {jobs.job.createdAt}</p>

        <Link
          href={`/job-details/${jobs.job.id}`}
          className="bg-[#8244FF] rounded-lg px-4 py-3"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
