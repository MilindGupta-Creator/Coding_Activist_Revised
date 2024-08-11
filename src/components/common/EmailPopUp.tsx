"use client"

import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EmailPopUp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // Show popup after 15 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      toast.success("Thanks for subscribing!");
      await addDoc(collection(db, "subscribers"), { email });
      setEmail("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!showPopup) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[94%] max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setShowPopup(false)}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-center text-gray-600">
            Get the latest Job Updates.
          </p>
          <div className="flex items-center border border-gray-300 rounded-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 w-full focus:outline-none text-black"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailPopUp;
