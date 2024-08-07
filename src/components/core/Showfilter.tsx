type filter = {
  showfilter: boolean;
};

const Showfilter = (showfilter: filter): JSX.Element => {
  return (
    <div className="w-[calc(80%-20px)]  mt-1  0 bg-[#8244FF] p-2 rounded-lg">
      {showfilter ? (
        <div>
          <p className="mb-4">Job Type</p>
          <div className="flex gap-x-2 items-center">
            <input type="checkbox" name="fullTime" id="full-time" />
            <label htmlFor="full-time">Full time</label>
          </div>
          <div className="flex gap-x-2 items-center">
            <input type="checkbox" name="internship" id="internship" />
            <label htmlFor="internship">Internship</label>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Showfilter;
