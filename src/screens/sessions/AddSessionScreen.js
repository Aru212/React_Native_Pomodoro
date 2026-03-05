import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAuthStore } from "../../store/useAuthStore";
import { createSession } from "../../services/sessionService";
import { scheduleStudyReminder } from "../../services/notificationService";

export default function AddSessionScreen({ navigation }) {

  const user = useAuthStore((state) => state.user);

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleCreate = async () => {

    try {

      if (!subject || !topic || !duration) {
        Alert.alert("Error", "All fields required");
        return;
      }

      const sessionData = {
        subject,
        topic,
        duration: parseInt(duration),
        scheduledAt: date
      };

      await createSession(user.uid, sessionData);

      await scheduleStudyReminder(date);

      Alert.alert("Success", "Session Created");

      navigation.goBack();

    } catch (error) {

      console.log(error);
      Alert.alert("Error", error.message);

    }

  };

  return (
    <View style={{ padding: 20 }}>

      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Create Study Session
      </Text>

      <TextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
        style={input}
      />

      <TextInput
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
        style={input}
      />

      <TextInput
        placeholder="Duration (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        style={input}
      />

      <TouchableOpacity style={btn} onPress={() => setShowDate(true)}>
        <Text>Select Date</Text>
      </TouchableOpacity>

      <TouchableOpacity style={btn} onPress={() => setShowTime(true)}>
        <Text>Select Time</Text>
      </TouchableOpacity>

      <Text style={{ marginVertical: 10 }}>
        Selected: {date.toLocaleString()}
      </Text>

      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={date}
          mode="time"
          onChange={(event, selectedTime) => {
            setShowTime(false);
            if (selectedTime) setDate(selectedTime);
          }}
        />
      )}

      <TouchableOpacity style={createBtn} onPress={handleCreate}>
        <Text style={{ color: "#fff" }}>Create Session</Text>
      </TouchableOpacity>

    </View>
  );
}

const input = {
  borderWidth: 1,
  padding: 12,
  marginBottom: 10,
  borderRadius: 8
};

const btn = {
  padding: 15,
  backgroundColor: "#eee",
  borderRadius: 8,
  marginBottom: 10
};

const createBtn = {
  backgroundColor: "#4A90E2",
  padding: 15,
  alignItems: "center",
  borderRadius: 8
};