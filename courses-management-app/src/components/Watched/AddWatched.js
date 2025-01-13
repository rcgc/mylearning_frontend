import React from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import WatchedForm from './WatchedForm';

const AddWatched = () => {
  const { userData, setUserData, userWatchedIds, setUserWatchedIds } = useAuth();

  const handleAddWatched = async (watchedId) => {
    // console.log('Received watchedId:', watchedId); // Log the value passed to this function

    const updatedWatchedIds = [...userWatchedIds, watchedId];
    const currentUnixTime = Date.now();

    try {
      const updatedUserData = {
        name: userData.name,
        lastname: userData.lastname,
        major: userData.major,
        email: userData.email,
        password: userData.password,
        watched_ids: updatedWatchedIds, // Update watched_ids
        created_at: userData.created_at, // Spread the existing userData
        updated_at: { $date: { $numberLong: currentUnixTime.toString() } }, // Add updated_at field
      };
      
      // console.log("userData: ", userData);
      // console.log("updatedUserData: ", updatedUserData);

      // Now, use updatedUserData in the axios request
      await axios.put(
        `http://localhost:4000/users/${userData._id.$oid}`, 
        updatedUserData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Update AuthContext
      setUserWatchedIds(updatedWatchedIds);
      const newUserData = { ...userData, watched_ids: updatedWatchedIds };
      setUserData(newUserData);

      // Update localStorage
      localStorage.setItem(
        'authData',
        JSON.stringify({ user: newUserData })
      );
    } catch (error) {
      console.error('Error updating user with watched ID:', error);
    }
  };

  return (
    <div className="add-watched-container">
      <WatchedForm onAddWatched={handleAddWatched} />
    </div>
  );
};

export default AddWatched;
