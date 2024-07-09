import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(() => {
    return !!localStorage.getItem('isConnected');
  });

  const handleSignIn = (token) => {
    setIsConnected(true);
    localStorage.setItem('isConnected', token);
  };

  const handleSignOut = () => {
    setIsConnected(false);
    localStorage.removeItem("isConnected");
  };

  useEffect(() => {
    const storedIsConnected = !!localStorage.getItem('isConnected');
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
