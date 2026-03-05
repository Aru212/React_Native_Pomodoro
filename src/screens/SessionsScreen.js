// src/screens/SessionsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import useSessionStore from '../store/sessionStore';
import SessionCard from '../components/SessionCard';
import EmptyState from '../components/EmptyState';

const TABS = ['Upcoming', 'Completed'];

const SessionsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { loading, fetchSessions, removeSession, completeSession, getUpcomingSessions, getCompletedSessions } = useSessionStore();
  const [activeTab, setActiveTab] = useState('Upcoming');

  useEffect(() => {
    fetchSessions();
  }, []);

  const sessions = activeTab === 'Upcoming' ? getUpcomingSessions() : getCompletedSessions();

  const handleEdit = (session) => navigation.navigate('AddSession', { session });
  const handleStartPomodoro = (session) => navigation.navigate('Pomodoro', { session });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Study Sessions</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddSession')}
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.inputBg }]}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: colors.card },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? colors.primary : colors.textSecondary },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchSessions} tintColor={colors.primary} />
        }
      >
        {sessions.length === 0 ? (
          <EmptyState
            icon={activeTab === 'Upcoming' ? 'calendar-outline' : 'checkmark-circle-outline'}
            title={activeTab === 'Upcoming' ? 'No Upcoming Sessions' : 'No Completed Sessions'}
            subtitle={
              activeTab === 'Upcoming'
                ? 'Schedule a study session to get started!'
                : 'Complete some sessions to see them here.'
            }
            actionTitle={activeTab === 'Upcoming' ? '+ Add Session' : undefined}
            onAction={activeTab === 'Upcoming' ? () => navigation.navigate('AddSession') : undefined}
          />
        ) : (
          sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onEdit={handleEdit}
              onDelete={removeSession}
              onComplete={completeSession}
              onStartPomodoro={handleStartPomodoro}
            />
          ))
        )}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 26, fontWeight: '800' },
  addBtn: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  tabBar: { flexDirection: 'row', marginHorizontal: 20, borderRadius: 12, padding: 4, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabText: { fontSize: 14, fontWeight: '600' },
  list: { paddingHorizontal: 20, flexGrow: 1 },
});

export default SessionsScreen;
