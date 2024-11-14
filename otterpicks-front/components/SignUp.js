import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUp = ({ onSignUpComplete }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (username && email && password && password === confirmPassword) {
      // Here, you could add your sign-up logic, e.g., sending the data to a backend
      onSignUpComplete();
    } else {
      alert('Please make sure all fields are filled out correctly and passwords match');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a0c4e8"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a0c4e8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a0c4e8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#a0c4e8"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
        <Text style={styles.orText}>Or</Text>
        <Button title="Log In" onPress={onLogin} />
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
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    flexDirection: 'column', // or 'column' for vertical stacking
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  orText: {
    marginHorizontal: 10,
    color: '#005f73',
  },  
});

export default SignUp;
