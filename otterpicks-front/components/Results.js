import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { UserContext } from "./UserContext";

const Results = () => {
  const [pastBets, setPastBets] = useState([]);
  const [currentBets, setCurrentBets] = useState([]);
  const { userId, balance, setBalance } = useContext(UserContext);

  const BASE_URL = "https://otterpicks-bbe3292b038b.herokuapp.com"; // Database URL

  useEffect(() => {
    const fetchActiveBets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/picks?userId=${userId}&status=active`);
        if (!response.ok) {
          throw new Error(`Failed to fetch picks for userId ${userId}: ${response.status}`);
        }
        const data = await response.json();

        const formattedData = data.map((pick) => ({
          id: pick.pick_id.toString(), 
          playerName: pick.player.name, 
          playerStats: `${pick.player.player_stats} Pts`, 
          selection: pick.selection, 
          stake: `$${pick.stake.toFixed(2)}`, 
          status: pick.status, 
        }));
  
        // Update the state with the formatted picks data
        setCurrentBets(formattedData);
      } catch (error) {
        console.error('Error fetching picks for user:', error);
        alert('Error', 'Failed to load your picks. Please try again later.');
      }
    };
    
      fetchActiveBets();
  }, []);

  // Render individual bet items
  const renderBetItem = ({ item }) => (
    <View style={styles.betItem}>
    <Text style={styles.match}>Player: {item.playerName}</Text>
    <Text style={styles.bet}>Stats: {item.playerStats}</Text>
    <Text style={styles.bet}>Selection: {item.selection}</Text>
    <Text style={styles.bet}>Stake: {item.stake}</Text>
    <Text style={styles.result}>Status: {item.status}</Text>
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
