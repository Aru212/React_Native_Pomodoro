import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/* Configure notification behavior */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/* Request permission + create Android channel */
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    alert("Notification permission not granted");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("study-reminder", {
      name: "Study Reminder",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
};

/* Schedule reminder 10 minutes before session */
export const scheduleStudyReminder = async (sessionDate) => {

  const triggerDate = new Date(sessionDate);

  /* subtract 10 minutes */
  triggerDate.setMinutes(triggerDate.getMinutes() - 10);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📚 Study Reminder",
      body: "Your study session starts in 10 minutes",
      sound: true,
    },

    trigger: {
      type: "date",
      date: triggerDate,
      channelId: "study-reminder",
    },
  });
};