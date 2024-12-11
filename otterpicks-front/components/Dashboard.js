import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { UserContext } from "./UserContext";

const Dashboard = ({ onLogout, navigation }) => {
  const { userId, username } = useContext(UserContext);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentStyles = isDarkMode ? darkStyles : lightStyles;


  const adminUserIds = [4, 5];

  return (
    <View style={currentStyles.container}>
      {/* Theme Toggle Button */}
      <View style={currentStyles.themeToggle}>
        <Button
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
          onPress={toggleTheme}
          color={isDarkMode ? "#888" : "#444"}
        />
      </View>

      {/* Dashboard Title */}
      <Text style={currentStyles.title}> {username}'s Dashboard</Text>

      {/* Sections */}
      <TouchableOpacity
        style={currentStyles.section}
        onPress={() => navigation.navigate('PlaceBets')}
      >
        <Text style={currentStyles.sectionTitle}>Place Bet</Text>
        <Text style={currentStyles.sectionContent}>Make your bets and explore odds here.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={currentStyles.section}
        onPress={() => navigation.navigate('Bankroll')}
      >
        <Text style={currentStyles.sectionTitle}>Bankroll</Text>
        <Text style={currentStyles.sectionContent}>Deposit or withdraw your funds.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={currentStyles.section}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={currentStyles.sectionTitle}>Recent Results</Text>
        <Text style={currentStyles.sectionContent}>Check out the latest game results here.</Text>
      </TouchableOpacity>


    

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.sectionTitle}>Recent Results</Text>
        <Text style={styles.sectionContent}>Check out the latest game results here.</Text>
      </TouchableOpacity>

  {adminUserIds.includes(userId) && (
        <TouchableOpacity
          style={currentStyles.section}
          onPress={() => navigation.navigate('Admin')}
        >
          <Text style={currentStyles.sectionTitle}>Admin</Text>
          <Text style={currentStyles.sectionContent}>Manage admin settings and updates.</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  themeToggle: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 5,
    zIndex: 1,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005f73",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: "#005f73",
  },
  logoutButtonContainer: {
    marginTop: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a27",
  },
  themeToggle: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 5,
    zIndex: 1,
    borderRadius: 10,
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#34344a",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#bbbbbb",
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: "#ffffff",
  },
  logoutButtonContainer: {
    marginTop: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default Dashboard;
