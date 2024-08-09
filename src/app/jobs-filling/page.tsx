"use client"

import {
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import jobsData from "../../utils/jobsData";
import { db } from "@/firebase/firebase";
import { collection } from "firebase/firestore";

const Home = () => {
  const uploadData = async () => {
    console.log("calling function")
    const dataCollection = collection(db, "jobsDataCollection");


    try {
      for (const item of jobsData) {
        // Check if the document with the same unique field (apply url) already exists
        const q = query(dataCollection, where("apply", "==", item.apply));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Destructure item to exclude id
          const { id, ...itemWithoutId } = item;
          // Add createdAt field
          const newItem = { ...itemWithoutId, createdAt: serverTimestamp() };
          // Add document without id
          const docRef = await addDoc(dataCollection, newItem);
          // Optionally, update the document with the new id
          await updateDoc(docRef, { id: docRef.id });
          console.log(
            `Document with generated id ${docRef.id} added successfully`
          );
        } else {
          console.log(`Document with name ${item.name} already exists`);
        }
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="pt-20 h-screen flex items-center justify-center">
      <button className="border px-3 py-4 rounded-lg bg-black" onClick={uploadData}>
        Upload JSON Data
      </button>
    </div>
  );
};

export default Home;
