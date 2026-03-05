import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { getAnalyticsData } from "../../services/analyticsService";
import StatsCard from "../../components/StatsCard";
import SubjectChart from "../../components/SubjectChart";

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user);

  const [analytics, setAnalytics] = useState({
    totalHours: 0,
    completedCount: 0,
    subjectMap: {},
  });

  const loadAnalytics = async () => {
    const data = await getAnalyticsData(user.uid);
    setAnalytics(data);
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <ScrollView style={{ padding: 15 }}>
      <StatsCard title="Total Study Hours" value={analytics.totalHours} />
      <StatsCard title="Completed Sessions" value={analytics.completedCount} />

      <SubjectChart subjectMap={analytics.subjectMap} />
    </ScrollView>
  );
}