import React, { createContext, useState } from "react";

// Create a Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // State for userId
  const [balance, setBalance] = useState(100.0); // State for balance, initial value set to 100.0

  // Provide both userId and balance to all components that need it
  return (
    <UserContext.Provider value={{ userId, setUserId, balance, setBalance }}>
      {children}
    </UserContext.Provider>
  );
};
