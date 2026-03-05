import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert,TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Login Error','Please enter correct Credentials');
      // Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text> */}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={inputStyle}
      />

      <View style={passwordContainer}>
  <TextInput
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    style={{ flex: 1 }}
  />

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Text style={{ fontSize: 18 }}>
      {showPassword ? "🙈" : "👁"}
    </Text>
  </TouchableOpacity>
</View>
      
      <TouchableOpacity onPress={login}
        style={{marginLeft:'25%',backgroundColor: '#4A90E2',padding: 10,borderRadius: 10,alignItems: 'center',marginBottom: 5,width:'50%'}}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}> Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} 
            style={{marginLeft:'25%',padding:10,alignItems:'center',width:'50%'}}>
            <Text style={{ color: '#4A90E2', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Click to Register</Text>
          </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  padding: 12,
  marginBottom: 12,
  borderRadius: 8
};
const passwordContainer = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 12
};