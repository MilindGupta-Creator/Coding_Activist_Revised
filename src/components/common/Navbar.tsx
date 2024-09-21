"use client";

import Image from "next/image";
import Logo from "../../../public/assets/main-logo.png";
import Link from "next/link";
import { RiMenu3Fill, RiCloseLargeLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBegkaVBpkSz2UWnespSWZdBBKJFN2-aiw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Navbar = () => {
  const [showCloseMenu, setShowCloseMenu] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-[#181818] bg-clip-padding backdrop-filter backdrop-blur-sm border-b border-gray-500">
      <div className="flex justify-between items-center py-2 w-4/5 mx-auto ">
        <Link href="/" className="flex items-center gap-x-2">
          <Image
            src={Logo}
            alt="logo"
            width="60"
            height="60"
            className="bg-white rounded-full"
            loading="lazy"
          />
          <p className={`font-bold  text-gray-400`}>Coding Activist</p>
        </Link>
        <div className="md:flex items-center gap-x-20 hidden relative">
          <Link
            href="/"
            className={`hover:scale-100 duration-500 ${
              pathname === "/" ? "text-white" : " text-[#5E548E]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/questions"
            className={`hover:scale-100 duration-500 ${
              pathname === "/questions" ? "text-white" : " text-[#5E548E]"
            }`}
          >
            Questions
          </Link>
          <Link
            href="/jobs"
            className={`hover:scale-100 duration-500 ${
              pathname === "/jobs" ? "text-white" : " text-[#5E548E]"
            }`}
          >
            Jobs
          </Link>
          {user ? (
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${
                isSigningOut ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSigningOut ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing Out...
                </span>
              ) : (
                'Sign Out'
              )}
            </button>
          ) : (
            <Link
              href="/signin"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </Link>
          )}
        </div>
        {!showCloseMenu ? (
          <RiMenu3Fill
            className="black md:hidden text-3xl"
            onClick={() => setShowCloseMenu((prev) => !prev)}
          />
        ) : (
          <RiCloseLargeLine
            className="black md:hidden text-3xl"
            onClick={() => setShowCloseMenu((prev) => !prev)}
          >
            Close
          </RiCloseLargeLine>
        )}
        {showCloseMenu && (
          <div className="absolute top-20 bg-white rounded-lg text-lg flex flex-col gap-y-2 px-9 py-5 justify-center items-center right-10">
            <Link
              href="/"
              className={`hover:scale-100 duration-500 ${
                pathname === "/" ? "text-[#5E548E]" : "text-black"
              }`}
              onClick={() => setShowCloseMenu((prev) => !prev)}
            >
              Home
            </Link>
            <Link
              href="/questions"
              className={`hover:scale-100 duration-500 ${
                pathname === "/questions" ? "text-[#5E548E]" : "text-black"
              }`}
              onClick={() => setShowCloseMenu((prev) => !prev)}
            >
              Questions
            </Link>
            <Link
              href="/jobs"
              className={`hover:scale-100 duration-500 ${
                pathname === "/jobs" ? "text-[#5E548E]" : "text-black"
              }`}
              onClick={() => setShowCloseMenu((prev) => !prev)}
            >
              Jobs
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setShowCloseMenu((prev) => !prev);
                }}
                disabled={isSigningOut}
                className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${
                  isSigningOut ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSigningOut ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Out...
                  </span>
                ) : (
                  'Sign Out'
                )}
              </button>
            ) : (
              <Link
                href="/signin"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowCloseMenu((prev) => !prev)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;