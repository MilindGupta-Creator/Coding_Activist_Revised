import { useEffect, useRef, useState } from "react";

export default function HotUpdates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topMateRef = useRef<HTMLIFrameElement | null>(null);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isModalOpen]);

  return (
    <>
      <div className="relative inline-block z-0">
        <span
          className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-md shadow-md z-20"
        >
          New
        </span>
        <button
          onClick={handleButtonClick}
          className="relative z-10 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg text-base font-semibold px-4 py-2 inline-flex items-center justify-center cursor-pointer shadow-lg uppercase transition-transform duration-300 ease-in-out hover:scale-105 animate-flicker"
        >
          Resume Review
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M15 3h6v6"></path>
            <path d="M10 14 21 3"></path>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-11/12 max-w-3xl p-4 bg-white rounded-lg overflow-hidden">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-black text-3xl font-bold"
            >
              &times;
            </button>
            <iframe
              src="https://topmate.io/milindgupta/1252134/pay"
              title="Topmate Profile"
              width="100%"
              height="70vh"
              className="border-2 border-gray-300 h-[70vh]"
              style={{ overflow: "hidden" }}
              ref={topMateRef}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
          10%, 30%, 70%, 90% { opacity: 0.9; }
          20%, 40%, 60%, 80% { opacity: 1.0; }
        }
        .animate-flicker {
          animation: flicker 1.5s infinite;
        }
      `}</style>
    </>
  );
}