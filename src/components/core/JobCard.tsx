import Link from "next/link";
import { FaLocationDot, FaBriefcase } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

interface JobCardProps {
  job: any;
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const JobCard = (jobs: JobCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="bg-[#000] rounded-lg p-5 sm:w-80 h-auto items-baseline  ">
      <div className="flex flex-col items-start">
        <div className="flex gap-x-2 items-center">
          {jobs.job.image ? (
            <img
              src={jobs.job.image || "/placeholder.svg"}
              alt="company-logo"
              className="bg-white rounded-full object-contain h-12 w-12"
              loading="lazy"
            />
          ) : (
            <div className="bg-violet-600 rounded-full h-12 w-12 flex items-center justify-center">
              <FaBriefcase className="text-white text-2xl" />
            </div>
          )}
          <div className="flex flex-col justify-between">
            <p className="text-xl">{jobs.job.name}</p>
            <p className="text-sm bg-[#8244FF] w-max px-2 py-1 rounded-xl mt-2 capitalize">
              {jobs.job.type}
            </p>
          </div>
        </div>
        <p className="mt-2 capitalize ">Role: {jobs.job.role}</p>
        <div className="flex w-full gap-x-2 text-center mt-3">
          <p className="w-24 bg-gray-700 px-3 py-2 rounded-lg text-xs flex items-center truncate justify-center ">
            <FaLocationDot className="mr-1" /> {jobs.job.address.split(" ")[0]}
          </p>
          <div 
            ref={tooltipRef}
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <p className="w-44 truncate bg-gray-700 px-3 py-2 rounded-lg text-xs cursor-help select-none">
              {jobs.job.salary || "Salary N/A"}
            </p>
            {showTooltip && jobs.job.salary && (
              <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg border border-gray-700 z-10 max-w-xs break-words">
                {jobs.job.salary}
                <div className="absolute top-full left-4 w-2 h-2 rotate-45 bg-gray-900 border-r border-b border-gray-700"></div>
              </div>
            )}
          </div>
        </div>
        <div className="flex my-4 w-full flex-wrap gap-2 items-center">
          <p className="text-gray-200">Skills:</p>
          {jobs.job.skills.slice(0, 3).map((item: string, index: number) => (
            <p
              className="border border-violet-600 text-violet-300 p-1 rounded-md text-xs"
              key={index}
            >
              {item}
            </p>
          ))}
        </div>
        <p className="mb-4 text-gray-200 text-sm">
          Posted: {jobs.job.createdAt}
        </p>

        <Link
          href={`/job-details/${jobs.job.id}`}
          className="bg-violet-600 hover:bg-violet-700 transition-colors duration-300 rounded-lg px-4 py-2 text-white "
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
