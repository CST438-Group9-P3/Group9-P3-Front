import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import logo from "../assets/logo.png";

const Login = ({ navigation }) => {
  const clientId =
    "71496720688-ggpucbdb22o8hveqovvhajgk265epee2.apps.googleusercontent.com";
  const { setUserId, setBalance, setUsername } = useContext(UserContext);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const signInButtonRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google API script loaded successfully");

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCallbackResponse,
        });

        if (signInButtonRef.current) {
          window.google.accounts.id.renderButton(signInButtonRef.current, {
            theme: "filled_blue",
            size: "large",
            shape: "pill",
          });
        }
      };
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    }
  }, []);

  const handleCallbackResponse = async (response) => {
    console.log("Encoded JWT ID Token:", response.credential);

    const userObject = JSON.parse(atob(response.credential.split(".")[1]));
    const email = userObject.email;
    const username = userObject.name;

    try {
      const apiUrl = `https://otterpicks-bbe3292b038b.herokuapp.com/login?email=${encodeURIComponent(
        email
      )}&username=${encodeURIComponent(username)}`;
      const apiResponse = await fetch(apiUrl, { method: "POST" });

      if (!apiResponse.ok) {
        throw new Error(`Failed to save user. Status: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      setUserId(result.user_id);
      setBalance(result.account_balance);
      setUsername(result.username);

      alert(`Welcome, ${result.username || username}!`);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error sending user data to API:", error);
      alert("There was an error saving your information. Please try again.");
    }
  };

  const currentStyles = isDarkMode ? darkStyles : lightStyles;

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

    {/* Left Section */}
    <View style={currentStyles.left}>
      <Image source={logo} style={currentStyles.logo} />
      <Text style={currentStyles.title}>Welcome to Otter Picks</Text>
      <Text style={currentStyles.subtitle}>
        Your destination for all your Otter Athletics betting needs.
      </Text>
    </View>

    {/* Right Section */}
    <View style={currentStyles.right}>
      <Text style={currentStyles.loginTitle}>Login to Continue</Text>
      <View ref={signInButtonRef} style={currentStyles.signInButton}></View>
    </View>
  </View>
);
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20, // Added padding for overall layout consistency
  },
  themeToggle: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 5,
    zIndex: 1,
    borderRadius: 10, // Rounded corners for a cleaner look
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 450, // Reduced size for a better fit
    height: 450,
    marginBottom: 30,
  },
  title: {
    fontSize: 40, // Reduced size for better hierarchy
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    maxWidth: 300, // Limited width for better readability
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
  },
  signInButton: {
    marginTop: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1a1a27",
    padding: 20,
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
  left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34344a",
    padding: 20,
  },
  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 450, // Matches light mode for consistency
    height: 450,
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 24,
    color: "#bbbbbb",
    textAlign: "center",
    maxWidth: 300,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 20,
  },
  signInButton: {
    marginTop: 20,
  },
});

export default Login;
