import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="relative">
        <div className="h-10 w-10 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
      <p>Loading</p>
    </div>
  );
};

export default Loading;
