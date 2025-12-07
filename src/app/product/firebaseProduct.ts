import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Use a dedicated Firebase config module for the /product area.
// Prefer PRODUCT_ envs, but gracefully fall back to the main Firebase envs
// (NEXT_PUBLIC_FIREBASE_*) so it works even if you haven't set up a
// completely separate project yet.
const productFirebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_PRODUCT_FIREBASE_API_KEY ||
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    process.env.NEXT_PUBLIC_PRODUCT_FIREBASE_AUTH_DOMAIN ||
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:
    process.env.NEXT_PUBLIC_PRODUCT_FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_PRODUCT_FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_PRODUCT_FIREBASE_MESSAGING_SENDER_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    process.env.NEXT_PUBLIC_PRODUCT_FIREBASE_APP_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:
    process.env.NEXT_PUBLIC_PRODUCT_FIREBASE_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// We give the product app its own name so it stays isolated from the main app config.
const PRODUCT_APP_NAME = "product-app";

function getProductApp(): FirebaseApp {
  const existing = getApps().find((app) => app.name === PRODUCT_APP_NAME);
  if (existing) return existing;
  return initializeApp(productFirebaseConfig, PRODUCT_APP_NAME);
}

const productApp = getProductApp();

// Auth instance dedicated to /product pages
export const productAuth = getAuth(productApp);


