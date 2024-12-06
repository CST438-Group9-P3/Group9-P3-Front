import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
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
    console.log("playerStats:", playerStat);
    simValue = generateNearbyRandomNumber(playerStat)
    if (isNaN(simValue)) {
      console.error("Simulated value is NaN");
      return;
    }
  

    try {
      const response = await fetch(`${BASE_URL}/finalizePick?userId=${userId}&pickId=${pickId}&simValue=${simValue}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`Failed to simulate game for pickId ${pickId}: ${response.status}`);
      }

      const data = await response.json();
      alert("Game Simulated", `The game for pick ${pickId} has been finalized.`);
      // Optionally refresh the active bets after simulation
      // fetchActiveBets();
    } catch (error) {
      console.error("Error simulating game:", error);
      alert("Error", "Failed to simulate the game. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchActiveBets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/userActivePicks?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch active bets: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((pick) => ({
          id: pick.pick_id.toString(),
          playerName: pick.player.name,
          playerStats: `${pick.player.player_stats} Pts`,
          Line: pick.player.player_stats,
          selection: pick.selection,
          stake: `$${pick.stake.toFixed(2)}`,
          status: pick.status,
        }));
        setCurrentBets(formattedData);
      } catch (error) {
        console.error("Error fetching active bets:", error);
        Alert.alert("Error", "Failed to load active bets. Please try again later.");
      }
    };
    
      fetchActiveBets();
  }, []);

  useEffect(() => {
    const fetchPastBets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/userPastPicks?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch past bets: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((pick) => ({
          id: pick.pick_id.toString(),
          playerName: pick.player.name,
          playerStats: `${pick.player.player_stats} Pts`,
          Line: pick.player.player_stats,
          Actual: pick.playerValue,
          selection: pick.selection,
          stake: `$${pick.stake.toFixed(2)}`,
          status: pick.status,
          result: pick.result,
        }));
        setPastBets(formattedData);
      } catch (error) {
        console.error("Error fetching past bets:", error);
        Alert.alert("Error", "Failed to load past bets. Please try again later.");
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
    <Button title="Simulate Game" onPress={() => simulateGame(item.id, item.Line)} />
  </View>
  );

  function color(result){
    if(result == 'loss'){
      return 'red'
    }
    else{
      return 'green'
    }
  }
  const renderPastBetItem = ({ item }) => (
    <View style={[styles.betItem, {backgroundColor: color(item.result)}]}>
    <Text style={styles.match}>Player: {item.playerName}</Text>
    <Text style={styles.bet}>Line: {item.playerStats}</Text>
    <Text style={styles.bet}>Selection: {item.selection}</Text>
    <Text style={styles.bet}>Stake: {item.stake}</Text>
    <Text style={styles.result}>Status: {item.status}</Text>
    <Text style={styles.result}>Actual: {item.Actual}</Text>
    <Text style={styles.result}>Result: {item.result}</Text>
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
    // backgroundColor: "#fff",
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
