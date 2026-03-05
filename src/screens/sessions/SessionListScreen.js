import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { useSessionStore } from '../../store/useSessionStore';
import { getSessions, deleteSession, updateSession } from '../../services/sessionService';

export default function SessionListScreen({ navigation }) {
  const { user } = useAuthStore();
  const { sessions, setSessions } = useSessionStore();

  const loadSessions = async () => {
    const data = await getSessions(user.uid);
    setSessions(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadSessions);
    return unsubscribe;
  }, [navigation]);

  const markCompleted = async (id) => {
    await updateSession(user.uid, id, { completed: true });
    loadSessions();
  };

  const removeSession = async (id) => {
    await deleteSession(user.uid, id);
    loadSessions();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        style={button}
        onPress={() => navigation.navigate('AddSession')}
      >
        <Text style={{ color: '#fff',width:'100%',textAlign:'center'}}>+ Add Session</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={{
    backgroundColor: "#2ECC71",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  }}
  onPress={() => navigation.navigate("Dashboard")}
>
  <Text style={{ color: "#fff", textAlign: "center" }}>
    View Analytics Dashboard
  </Text>
</TouchableOpacity>

      <FlatList
  data={sessions}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={card}>
      <Text>{item.subject}</Text>
      <Text>{item.topic}</Text>
      <Text>{item.duration} mins</Text>
      <Text>Status: {item.completed ? "Completed" : "Pending"}</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          width: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          {!item.completed && (
            <TouchableOpacity onPress={() => markCompleted(item.id)}>
              <Text style={{ color: "green" }}>Mark Complete</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
          disabled={item.completed}
            onPress={() => navigation.navigate("Pomodoro")}
          >
            <Text style={{ color: item.completed ? "gray" : "blue" }}>Start </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => removeSession(item.id)}>
            <Text style={{ color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
/>
    </View>
  );
}

const button = {
  backgroundColor: '#4A90E2',
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 15
};

const card = {
  borderWidth: 1,
  padding: 15,
  marginBottom: 10,
  borderRadius: 8
};