import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SessionListScreen from '../screens/sessions/SessionListScreen';
import AddSessionScreen from '../screens/sessions/AddSessionScreen';
import PomodoroScreen from "../screens/pomodoro/PomodoroScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sessions" component={SessionListScreen} />
      <Stack.Screen name="AddSession" component={AddSessionScreen} />
      <Stack.Screen name="Pomodoro" component={PomodoroScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}