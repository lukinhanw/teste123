import React, { createContext, useState, useContext, useEffect } from 'react';
import localforage from 'localforage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedUser = await localforage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await localforage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await localforage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
