import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null); // Store user data
  const [userCourses, setUserCourses] = useState([]); // Store user's course IDs

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
        setUserCourses(data.user.courses);
        setIsAuthenticated(true);
        console.log('Login successful:', data); // Debugging
      } else {
        console.error('Login failed');
        setIsAuthenticated(false);
        throw new Error('Contraseña incorrecta');  // Throw error to be caught in LoginForm
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsAuthenticated(false);
      throw error; // Rethrow the error to be caught in LoginForm
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setUserCourses([]);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, userCourses, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
