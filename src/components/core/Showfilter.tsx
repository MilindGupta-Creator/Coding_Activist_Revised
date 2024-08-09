import { useState } from "react";

type filter = {
  showfilter: boolean;
};

const Showfilter = (
  showfilter: filter,
): JSX.Element => {
  const [filters, setFilters] = useState({
    jobType: "all",
    location: "all",
  });

  const handleSubmit = () => {
    localStorage.setItem("user-jobtype", filters.jobType);
    localStorage.setItem("user-location", filters.location);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  return (
    <div className=" mx-auto  mt-1  0 bg-[#8244FF] p-2 rounded-lg">
      {showfilter ? (
        <div>
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
                value={filters.jobType}
              >
                <option value="all">All</option>
                <option value="fulltime">Full Time</option>
                <option value="internship">Internship</option>
              </select>
            </label>
            <label htmlFor="">
              <p>Location</p>
              <select
                name="location"
                id=""
                className="text-black outline-none rounded-lg"
                onChange={handleChange}
                value={filters.location}
              >
                <option value="all">All</option>
                <option value="banglore">Banglore</option>
                <option value="gurgaon">Gurgaon</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-[#1A0F33] der mt-5 py-2 rounded-lg flex items-center justify-end gap-x-1 px-2 tracking-wider"
              onClick={handleSubmit}
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Showfilter;
