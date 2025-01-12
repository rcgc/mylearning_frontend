import React from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import WatchedForm from './WatchedForm';

const AddWatched = () => {
  const { userData, setUserData, userWatchedIds, setUserWatchedIds } = useAuth();

  const handleAddWatched = async (watchedId) => {
    const updatedWatchedIds = [...userWatchedIds, watchedId];
    const currentUnixTime = Date.now();

    try {
      await axios.put(`http://localhost:4000/users/${userData._id.$oid}`, {
        ...userData,
        watched_ids: updatedWatchedIds,
        updated_at: { $date: { $numberLong: currentUnixTime.toString() } },
      });

      // Update AuthContext
      setUserWatchedIds(updatedWatchedIds);
      setUserData({ ...userData, watched_ids: updatedWatchedIds });
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
