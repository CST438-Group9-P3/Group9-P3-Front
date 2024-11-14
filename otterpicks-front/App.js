import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Welcome'); // Start at the Welcome screen

  const handleLogin = () => {
    setCurrentScreen('Dashboard'); // Show Dashboard after login
  };

  const handleLogout = () => {
    setCurrentScreen('Welcome'); // Return to Welcome page on logout
  };

  const handleGoToLogin = () => {
    setCurrentScreen('Login'); // Navigate to Login screen
  };

  const handleGoToSignUp = () => {
    setCurrentScreen('SignUp'); // Navigate to SignUp screen
  };

  const handleSignUpComplete = () => {
    setCurrentScreen('Dashboard'); // After sign-up, navigate to Dashboard
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Welcome' && (
        <Welcome onLogin={handleGoToLogin} onSignUp={handleGoToSignUp} />
      )}
      {currentScreen === 'Login' && <Login onLogin={handleLogin} />}
      {currentScreen === 'SignUp' && <SignUp onSignUpComplete={handleSignUpComplete} />}
      {currentScreen === 'Dashboard' && <Dashboard onLogout={handleLogout} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
