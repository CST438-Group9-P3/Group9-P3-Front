import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Results = () => {
  // Sample data for past and current bets
  const [pastBets, setPastBets] = useState([]);
  const [currentBets, setCurrentBets] = useState([]);

  useEffect(() => {
    // Mock fetching bets from an API or database
    const fetchBets = async () => {
      // Replace this with your API fetch logic if needed
      const mockPastBets = [
        { id: 1, match: "Team A vs Team B", bet: "$50 on Team A", result: "Win" },
        { id: 2, match: "Team C vs Team D", bet: "$30 on Team D", result: "Loss" },
        { id: 3, match: "Team E vs Team F", bet: "$20 on Team E", result: "Win" },
      ];

      const mockCurrentBets = [
        { id: 1, match: "Team G vs Team H", bet: "$40 on Team G" },
        { id: 2, match: "Team I vs Team J", bet: "$25 on Team I" },
      ];

      setPastBets(mockPastBets);
      setCurrentBets(mockCurrentBets);
    };

    fetchBets();
  }, []);

  // Render individual bet items
  const renderBetItem = ({ item }) => (
    <View style={styles.betItem}>
      <Text style={styles.match}>{item.match}</Text>
      <Text style={styles.bet}>{item.bet}</Text>
      {item.result && <Text style={styles.result}>Result: {item.result}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>

      <Text style={styles.sectionTitle}>Current Bets</Text>
      {currentBets.length > 0 ? (
        <FlatList
          data={currentBets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBetItem}
        />
      ) : (
        <Text style={styles.noBets}>No current bets</Text>
      )}

      <Text style={styles.sectionTitle}>Past Bets</Text>
      {pastBets.length > 0 ? (
        <FlatList
          data={pastBets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBetItem}
        />
      ) : (
        <Text style={styles.noBets}>No past bets</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#555",
    marginVertical: 10,
  },
  noBets: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 10,
  },
  betItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  match: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  bet: {
    fontSize: 16,
    color: "#555",
  },
  result: {
    fontSize: 16,
    color: item => (item.result === "Win" ? "green" : "red"),
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default Results;
