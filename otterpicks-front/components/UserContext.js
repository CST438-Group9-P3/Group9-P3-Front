import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [balance, setBalance] = useState(100.0); 
  return (
    <UserContext.Provider value={{ userId, setUserId, balance, setBalance, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
