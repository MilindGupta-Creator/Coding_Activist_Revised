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
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 second delay
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#181818] to-[#2d2d2d] bg-clip-padding backdrop-filter backdrop-blur-sm border-b border-gray-700 shadow-lg" suppressHydrationWarning>
      <div className="flex justify-between items-center py-3 w-4/5 mx-auto" suppressHydrationWarning>
        <Link href="/" className="flex items-center gap-x-3 group" suppressHydrationWarning>
          <Image
            src={Logo}
            alt="logo"
            width="60"
            height="60"
            className="bg-white rounded-full transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <p className="font-bold text-gray-300 text-xl group-hover:text-white transition-colors duration-300">Coding Activist</p>
        </Link>
        <div className="md:flex items-center gap-x-8 hidden relative" suppressHydrationWarning>
          <Link
            href="/"
            className={`relative text-lg font-medium transition-all duration-300 hover:text-white ${
              pathname === "/" ? "text-white" : "text-gray-400"
            } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`}
          >
            Home
          </Link>
          <Link
            href="/questions"
            className={`relative text-lg font-medium transition-all duration-300 hover:text-white ${
              pathname === "/questions" ? "text-white" : "text-gray-400"
            } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`}
          >
            Questions
          </Link>
          <Link
            href="/visualizing_paths"
            className={`relative text-lg font-medium transition-all duration-300 hover:text-white ${
              pathname === "/visualizing_paths" ? "text-white" : "text-gray-400"
            } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`}
          >
            Tech Roadmap
          </Link>
          <Link
            href="/jobs"
            className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm" />
            <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-900/90 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:bg-slate-900/80">
              Jobs
            </span>
          </Link>
          {user ? (
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className={`bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 ${
                isSigningOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSigningOut ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing Out...
                </span>
              ) : (
                "Sign Out"
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
            className="text-gray-300 md:hidden text-3xl hover:text-white transition-colors duration-300"
            onClick={() => setShowCloseMenu((prev) => !prev)}
          />
        ) : (
          <RiCloseLargeLine
            className="text-gray-300 md:hidden text-3xl hover:text-white transition-colors duration-300"
            onClick={() => setShowCloseMenu((prev) => !prev)}
          />
        )}
        {showCloseMenu && (
          <div className="absolute top-20 bg-gradient-to-b from-[#181818] to-[#2d2d2d] rounded-xl text-lg flex flex-col gap-y-4 px-8 py-6 justify-center items-center right-10 shadow-xl border border-gray-700 animate-fadeIn" suppressHydrationWarning>
            <Link
              href="/"
              className={`text-lg font-medium transition-all duration-300 hover:text-white ${
                pathname === "/" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setShowCloseMenu((prev) => !prev)}
            >
              Home
            </Link>
            <Link
              href="/visualizing_paths"
              className={`text-lg font-medium transition-all duration-300 hover:text-white ${
                pathname === "/visualizing_paths" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setShowCloseMenu((prev) => !prev)}
            >
              Tech Roadmap
            </Link>
            <Link
              href="/questions"
              className={`text-lg font-medium transition-all duration-300 hover:text-white ${
                pathname === "/questions" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setShowCloseMenu((prev) => !prev)}
            >
              Questions
            </Link>
            <Link
              href="/jobs"
              className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={() => setShowCloseMenu((prev) => !prev)}
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm" />
              <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-900/90 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:bg-slate-900/80">
                Jobs
              </span>
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setShowCloseMenu((prev) => !prev);
                }}
                disabled={isSigningOut}
                className={`bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 ${
                  isSigningOut ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSigningOut ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing Out...
                  </span>
                ) : (
                  "Sign Out"
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