import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

/**
 * CANDIDATE: Toggles a job in the user's saved jobs array.
 */
export const toggleSavedJob = async (userId, jobId, isCurrentlySaved) => {
  const userRef = doc(db, "users", userId);

  try {
    if (isCurrentlySaved) {
      await updateDoc(userRef, { savedJobs: arrayRemove(jobId) });
      return false;
    } else {
      await updateDoc(userRef, { savedJobs: arrayUnion(jobId) });
      return true;
    }
  } catch (error) {
    console.error("Database transaction failed:", error);
    throw new Error("Unable to modify saved jobs.");
  }
};

/**
 * EMPLOYER: Writes a new job posting to the database.
 */
export const createJobPosting = async (employerId, companyName, jobData) => {
  try {
    const jobsRef = collection(db, "jobs");
    const newJob = {
      ...jobData,
      employerId,
      companyName: companyName || "Independent Employer",
      status: "active",
      applicantsCount: 0,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(jobsRef, newJob);
    return { id: docRef.id, ...newJob };
  } catch (error) {
    console.error("Failed to post job:", error);
    throw new Error("Unable to publish job posting at this time.");
  }
};

/**
 * PUBLIC/CANDIDATE: Retrieves jobs based on search filters.
 */
export const fetchJobs = async () => {
  try {
    const jobsRef = collection(db, "jobs");
    // Fetch all active jobs, newest first
    const q = query(
      jobsRef,
      where("status", "==", "active"),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const jobs = [];

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    return jobs;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return []; // Return empty array if it fails so the UI doesn't crash
  }
};
