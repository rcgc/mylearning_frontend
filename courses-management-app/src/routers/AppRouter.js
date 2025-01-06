import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import AddWatched from '../components/Watched/AddWatched';
import EditWatched from '../components/Watched/EditWatched';
import SearchWatched from '../components/Watched/SearchWatched';
import WatchedList from '../components/Watched/WatchedList';

import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Profile from '../components/Profile/Profile';

import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div id="root">
          <Header />

          <div className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <WatchedList />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/courses/add"
                element={
                  <ProtectedRoute>
                    <AddWatched />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses/edit"
                element={
                  <ProtectedRoute>
                    <EditWatched />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses/search"
                element={
                  <ProtectedRoute>
                    <SearchWatched />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;