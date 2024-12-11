import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image, ScrollView } from 'react-native';
import { UserContext } from "./UserContext";
import { format } from 'date-fns';

const PlaceBets = () => {
  const [athletesData, setAthletesData] = useState([]); 
  const { userId, balance, setBalance } = useContext(UserContext);
  const [amount, setAmount] = useState(""); 
  const [selectedBets, setSelectedBets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBetType, setSelectedBetType] = useState({});
  const [betAmounts, setBetAmounts] = useState({}); 
  const [selectedAthlete, setSelectedAthlete] = useState(null); 

  const [playerId, setPlayerId] = useState(null);
  const [selection, setSelection] = useState(null);
  const [stake, setStake] = useState(null);
  const [targetValue, setTargetValue] = useState(0);
  const [playerValue, setPlayerValue] = useState(0);

  const BASE_URL = "https://otterpicks-bbe3292b038b.herokuapp.com";
  
  useEffect(() => { 
    const fetchAthletes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/players`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch athletes: ${response.status}`);
        }
        const data = await response.json();
    
        const formattedData = data.map((athlete) => ({
          id: athlete.player_id.toString(), 
          name: athlete.name,
          line: `${athlete.player_stats} Pts`, 
          target: athlete.player_stats,
          image: athlete.image,
          team: athlete.team, 
          position: athlete.position,
        }));
    
        setAthletesData(formattedData);
        } catch (error) {
          console.error('Error fetching athletes:', error);
          Alert.alert('Error', 'Failed to load athletes. Please try again later.');
        }
      };
    
      fetchAthletes();
    }, []);

  const createPick = async (userId, playerId, selection, stake, targetValue, playerValue, timestamp) => {
    const hasSufficientFunds = handleBetWithdrawMoney(stake); // checks if there are sufficient funds

    if (!hasSufficientFunds) {
      console.error("Insufficient funds to place the bet.");
      Alert.alert("Error", "You do not have enough funds to place this bet.");
      return; 
    }

    const apiUrl = `${BASE_URL}/createPick?userId=${userId}&playerId=${playerId}&selection=${selection}&stake=${stake}&targetValue=${targetValue}&playerValue=${playerValue}&timestamp=${timestamp}`;
    console.log("API URL:", apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Failed to create pick:", response.status, response.statusText);
        console.error("Server response:", errorBody);
        alert("Error", `Failed to create pick: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log(data);
      console.log("Bet was successful, showing alert...");
      alert("Success", `Your bet was successful.`);
    } catch (error) {
      console.error(`Error`, error);
      alert("Error", `There was an issue processing. Please try again.`);
    }
  };

  const toggleBetSelection = (athlete) => {
    if (selectedAthlete === athlete.id) {
      setSelectedAthlete(null);
      setPlayerId(null);
      setTargetValue(null);
      const updatedBetType = { ...selectedBetType };
      delete updatedBetType[athlete.id];
      setSelectedBetType(updatedBetType);
  
      const updatedBetAmounts = { ...betAmounts };
      delete updatedBetAmounts[athlete.id];
      setBetAmounts(updatedBetAmounts);
    } else {
      setSelectedAthlete(athlete.id);
      setPlayerId(athlete.id);
      setTargetValue(athlete.target);
      setSelectedBetType('None'); // Add/update bet type
      setBetAmounts({ ...betAmounts, [athlete.id]: 0 });
    }
  };

  const handlePlaceBets = () => {
    if (selectedAthlete == null) {
      Alert.alert('No Bets Selected', 'Please select at least one bet to place.');
    } else {
      setShowModal(true); 
    }
  };

  const handleBetTypeSelection = (betType) => { 
    setSelection(betType);
    setSelectedBetType(betType);
  };

  const handleBetAmountChange = (amount) => { 
    if(amount > 0){
      setStake(amount);
    }
  };
 
  const sendTransactionRequest = async (type, numericAmount) => {
    const timestamp = new Date().toISOString().split("T")[0]; 
  
    const apiUrl = `${BASE_URL}/transaction?userId=${userId}&type=${type}&amount=${numericAmount}&timestamp=${timestamp}`;
  
    console.log("API URL:", apiUrl); 
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
      });
  
      if (!response.ok) {
        throw new Error(`Transaction failed with status ${response.status}`);
      }
  
      const data = await response.json(); 
      console.log(data);
      setBalance(data.user.account_balance); 
      setAmount(""); 
      console.log("Transaction was successful, showing alert...");
      } catch (error) {
        console.error(`Error during ${type}:`, error);
      }
    };
    
  const handleBetWithdrawMoney = (stake) => { 
    const numericAmount = parseFloat(stake);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Invalid Input", "Please enter a valid amount to withdraw.");
      return false;
    }

    if (numericAmount > balance) {
      alert("Insufficient Funds");
      return false;
    }

    sendTransactionRequest("withdraw", numericAmount);
    return true;
  };

  const renderAthlete = ({ item }) => {  
    return (
      <TouchableOpacity
      style={[
        styles.athleteCard,
        selectedAthlete === item.id && styles.selectedCard, 
      ]}
      onPress={() => toggleBetSelection(item)}
      >
        <View style={styles.athleteInfo}>
        <Image
          source={{ uri: item.image }}
          style={{width: 125, height: 125}}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.athleteName}>{item.name}</Text>
          <Text style={styles.athleteLine}>Line: {item.line}</Text>
          <Text style={styles.athleteTeam}>{item.team}</Text>
          <Text style={styles.athleteTeam}>Position: {item.position}</Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ height: 600, backgroundColor: '#1a1a27'}}>
      <Text style={styles.header}>Place Your Bets</Text>
      <FlatList
        data={athletesData}
        renderItem={renderAthlete}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonContainer}>
        <Button title="Place Bets" color="#0077b6" onPress={handlePlaceBets} />
      </View>

      {/* Modal for placing bets */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Confirm Your Bets</Text>
            <FlatList
              data={selectedAthlete ? athletesData.filter((athlete) => athlete.id === selectedAthlete) : []}
              renderItem={({ item }) => (
                <View style={styles.modalBet}>
                  <Text style={styles.athleteName}>{item.name}</Text>
                  <Text style={styles.athleteLine}>{item.line}</Text>
                  <View style={styles.betRow}>
                    <View style={styles.betOptions}>
                      <Button
                        title="Over"
                        color="#0077b6"
                        onPress={() => handleBetTypeSelection('Over')}
                      />
                      <Button
                        title="Under"
                        color="#d32f2f"
                        onPress={() => handleBetTypeSelection('Under')}
                      />
                    </View>
                    <TextInput
                      style={styles.betAmountInput}
                      placeholder="$0.00"
                      placeholderTextColor="#a0a0a0"
                      keyboardType="numeric"
                      value={stake || ''}
                      onChangeText={(amount) => handleBetAmountChange(amount)}
                    />
                  </View>
                  <Text style={styles.selectedBet}>
                    Bet: {selection || 'Not Selected'}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.confirmButtonContainer}>
              <Button title="Confirm Bets" color="#0077b6" 
              onPress={() => 
                {
                  const timestamp = format(new Date(), 'yyyy-MM-dd');
                  createPick(userId, playerId, selection, stake, targetValue, playerValue, timestamp)
                  setShowModal(false)
                }} />
              <Button
                title="Cancel"
                color="#d32f2f"
                onPress={() => setShowModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a27', // Dark background
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Bright header text
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    paddingBottom: 20,
  },
  athleteCard: {
    backgroundColor: '#2c2c3d', // Slightly lighter card background
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#444', // Subtle border
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: '#3a4b63', // Highlighted card background
    borderColor: '#0077b6',
  },
  athleteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Bright text for readability
    flex: 1,
  },
  athleteLine: {
    fontSize: 16,
    color: '#0077b6', // Accent color
    marginVertical: 4,
  },
  athleteTeam: {
    fontSize: 14,
    color: '#bbbbbb', // Softer text for secondary info
  },
  betOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  betRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  betAmountInput: {
    borderWidth: 1,
    borderColor: '#555555', // Matches card border
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    width: 80,
    textAlign: 'center',
    color: '#ffffff', // Text color for input
    backgroundColor: '#1a1a27', // Matches container background
  },
  confirmButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedAthleteContainer: {
    backgroundColor: "#0077b6", // Highlight color
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 39, 0.9)', // Semi-transparent dark overlay
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#2c2c3d', // Matches card background
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff', // Bright text for headers
  },
  modalBet: {
    marginBottom: 10,
  },
  selectedBet: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
    color: '#bbbbbb', // Softer text for subtle emphasis
  },
  athleteImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  athleteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    paddingLeft: 20,
  },
});

export default PlaceBets;
