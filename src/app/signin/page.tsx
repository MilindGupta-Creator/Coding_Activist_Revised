"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Link from "next/link";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        setTimeout(() => router.push("/questions"), 2000);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setMessage("Signin successful! Redirecting...");
      // Sign-in successful, redirect will be handled by the useEffect hook
    } catch (error) {
      setError("Failed to sign in. Please check your email and password.");
      console.error("Sign-in error:", error);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    setIsResettingPassword(true);

    if (!email) {
      setError("Please enter your email address.");
      setIsResettingPassword(false);
      return;
    }

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError("Failed to send password reset email. Please try again.");
      console.error("Password reset error:", error);
    }

    setIsResettingPassword(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="mt-20 w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Sign In
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Want to create a new Account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <button
            onClick={handleForgotPassword}
            disabled={isResettingPassword}
            className="flex-grow ml-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            {isResettingPassword ? "Sending..." : "Forgot Password?"}
          </button>
          {message && (
            <div
              className={`mt-4 p-4 rounded-md ${
                message.includes("successful")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } transition-all duration-300 ease-in-out`}
            >
              {message}
            </div>
          )}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
