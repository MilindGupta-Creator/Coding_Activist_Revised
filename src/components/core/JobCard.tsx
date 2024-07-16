interface JobCardProps {
  job: JobData;
}

const JobCard = (jobs: JobCardProps) => {
  console.log(jobs);
  return (
    <div className="bg-[#1A0F33] rounded-lg p-5 w-[30%] h-[40%]">
      <div className="flex flex-col items-start">
        <div className="flex gap-x-2 items-center">
          <img
            src={jobs.job.image}
            alt="company-logo"
            className="bg-white rounded-full object-contain h-20 w-20"
            loading="lazy"
          />
          <div className="flex flex-col justify-between">
            <p className="text-2xl">{jobs.job.name}</p>
            <p className="text-sm bg-[#8244FF] w-max px-2 rounded-xl mt-2 capitalize">
              {jobs.job.type}
            </p>
          </div>
        </div>
        <p className="my-5 capitalize">Role: {jobs.job.role}</p>
        <div className="flex justify-evenly gap-x-2 text-center">
          <p className="bg-[#737373] px-3 py-1 rounded-lg w-max">{jobs.job.address}</p>
          <p className="bg-[#737373] px-3 py-1 rounded-lg w-1/2">{jobs.job.salary || "N.A"}</p>
        </div>
        <div className="flex my-5">
          <p>Skills</p>
          <p>HTML</p>
        </div>
        <button className="bg-[#8244FF] rounded-lg px-4 py-3">Read more</button>
      </div>
    </div>
  );
};

export default JobCard;
