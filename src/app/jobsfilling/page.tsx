"use client";

import {
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [jsonData, setJsonData] = useState<string>("");
  const [docId, setDocId] = useState<string>("");

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
    console.log("calling function");
    const dataCollection = collection(db, "jobsDataCollection");

    try {
      const parsedData = formatJson(); // Format and parse the JSON data
      if (!parsedData) return; // Exit if JSON is invalid

      // Log the formatted JSON data
      // console.log("Formatted JSON Data:", jsonData);

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
    console.log("deleting document");
    try {
      const docRef = doc(db, "jobsDataCollection", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);
        toast.success(`Document with id ${docId} deleted successfully`);
      } else {
        toast.error(`Document with id ${docId} does not exist`);
      }
    } catch (e) {
      toast.error("Error deleting document");
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div className="pt-20 h-screen items-center justify-center space-y-4 flex md:flex-row flex-col gap-4">
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
    </div>
  );
};

export default Home;
