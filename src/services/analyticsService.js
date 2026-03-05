import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const getAnalyticsData = async (uid) => {
  const sessionsRef = collection(db, "users", uid, "sessions");
  const snapshot = await getDocs(sessionsRef);

  let totalMinutes = 0;
  let completedCount = 0;
  const subjectMap = {};

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data.completed) {
      completedCount++;
      totalMinutes += data.duration;

      if (subjectMap[data.subject]) {
        subjectMap[data.subject] += data.duration;
      } else {
        subjectMap[data.subject] = data.duration;
      }
    }
  });

  return {
    totalHours: (totalMinutes / 60).toFixed(1),
    completedCount,
    subjectMap,
  };
};