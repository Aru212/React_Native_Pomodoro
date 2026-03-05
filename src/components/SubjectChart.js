import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function SubjectChart({ subjectMap }) {
  const screenWidth = Dimensions.get("window").width;

  const data = Object.keys(subjectMap).map((subject, index) => ({
    name: subject,
    duration: subjectMap[subject],
    color: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"][index % 4],
    legendFontColor: "#333",
    legendFontSize: 12,
  }));

  return (
    <PieChart
      data={data}
      width={screenWidth - 20}
      height={220}
      chartConfig={{
        color: () => `rgba(0,0,0,1)`,
      }}
      accessor={"duration"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      absolute
    />
  );
}