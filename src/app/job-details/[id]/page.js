"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const JobDetails = () => {
  const params = useParams();
  console.log(params);
  return <div>JobDetails</div>;
};

export default JobDetails;
