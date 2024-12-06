import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { UserContext } from "./UserContext";

const Results = () => {
  const [pastBets, setPastBets] = useState([]);
  const [currentBets, setCurrentBets] = useState([]);
  const { userId, balance, setBalance } = useContext(UserContext);

  const BASE_URL = "https://otterpicks-bbe3292b038b.herokuapp.com"; // Database URL

  function generateNearbyRandomNumber(target, variation = 5) {
    const lowerBound = target - variation;
    const upperBound = target + variation;
  
    const isBelow = Math.random() < 0.5;
  
    if (isBelow) {
      return Math.floor(Math.random() * (target - lowerBound)) + lowerBound;
    } else {
      return Math.floor(Math.random() * (upperBound - target)) + target + 1;
    }
  }

  const simulateGame = async (pickId, playerStat) => {

    simValue = generateNearbyRandomNumber(playerStat)

    try {
      const response = await fetch(`${BASE_URL}/finalizePick?userId=${userId}&pickId=${pickId}&simValue=${simValue}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to simulate game for pickId ${pickId}: ${response.status}`);
      }

      const data = await response.json();
      Alert.alert("Game Simulated", `The game for pick ${pickId} has been finalized.`);
      // Optionally refresh the active bets after simulation
      fetchActiveBets();
    } catch (error) {
      console.error("Error simulating game:", error);
      Alert.alert("Error", "Failed to simulate the game. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchActiveBets = async () => {
      try {
        setCurrentBets([]);

        const response = await fetch(`${BASE_URL}/userActivePicks?userId=${userId}`);

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

  useEffect(() => {
    const fetchPastBets = async () => {
      try {
        setPastBets([]);

        const response = await fetch(`${BASE_URL}/userPastPicks?userId=${userId}`);

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
          result: pick.result,
        }));
  
        // Update the state with the formatted picks data
        setCurrentBets(formattedData);
      } catch (error) {
        console.error('Error fetching picks for user:', error);
        alert('Error', 'Failed to load your picks. Please try again later.');
      }
    };
    
      fetchPastBets();
  }, []);

  // Render individual bet items
  const renderActiveBetItem = ({ item }) => (
    <View style={styles.betItem}>
    <Text style={styles.match}>Player: {item.playerName}</Text>
    <Text style={styles.bet}>Line: {item.playerStats}</Text>
    <Text style={styles.bet}>Selection: {item.selection}</Text>
    <Text style={styles.bet}>Stake: {item.stake}</Text>
    <Text style={styles.result}>Status: {item.status}</Text>
  </View>
  );

  const renderPastBetItem = ({ item }) => (
    <View style={styles.betItem}>
    <Text style={styles.match}>Player: {item.playerName}</Text>
    <Text style={styles.bet}>Line: {item.playerStats}</Text>
    <Text style={styles.bet}>Selection: {item.selection}</Text>
    <Text style={styles.bet}>Stake: {item.stake}</Text>
    <Text style={styles.result}>Status: {item.status}</Text>
    <Text style={styles.result}>Result: {item.result}</Text>
    <Button title="Simulate Game" onPress={() => simulateGame(item.id, item.player_stats)} />
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
          renderItem={renderActiveBetItem}
        />
      ) : (
        <Text style={styles.noBets}>No current bets</Text>
      )}

      <Text style={styles.sectionTitle}>Past Bets</Text>
      {pastBets.length > 0 ? (
        <FlatList
          data={pastBets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPastBetItem}
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
