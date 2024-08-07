import React, { PropsWithChildren } from "react";
import JobCard from "./JobCard";

const SimilarJob = ({ similarJob }: any) => {
  return (
    <div>
      <p className="text-3xl font-bold text-white">Apply For Similar Jobs:</p>
      <div className="flex gap-5 mt-5 flex-wrap">
        {similarJob?.map((item: any) => {
          return (
            <JobCard
              job={item}
              id={""}
              title={""}
              description={""}
              createdAt={""}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SimilarJob;
