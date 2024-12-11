import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { UserContext } from "./UserContext";


const Bankroll = () => {
    const { userId, balance, setBalance } = useContext(UserContext); 
  const [amount, setAmount] = useState(""); 

  const BASE_URL = "https://otterpicks-bbe3292b038b.herokuapp.com";

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
      setBalance(data.user.account_balance); 
      setAmount("");
      console.log("Transaction was successful, showing alert...");
      Alert.alert("Success", `Your ${type} of $${numericAmount.toFixed(2)} was successful.`);
    } catch (error) {
      console.error(`Error during ${type}:`, error);
      Alert.alert("Error", `There was an issue processing your ${type}. Please try again.`);
    }
  };

  const handleAddMoney = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid amount to add.");
      return;
    }

    sendTransactionRequest("deposit", numericAmount);
  };

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

    sendTransactionRequest("withdraw", numericAmount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bankroll Management</Text>
      <Text style={styles.balance}>Current Balance: ${balance}</Text>

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
