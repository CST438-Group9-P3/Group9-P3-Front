import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const Dashboard = ({ onLogout, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Dashboard</Text>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('PlaceBets')}
      >
        <Text style={styles.sectionTitle}>Place Bet</Text>
        <Text style={styles.sectionContent}>Make your bets and explore odds here.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('PlaceBets')}
      >
        <Text style={styles.sectionTitle}>Betting Options</Text>
        <Text style={styles.sectionContent}>Explore betting options and place your bets.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('UpcomingEvents')}
      >
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Text style={styles.sectionContent}>Stay tuned for the latest updates!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.sectionTitle}>Recent Results</Text>
        <Text style={styles.sectionContent}>Check out the latest game results here.</Text>
      </TouchableOpacity>

      <View style={styles.logoutButtonContainer}>
        <Button title="Log Out" color="#003f5c" onPress={onLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0093e9', // Ocean blue background
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#005f73',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#005f73',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: '#005f73',
  },
  logoutButtonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Dashboard;
