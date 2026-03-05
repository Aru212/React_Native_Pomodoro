import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

export const createSession = async (uid, sessionData) => {

  const sessionRef = collection(db, "users", uid, "sessions");

  return await addDoc(sessionRef, {
    ...sessionData,
    completed: false,
    createdAt: new Date()
  });
};

export const getSessions = async (uid) => {

  const q = query(
    collection(db, "users", uid, "sessions"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data()
  }));
};

export const updateSession = async (uid, sessionId, updatedData) => {

  const sessionDoc = doc(db, "users", uid, "sessions", sessionId);

  return await updateDoc(sessionDoc, updatedData);
};

export const deleteSession = async (uid, sessionId) => {

  const sessionDoc = doc(db, "users", uid, "sessions", sessionId);

  return await deleteDoc(sessionDoc);
};