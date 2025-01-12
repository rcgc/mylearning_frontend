import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSpinner) {
    return <Spinner />; // Use the reusable spinner component
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
