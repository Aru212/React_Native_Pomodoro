import React from "react";
import { View, Text } from "react-native";

export default function StatsCard({ title, value }) {
  return (
    <View
      style={{
        backgroundColor: "#4A90E2",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>{title}</Text>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        {value}
      </Text>
    </View>
  );
}