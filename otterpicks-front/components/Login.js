import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      onLogin();
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Otter Picks</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a0c4e8"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a0c4e8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Log In" color="#003f5c" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0093e9', // Ocean blue background
  },
  title: {
    fontSize: 28,
    color: '#ffffff', // White text color
    marginBottom: 20,
    fontWeight: 'bold',
    textShadowColor: '#005f73', // Slightly darker shadow for depth
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#005f73', // Darker ocean blue border
    borderRadius: 8,
    backgroundColor: '#ffffff', // Light background for input fields
    color: '#005f73', // Dark text color in input
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden', // Rounds the button to match container style
  },
});

export default Login;
