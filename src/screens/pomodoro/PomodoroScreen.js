import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { usePomodoroTimer } from "../../hooks/usePomodoroTimer";

export default function PomodoroScreen() {
  const { timeLeft, start, pause, reset, mode } = usePomodoroTimer();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const format = (t) => String(t).padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.mode}>{mode.toUpperCase()}-MODE</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>
          {format(minutes)}:{format(seconds)}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.txt}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={pause}>
          <Text style={styles.txt}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnReset} onPress={reset}>
          <Text style={styles.txt}>Reset</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FB"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },

  mode: {
    width: "100%",
    textAlign: "center",
    fontSize: 28,
    color: "#666",
    marginBottom: 10
  },

  timerContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    elevation: 5,
    marginVertical: 20
  },

  timer: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#333"
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10
  },

  btn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8
  },

  btnReset: {
    backgroundColor: "#FF5252",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8
  },

  txt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
};