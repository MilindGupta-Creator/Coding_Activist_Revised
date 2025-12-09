"use client";

import Image from "next/image";
import Logo from "../../../public/assets/main-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { ProductNavLink } from "../three/ProductNavLink";

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
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className={`w-full transition-all duration-300 ${'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50'
      }`}>
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-x-3 group relative z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative">
            {/* Learning Badge Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-400/40 via-accent-500/40 to-brand-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-400/30 to-accent-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Certificate Badge Overlay */}
            <div className="absolute -top-1 -right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-bounce">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <Image
              src={Logo}
              alt="logo"
              width="46"
              height="46"
              className="relative bg-white rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand-500/50 ring-2 ring-brand-500/20 group-hover:ring-brand-500/40"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="font-bold text-white text-lg group-hover:text-brand-300 transition-all duration-300">Coding Activist</p>
            </div>
            
          </div>
        </Link>
        <div className="md:flex items-center gap-x-6 lg:gap-x-8 hidden relative">
          <Link
            href="/"
            className={`relative text-sm lg:text-base font-medium transition-all duration-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 ${pathname === "/" ? "text-white" : "text-gray-300"
              } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 ${pathname === "/" ? "after:w-3/4" : "hover:after:w-3/4"
              }`}
          >
            Home
          </Link>
          <Link
            href="/questions"
            className={`relative text-sm lg:text-base font-medium transition-all duration-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 ${pathname === "/questions" ? "text-white" : "text-gray-300"
              } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 ${pathname === "/questions" ? "after:w-3/4" : "hover:after:w-3/4"
              }`}
          >
            Questions
          </Link>
          <Link
            href="/visualizing_paths"
            className={`relative text-sm lg:text-base font-medium transition-all duration-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 ${pathname === "/visualizing_paths" ? "text-white" : "text-gray-300"
              } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 ${pathname === "/visualizing_paths" ? "after:w-3/4" : "hover:after:w-3/4"
              }`}
          >
            Tech Roadmap
          </Link>
          <ProductNavLink href="/product" />
          <div className="w-px h-6 bg-gray-700/50 mx-2"></div>
          <Link
            href="/jobs"
            className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 hover:scale-105"
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
              className={`relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 active:scale-95 ${isSigningOut ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isSigningOut ? (
                <span className="flex items-center relative z-10">
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
                <span className="relative z-10">Sign Out</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <Link
              href="/signin"
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          )}
        </div>
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          onClick={() => setShowCloseMenu(!showCloseMenu)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-300 transition-all duration-300 ${showCloseMenu ? 'rotate-45' : '-translate-y-1.5'
              }`}></span>
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-300 transition-all duration-300 ${showCloseMenu ? 'opacity-0' : 'opacity-100'
              }`}></span>
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-300 transition-all duration-300 ${showCloseMenu ? '-rotate-45' : 'translate-y-1.5'
              }`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${showCloseMenu
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }`}>
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCloseMenu(false)}
          ></div>
          <div className={`absolute top-0 right-0 w-80 max-w-[85vw] bg-gradient-to-b from-[#0a0a0a] via-[#181818] to-[#0a0a0a] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${showCloseMenu ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
              <div className="flex flex-col gap-y-2">
                <Link
                  href="/"
                  className={`text-left text-lg font-medium transition-all duration-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 border-l-2 ${pathname === "/" ? "text-white border-blue-500" : "text-gray-300 border-transparent hover:border-blue-500"
                    }`}
                  onClick={() => setShowCloseMenu(false)}
                >
                  Home
                </Link>
                <Link
                  href="/questions"
                  className={`text-left text-lg font-medium transition-all duration-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 border-l-2 ${pathname === "/questions" ? "text-white border-blue-500" : "text-gray-300 border-transparent hover:border-blue-500"
                    }`}
                  onClick={() => setShowCloseMenu(false)}
                >
                  Questions
                </Link>
                <Link
                  href="/visualizing_paths"
                  className={`text-left text-lg font-medium transition-all duration-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 border-l-2 ${pathname === "/visualizing_paths" ? "text-white border-blue-500" : "text-gray-300 border-transparent hover:border-blue-500"
                    }`}
                  onClick={() => setShowCloseMenu(false)}
                >
                  Tech Roadmap
                </Link>
                <ProductNavLink
                  href="/product"
                  mobile={true}
                  onClick={() => setShowCloseMenu(false)}
                />

                <div className="h-px bg-gray-700/50 my-4"></div>

                <Link
                  href="/jobs"
                  className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 hover:scale-105"
                  onClick={() => setShowCloseMenu(false)}
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
                      setShowCloseMenu(false);
                    }}
                    disabled={isSigningOut}
                    className={`mt-4 relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 active:scale-95 ${isSigningOut ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {isSigningOut ? (
                      <span className="flex items-center justify-center relative z-10">
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
                      <span className="relative z-10">Sign Out</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ) : (
                  <Link
                    href="/signin"
                    className="mt-4 relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95"
                    onClick={() => setShowCloseMenu(false)}
                  >
                    <span className="relative z-10">Sign In</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;