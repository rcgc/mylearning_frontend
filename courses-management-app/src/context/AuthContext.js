import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userWatchedIds, setUserWatchedIds] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const parsedData = JSON.parse(storedAuthData);
      setIsAuthenticated(true);
      setUserData(parsedData.user);
      setUserWatchedIds(parsedData.user.watched_ids);
    }
    setLoading(false); // Done initializing
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setUserWatchedIds(data.user.watched_ids);
        setIsAuthenticated(true);
        localStorage.setItem(
          'authData',
          JSON.stringify({ user: data.user })
        );
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setUserWatchedIds([]);
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        userWatchedIds,
        login,
        logout,
        loading, // Expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
