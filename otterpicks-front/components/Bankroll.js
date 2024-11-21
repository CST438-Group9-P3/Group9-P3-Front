import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const Bankroll = () => {
  const [balance, setBalance] = useState(100.0); // Starting balance
  const [amount, setAmount] = useState(""); // Input amount

  // Function to handle adding money
  const handleAddMoney = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid amount to add.");
      return;
    }

    setBalance((prevBalance) => prevBalance + numericAmount);
    setAmount(""); // Clear input
    Alert.alert("Success", `You added $${numericAmount.toFixed(2)} to your account.`);
  };

  // Function to handle withdrawing money
  const handleWithdrawMoney = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid amount to withdraw.");
      return;
    }

    if (numericAmount > balance) {
      Alert.alert("Insufficient Funds", "You cannot withdraw more than your current balance.");
      return;
    }

    setBalance((prevBalance) => prevBalance - numericAmount);
    setAmount(""); // Clear input
    Alert.alert("Success", `You withdrew $${numericAmount.toFixed(2)} from your account.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bankroll Management</Text>
      <Text style={styles.balance}>Current Balance: ${balance.toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Money" color="#4CAF50" onPress={handleAddMoney} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Withdraw Money" color="#F44336" onPress={handleWithdrawMoney} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  balance: {
    fontSize: 20,
    fontWeight: "600",
    color: "#00796B",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

export default Bankroll;
