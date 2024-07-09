import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(() => {
    return JSON.parse(localStorage.getItem('isConnected')) || false;
  });

  const handleSignIn = () => {
    setIsConnected(true);
    localStorage.setItem('isConnected', true);
  };

  const handleSignOut = () => {
    setIsConnected(false);
    localStorage.removeItem('isConnected');
  };

  useEffect(() => {
    const storedIsConnected = JSON.parse(localStorage.getItem('isConnected'));
    if (storedIsConnected) {
      setIsConnected(storedIsConnected);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isConnected, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};