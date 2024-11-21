import React, { useEffect } from "react";

const Login = ({ navigation }) => {
  const clientId = "71496720688-ggpucbdb22o8hveqovvhajgk265epee2.apps.googleusercontent.com"; // Replace with your Google Client ID

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google API script loaded successfully");

        // Initialize Google Sign-In
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCallbackResponse,
        });

        // Render the button
        window.google.accounts.id.renderButton(
          document.getElementById("signInButton"),
          { theme: "outline", size: "large" }
        );
      };
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    }
  }, []);

  const handleCallbackResponse = async (response) => {
    console.log("Encoded JWT ID Token:", response.credential);
  
    // Decode the JWT
    const userObject = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("User Info:", userObject);
  
    // Extract email and name (use `name` as `username`)
    const email = userObject.email;
    const username = userObject.name;
  
    try {
      // Construct the API URL with query parameters
      const apiUrl = `https://otterpicks-bbe3292b038b.herokuapp.com/login?email=${encodeURIComponent(
        email
      )}&username=${encodeURIComponent(username)}`;
  
      console.log("API URL:", apiUrl);
  
      const apiResponse = await fetch(apiUrl, {
        method: "POST", 
      });
  
      if (!apiResponse.ok) {
        throw new Error(`Failed to save user. Status: ${apiResponse.status}`);
      }
  
      const result = await apiResponse.json();
      console.log("API Response:", result);
  
      // Navigate to PlaceBets screen
      alert(`Welcome, ${result.username || username}!`);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error sending user data to API:", error);
      alert("There was an error saving your information. Please try again.");
    }
  };
  
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Otter Picks</h1>
      <div id="signInButton"></div> {/* Google Sign-In Button */}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#0093e9",
  },
  title: {
    fontSize: "2em",
    color: "#fff",
    marginBottom: "20px",
  },
};

export default Login;
