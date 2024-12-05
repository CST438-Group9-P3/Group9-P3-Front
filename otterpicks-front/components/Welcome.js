import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Otter Picks</Text>
      <Text style={styles.subtitle}>Your destination for sports betting insights and more!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Log In"
          color="#003f5c"
          onPress={() => navigation.navigate('Login')}
        />
        
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
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d0f4f7',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default Welcome;
