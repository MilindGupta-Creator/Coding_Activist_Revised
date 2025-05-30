"use client";

import {
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  serverTimestamp,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Home = () => {
  const [jsonData, setJsonData] = useState<string>("");
  const [docId, setDocId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [user, setUser] = useState<any>(null); // Firebase user object
  const [deletedJobs, setDeletedJobs] = useState<
    Array<{ id: string; data: any }>
  >([]); // Stores deleted jobs for undo
  const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null); // Timeout for undo

  const auth = getAuth();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "milindgupta578@gmail.com") {
        setUser(user);
      } else {
        setUser(null);
        if (user) {
          signOut(auth); // Force logout if the user is not authorized
          toast.error("You are not authorized to access this page.");
        }
      }
    });
    return () => unsubscribe();
  }, [auth]);

  type ParsedDataType = Array<Record<string, any>>;

  const formatJson = (): ParsedDataType | null => {
    try {
      let correctedData = jsonData
        .replace(/([{,])(\s*)([A-Za-z0-9_]+)(\s*):/g, '$1"$3":') // Add quotes around keys
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/,(\s*[\]}])/g, "$1") // Remove trailing commas
        .replace(/\[\^[0-9]+\^\]/g, "") // Remove citation markers like [^1^]
        .replace(/\[[0-9]+\]/g, ""); // Remove citation markers like [2]

      if (!correctedData.trim().startsWith("[")) {
        correctedData = `[${correctedData.trim()}]`;
      }
      console.log("Corrected Data:", correctedData);
      const parsedData: ParsedDataType = JSON.parse(correctedData);
      const formattedData = JSON.stringify(parsedData, null, 2); // Format with 2-space indentation
      console.log(formattedData);
      setJsonData(formattedData);
      return parsedData;
    } catch (e) {
      toast.error("Invalid JSON format");
      console.error("Invalid JSON: ", e);
      return null;
    }
  };

  const uploadData = async () => {
    if (!user) {
      toast.error("You must be logged in to upload jobs.");
      return;
    }

    console.log("calling function");
    const dataCollection = collection(db, "jobsDataCollection");

    try {
      const parsedData = formatJson(); // Format and parse the JSON data
      if (!parsedData) return; // Exit if JSON is invalid

      for (const item of parsedData) {
        const { id, ...itemWithoutId } = item;
        const newItem = { ...itemWithoutId, createdAt: serverTimestamp() };
        const docRef = await addDoc(dataCollection, newItem);
        await updateDoc(docRef, { id: docRef.id });
        toast.success(
          `Document with generated id ${docRef.id} added successfully`
        );
      }
    } catch (e) {
      toast.error("Error adding document");
      console.error("Error adding document: ", e);
    }
  };

  const deleteData = async () => {
    if (!user) {
      toast.error("You must be logged in to delete jobs.");
      return;
    }

    console.log("deleting document");
    try {
      const docRef = doc(db, "jobsDataCollection", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const deletedJob = { id: docId, data: docSnap.data() };
        await deleteDoc(docRef);
        setDeletedJobs([deletedJob]); // Store deleted job for undo
        toast.success(`Document with id ${docId} deleted successfully`);

        // Set a timeout to clear the undo option after 5 seconds
        if (undoTimeout) clearTimeout(undoTimeout);
        setUndoTimeout(
          setTimeout(() => {
            setDeletedJobs([]);
          }, 5000)
        );
      } else {
        toast.error(`Document with id ${docId} does not exist`);
      }
    } catch (e) {
      toast.error("Error deleting document");
      console.error("Error deleting document: ", e);
    }
  };

  const deleteJobsInTimeFrame = async () => {
    if (!user) {
      toast.error("You must be logged in to delete jobs.");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please provide both start and end dates.");
      return;
    }

    if (startDate > endDate) {
      toast.error("Start date must be before end date.");
      return;
    }

    try {
      const startTimestamp = Timestamp.fromDate(new Date(startDate));
      const endTimestamp = Timestamp.fromDate(new Date(endDate));

      const jobsCollection = collection(db, "jobsDataCollection");
      const q = query(
        jobsCollection,
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<=", endTimestamp)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No jobs found in the specified time frame.");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to delete ${querySnapshot.size} jobs between ${startDate} and ${endDate}?`
      );

      if (confirmed) {
        const batch = writeBatch(db);
        const deletedJobs: Array<{ id: string; data: any }> = []; // Specify the type

        querySnapshot.forEach((doc) => {
          deletedJobs.push({ id: doc.id, data: doc.data() });
          batch.delete(doc.ref);
        });

        await batch.commit();
        setDeletedJobs(deletedJobs); // Store deleted jobs for undo
        toast.success(
          `Deleted ${querySnapshot.size} jobs between ${startDate} and ${endDate}`
        );

        // Set a timeout to clear the undo option after 5 seconds
        if (undoTimeout) clearTimeout(undoTimeout);
        setUndoTimeout(
          setTimeout(() => {
            setDeletedJobs([]);
          }, 5000)
        );
      }
    } catch (e) {
      toast.error("Error deleting jobs in time frame");
      console.error("Error deleting jobs in time frame: ", e);
    }
  };

  const undoDelete = async () => {
    if (!user) {
      toast.error("You must be logged in to undo deletions.");
      return;
    }

    try {
      const batch = writeBatch(db);
      for (const job of deletedJobs) {
        const docRef = doc(db, "jobsDataCollection", job.id);
        batch.set(docRef, job.data);
      }
      await batch.commit();
      toast.success("Undo successful: Deleted jobs restored.");
      setDeletedJobs([]); // Clear the undo list
    } catch (e) {
      toast.error("Error undoing deletion");
      console.error("Error undoing deletion: ", e);
    }
  };

  const login = async () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    if (email && password) {
      try {
        if (email !== "milindgupta578@gmail.com") {
          toast.error("You are not authorized to access this page.");
          return;
        }
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully");
      } catch (e) {
        toast.error("Error logging in");
        console.error("Error logging in: ", e);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (e) {
      toast.error("Error logging out");
      console.error("Error logging out: ", e);
    }
  };

  const copyTodaysJobDetails = async () => {
    if (!user) {
      toast.error("You must be logged in to copy jobs.");
      return;
    }

    try {
      // Get today's start and end timestamps
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const startTimestamp = Timestamp.fromDate(today);
      const endTimestamp = Timestamp.fromDate(tomorrow);

      const jobsCollection = collection(db, "jobsDataCollection");
      const q = query(
        jobsCollection,
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<", endTimestamp)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No jobs found for today.");
        return;
      }

      // Format jobs into numbered list with individual job URLs
      const jobsList = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return `${index + 1}. ${data.role} at ${data.name} - https://codingactivist.com/job-details/${doc.id}`;
      }).join('\n\n');

      // Copy to clipboard
      await navigator.clipboard.writeText(jobsList);
      toast.success("Today's job details copied to clipboard!");
    } catch (e) {
      toast.error("Error copying jobs");
      console.error("Error copying jobs: ", e);
    }
  };

  const copyTodaysJobs = async () => {
    if (!user) {
      toast.error("You must be logged in to copy jobs.");
      return;
    }

    try {
      // Get today's start and end timestamps
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const startTimestamp = Timestamp.fromDate(today);
      const endTimestamp = Timestamp.fromDate(tomorrow);

      const jobsCollection = collection(db, "jobsDataCollection");
      const q = query(
        jobsCollection,
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<", endTimestamp)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No jobs found for today.");
        return;
      }

      // Format jobs into numbered list with main jobs page URL
      const jobsList = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return `${index + 1}. ${data.role} at ${data.name} - https://codingactivist.com/jobs`;
      }).join('\n\n');

      // Copy to clipboard
      await navigator.clipboard.writeText(jobsList);
      toast.success("Today's jobs copied to clipboard!");
    } catch (e) {
      toast.error("Error copying jobs");
      console.error("Error copying jobs: ", e);
    }
  };

  return (
    <div className="pt-20 h-screen items-center justify-center space-y-4 flex md:flex-row flex-col gap-4">
      {!user ? (
        <button
          className="border px-3 py-4 rounded-lg bg-blue-500 text-white"
          onClick={login}
        >
          Login
        </button>
      ) : (
        <>
          <div>
            <textarea
              className="border p-2 w-full max-w-lg text-black"
              rows={10}
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder="Paste your JSON data here"
            />
            <button
              className="border px-3 py-4 rounded-lg bg-black text-white"
              onClick={uploadData}
            >
              Upload JSON File
            </button>
          </div>

          <div>
            <input
              className="border p-2 w-full max-w-lg text-black"
              type="text"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              placeholder="Enter document ID to delete"
            />
            <button
              className="border px-3 py-4 rounded-lg bg-red-500 text-white mt-4"
              onClick={deleteData}
            >
              Delete Job
            </button>
          </div>

          <div>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
              className="border p-2 w-full max-w-lg text-black"
            />
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
              className="border p-2 w-full max-w-lg text-black mt-4"
            />
            <button
              className="border px-3 py-4 rounded-lg bg-red-500 text-white mt-4"
              onClick={deleteJobsInTimeFrame}
            >
              Delete Jobs in Time Frame
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="border px-3 py-4 rounded-lg bg-green-500 text-white"
              onClick={copyTodaysJobDetails}
            >
              Copy Today's Job Details
            </button>
            <button
              className="border px-3 py-4 rounded-lg bg-blue-500 text-white"
              onClick={copyTodaysJobs}
            >
              Copy Today's Jobs
            </button>
          </div>

          {deletedJobs.length > 0 && (
            <button
              className="border px-3 py-4 rounded-lg bg-green-500 text-white mt-4"
              onClick={undoDelete}
            >
              Undo Delete
            </button>
          )}

          <button
            className="border px-3 py-4 rounded-lg bg-gray-500 text-white mt-4"
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
