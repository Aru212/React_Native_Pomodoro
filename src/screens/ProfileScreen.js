// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import useSessionStore from '../store/sessionStore';

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { isDark, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const { sessions } = useSessionStore();

  const completedSessions = sessions.filter((s) => s.completed);
  const totalMinutes = completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  const firstName = user?.displayName?.split(' ')[0] || 'Student';
  const initials = user?.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'SS';

  const SettingRow = ({ icon, title, subtitle, right, onPress, color }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.settingRow, { borderBottomColor: colors.border }]}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.settingIcon, { backgroundColor: (color || colors.primary) + '15' }]}>
        <Ionicons name={icon} size={20} color={color || colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      {right || (onPress && <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />)}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={[styles.displayName, { color: colors.text }]}>{user?.displayName}</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.statNum, { color: colors.text }]}>{sessions.length}</Text>
            <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Total Sessions</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.statNum, { color: colors.text }]}>{completedSessions.length}</Text>
            <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Completed</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.statNum, { color: colors.text }]}>
              {Math.round(totalMinutes / 60 * 10) / 10}h
            </Text>
            <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Study Time</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>APPEARANCE</Text>
          <SettingRow
            icon={isDark ? 'moon' : 'sunny'}
            title="Dark Mode"
            subtitle={isDark ? 'Currently enabled' : 'Currently disabled'}
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFF"
              />
            }
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ACCOUNT</Text>
          <SettingRow
            icon="person-outline"
            title="Account Info"
            subtitle={user?.email}
          />
          <SettingRow
            icon="shield-outline"
            title="Privacy"
            subtitle="Your data stays with you"
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ABOUT</Text>
          <SettingRow
            icon="information-circle-outline"
            title="Smart Study Planner"
            subtitle="Version 1.0.0"
          />
          <SettingRow
            icon="heart-outline"
            title="Built with ❤️"
            subtitle="React Native + Firebase + Expo"
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <SettingRow
            icon="log-out-outline"
            title="Sign Out"
            color={colors.error}
            onPress={handleLogout}
          />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 20, fontWeight: '700' },
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: '#FFF', fontSize: 28, fontWeight: '700' },
  displayName: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  email: { fontSize: 14 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  statBox: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800' },
  statLbl: { fontSize: 11, marginTop: 2, textAlign: 'center' },
  section: { marginHorizontal: 20, borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  sectionTitle: { fontSize: 11, fontWeight: '600', letterSpacing: 1, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  settingIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  settingContent: { flex: 1 },
  settingTitle: { fontSize: 15, fontWeight: '500' },
  settingSubtitle: { fontSize: 12, marginTop: 1 },
});

export default ProfileScreen;
