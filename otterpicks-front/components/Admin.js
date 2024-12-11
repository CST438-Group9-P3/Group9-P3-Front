import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";

const Admin = () => {
  const [picks, setPicks] = useState([]); 
  const BASE_URL = "https://otterpicks-bbe3292b038b.herokuapp.com"; 

  const fetchPicks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/picks`);
      if (!response.ok) {
        throw new Error(`Failed to fetch picks: ${response.status}`);
      }
      const data = await response.json();
      setPicks(data); 
    } catch (error) {
      console.error("Error fetching picks:", error);
      Alert.alert("Error", "Failed to load picks. Please try again later.");
    }
  };

  const deletePick = async (pickId) => {
    console.log(`Deleting pick with ID: ${pickId}`);
    console.log(`Request URL: ${BASE_URL}/deletePick?pickId=${pickId}`);
    try {
      const response = await fetch(`${BASE_URL}/deletePick?pickId=${pickId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete pick: ${response.status}`);
      }
      setPicks((prevPicks) => prevPicks.filter((pick) => pick.id !== pickId));
      alert("Success", `Pick ${pickId} has been deleted.`);
      fetchPicks();
    } catch (error) {
      console.error("Error deleting pick:", error);
      alert("Error", "Failed to delete pick. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPicks();
  }, []);

  const renderPickItem = ({ item }) => (
    <View style={styles.pickItem}>
      <Text style={styles.pickText}>User: {item.user.username}</Text>
      <Text style={styles.pickText}>Player: {item.player.name}</Text>
      <Text style={styles.pickText}>Selection: {item.selection}</Text>
      <Text style={styles.pickText}>Stake: {item.stake}</Text>
      <Text style={styles.pickText}>Status: {item.status}</Text>
      <Button
        title="Delete"
        color="red"
        onPress={() =>
            deletePick(item.pick_id)
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin: Manage Picks</Text>
      {picks.length > 0 ? (
        <FlatList style={{ height: 600 }}
          data={picks}
          keyExtractor={(item) => item.pick_id.toString()} 
          renderItem={renderPickItem}
        />
      ) : (
        <Text style={styles.noPicks}>No picks available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a27",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#ffffff'
  },
  pickItem: {
    backgroundColor: "#34344a",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pickText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#ffffff",
  },
  noPicks: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Admin;
