import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';

const athletesData = [ // These are placeholders until we get the CSUMB athletes
  { id: '1', name: 'LeBron James', line: '25.5 Pts', team: 'Lakers' },
  { id: '2', name: 'Patrick Mahomes', line: '2.5 Passing TDs', team: 'Chiefs' },
  { id: '3', name: 'Lionel Messi', line: '1.5 Goals', team: 'Inter Miami' },
  { id: '4', name: 'Serena Williams', line: '6.5 Aces', team: 'USA' },
];

const PlaceBets = () => {
  const [selectedBets, setSelectedBets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBetType, setSelectedBetType] = useState({});
  const [betAmounts, setBetAmounts] = useState({}); // Store bet amounts per player

  const toggleBetSelection = (athlete) => {
    if (selectedBets.includes(athlete.id)) {
      setSelectedBets(selectedBets.filter((id) => id !== athlete.id));
      const updatedBetType = { ...selectedBetType };
      delete updatedBetType[athlete.id];
      setSelectedBetType(updatedBetType);

      const updatedBetAmounts = { ...betAmounts };
      delete updatedBetAmounts[athlete.id];
      setBetAmounts(updatedBetAmounts);
    } else {
      setSelectedBets([...selectedBets, athlete.id]);
    }
  };

  const handlePlaceBets = () => {
    if (selectedBets.length === 0) {
      Alert.alert('No Bets Selected', 'Please select at least one bet to place.');
    } else {
      setShowModal(true); // Show modal to confirm bet
    }
  };

  const handleBetTypeSelection = (athleteId, betType) => {
    setSelectedBetType((prevState) => ({
      ...prevState,
      [athleteId]: betType,
    }));
  };

  const handleBetAmountChange = (athleteId, amount) => {
    setBetAmounts((prevState) => ({
      ...prevState,
      [athleteId]: amount,
    }));
  };

  const handleConfirmBets = () => {
    if (Object.values(betAmounts).some((amount) => !amount || parseFloat(amount) <= 0)) {
      Alert.alert('Invalid Bet Amount', 'Please enter a valid bet amount for each player.');
      return;
    }

    Alert.alert(
      'Bets Placed',
      `You have placed bets totaling $${Object.values(betAmounts).reduce((sum, amt) => sum + parseFloat(amt), 0).toFixed(
        2
      )}!`
    );

    setSelectedBets([]); // Clear selection after placing bets
    setSelectedBetType({}); // Clear bet types
    setBetAmounts({}); // Clear bet amounts
    setShowModal(false); // Close modal
  };

  const renderAthlete = ({ item }) => {
    const isSelected = selectedBets.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.athleteCard, isSelected && styles.selectedCard]}
        onPress={() => toggleBetSelection(item)}
      >
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>{item.name}</Text>
          <Text style={styles.athleteLine}>{item.line}</Text>
          <Text style={styles.athleteTeam}>{item.team}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
              data={athletesData.filter((athlete) => selectedBets.includes(athlete.id))}
              renderItem={({ item }) => (
                <View style={styles.modalBet}>
                  <Text style={styles.athleteName}>{item.name}</Text>
                  <Text style={styles.athleteLine}>{item.line}</Text>
                  <View style={styles.betRow}>
                    <View style={styles.betOptions}>
                      <Button
                        title="Over"
                        color="#0077b6"
                        onPress={() => handleBetTypeSelection(item.id, 'Over')}
                      />
                      <Button
                        title="Under"
                        color="#d32f2f"
                        onPress={() => handleBetTypeSelection(item.id, 'Under')}
                      />
                    </View>
                    <TextInput
                      style={styles.betAmountInput}
                      placeholder="$0.00"
                      placeholderTextColor="#a0a0a0"
                      keyboardType="numeric"
                      value={betAmounts[item.id] || ''}
                      onChangeText={(amount) => handleBetAmountChange(item.id, amount)}
                    />
                  </View>
                  <Text style={styles.selectedBet}>
                    Bet: {selectedBetType[item.id] || 'Not Selected'}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.confirmButtonContainer}>
              <Button title="Confirm Bets" color="#0077b6" onPress={handleConfirmBets} />
              <Button
                title="Cancel"
                color="#d32f2f"
                onPress={() => setShowModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003f5c',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  athleteCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: '#d1e7ff',
    borderColor: '#0077b6',
  },
  athleteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003f5c',
    flex: 1,
  },
  athleteLine: {
    fontSize: 16,
    color: '#0077b6',
    marginVertical: 4,
  },
  athleteTeam: {
    fontSize: 14,
    color: '#555555',
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
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    width: 80,
    textAlign: 'center',
  },
  confirmButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBet: {
    marginBottom: 10,
  },
  selectedBet: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
  },
});

export default PlaceBets;