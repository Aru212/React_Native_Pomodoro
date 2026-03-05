import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView,TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async () => {
    if (!name || !email || !phone || !studentClass || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save extra data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        phone,
        class: studentClass,
        createdAt: new Date()
      });

      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Register Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text> */}

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={inputStyle}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={inputStyle}
      />

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={inputStyle}
      />

      <TextInput
        placeholder="Class"
        value={studentClass}
        onChangeText={setStudentClass}
        style={inputStyle}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={inputStyle}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        style={inputStyle}
      />

      <TouchableOpacity onPress={register}
  style={{marginLeft:'25%',backgroundColor: '#4A90E2',padding: 10,borderRadius: 10,alignItems: 'center',marginBottom: 5,width:'50%'}}>
  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}> Register</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Login')} 
      style={{marginLeft:'25%',padding:10,alignItems:'center',width:'50%'}}>
      <Text style={{ color: '#4A90E2', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Go To Login</Text>
    </TouchableOpacity>
    </ScrollView>
  );
}

const inputStyle = {
  borderWidth: 1,
  padding: 12,
  marginBottom: 12,
  borderRadius: 8
};