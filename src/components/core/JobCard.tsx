import Link from "next/link"
import { FaLocationDot, FaBriefcase } from "react-icons/fa6"

interface JobCardProps {
  job: {
    id: string
    image?: string
    name?: string
    type: string
    role: string
    address: string
    salary?: string
    skills: string[]
    createdAt: string
  }
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-[#000] rounded-lg p-5 w-80 h-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-start">
        <div className="flex gap-x-3 items-center mb-4">
          {job.image ? (
            <img
              src={job.image || "/placeholder.svg"}
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
            <p className="text-xl">{job.name}</p>
            <p className="text-sm bg-[#8244FF] w-max px-2 py-1 rounded-xl mt-2 capitalize">{job.type}</p>
          </div>
        </div>
        <p className="mt-2 capitalize ">Role: {job.role}</p>
        <div className="flex w-full gap-x-2 text-center mt-3">
          <p className="w-24 bg-gray-700 px-3 py-2 rounded-lg text-xs flex items-center truncate justify-center ">
            <FaLocationDot className="mr-1" /> {job.address.split(" ")[0]}
          </p>
          <p className="w-44 truncate bg-gray-700 px-3 py-2 rounded-lg text-xs">{job.salary || "Salary N/A"}</p>
        </div>
        <div className="flex my-4 w-full flex-wrap gap-2 items-center">
          <p className="text-gray-200">Skills:</p>
          {job.skills.slice(0, 3).map((item: string, index: number) => (
            <p className="border border-violet-600 text-violet-300 p-1 rounded-md text-xs" key={index}>
              {item}
            </p>
          ))}
        </div>
        <p className="mb-4 text-gray-200 text-sm">Posted: {job.createdAt}</p>

        <Link
          href={`/job-details/${job.id}`}
          className="bg-violet-600 hover:bg-violet-700 transition-colors duration-300 rounded-lg px-4 py-2 text-white "
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

export default JobCard

