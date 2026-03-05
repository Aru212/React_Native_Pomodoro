import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import useSessionStore from '../store/useSessionStore';
import PomodoroTimer from '../components/PomodoroTimer';
import { colors, spacing, fontSizes, borderRadius } from '../utils/theme';

const SUBJECTS = ['Math', 'Science', 'History', 'English', 'Programming', 'Other'];
const DURATIONS = [25, 50, 90];

export default function CreateSessionScreen({ route, navigation }) {
  const existingSession = route?.params?.session;
  const { user } = useAuth();
  const { addSession, markComplete } = useSessionStore();

  const [subject, setSubject] = useState(existingSession?.subject || SUBJECTS[0]);
  const [topic, setTopic] = useState(existingSession?.topic || '');
  const [duration, setDuration] = useState(existingSession?.duration || 25);
  const [timerStarted, setTimerStarted] = useState(false);
  const [activeSession, setActiveSession] = useState(existingSession || null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!topic.trim()) {
      Alert.alert('Error', 'Please enter a topic.');
      return;
    }
    setLoading(true);
    try {
      const session = await addSession(user.uid, {
        subject,
        topic: topic.trim(),
        duration,
        scheduledAt: new Date().toISOString(),
        pomodoroTarget: Math.ceil(duration / 25),
      });
      setActiveSession(session);
      setTimerStarted(true);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (minutesStudied) => {
    if (!activeSession) return;
    try {
      await markComplete(user.uid, activeSession.id, minutesStudied);
      Alert.alert(
        '🎉 Session Complete!',
        `You studied ${subject} for ${minutesStudied} minutes!`,
        [{ text: 'Done', onPress: () => navigation.goBack() }]
      );
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  if (timerStarted && activeSession) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.timerContainer}>
        <Text style={styles.timerTitle}>{activeSession.subject}</Text>
        <Text style={styles.timerTopic}>{activeSession.topic}</Text>
        <PomodoroTimer session={activeSession} onComplete={handleComplete} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Subject</Text>
      <View style={styles.chips}>
        {SUBJECTS.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, subject === s && styles.chipActive]}
            onPress={() => setSubject(s)}
          >
            <Text style={[styles.chipText, subject === s && styles.chipTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Topic / Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Chapter 5 - Derivatives"
        value={topic}
        onChangeText={setTopic}
        multiline
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Duration (minutes)</Text>
      <View style={styles.chips}>
        {DURATIONS.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.chip, duration === d && styles.chipActive]}
            onPress={() => setDuration(d)}
          >
            <Text style={[styles.chipText, duration === d && styles.chipTextActive]}>{d} min</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleCreate} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Creating...' : '▶ Start Session'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  timerContainer: { padding: spacing.lg, alignItems: 'center', gap: spacing.md },
  timerTitle: { fontSize: fontSizes.xxl, fontWeight: '800', color: colors.text },
  timerTopic: { fontSize: fontSizes.md, color: colors.textSecondary, marginBottom: spacing.md },
  label: { fontSize: fontSizes.sm, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primary + '15' },
  chipText: { color: colors.textSecondary, fontWeight: '600', fontSize: fontSizes.sm },
  chipTextActive: { color: colors.primary },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
    minHeight: 80,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  btnText: { color: '#fff', fontSize: fontSizes.md, fontWeight: '700' },
});
