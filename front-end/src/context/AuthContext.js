import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(() => {
    return !!localStorage.getItem("isConnected");
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const handleSignIn = (token, user) => {
    setIsConnected(true);
    setUser(user);
    localStorage.setItem("isConnected", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSignOut = () => {
    setIsConnected(false);
    setUser(null);
    localStorage.removeItem("isConnected");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedIsConnected = !!localStorage.getItem("isConnected");
    const storedUser = localStorage.getItem("user");
    if (storedIsConnected) {
      setIsConnected(storedIsConnected);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isConnected, user, handleSignIn, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
