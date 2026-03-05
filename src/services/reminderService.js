export const scheduleReminder = (subject, sessionDateTime) => {

  const reminderTime = new Date(sessionDateTime.getTime() - 10 * 60 * 1000);

  const delay = reminderTime.getTime() - Date.now();

  if (delay <= 0) return;

  setTimeout(() => {
    alert(`📚 Study Reminder\n${subject} session starts in 10 minutes`);
  }, delay);

};