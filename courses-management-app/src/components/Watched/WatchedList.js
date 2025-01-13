import React, { useEffect, useState } from 'react';
import Watched from './Watched';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner';

const WatchedList = () => {
  const { userWatchedIds } = useAuth(); // Get watched IDs from context
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If userWatchedIds is empty, reset courses and stop loading
    if (!userWatchedIds || userWatchedIds.length === 0) {
      setCourses([]); // Clear courses when there are no watched IDs
      setLoading(false);
      return;
    }

    const fetchWatchedData = async () => {
      setLoading(true); // Ensure loading is reset for new fetch
      try {
        const watchedPromises = userWatchedIds.map((id) =>
          fetch(`http://localhost:4000/watched/${id}`).then((res) => res.json())
        );

        const watchedData = await Promise.all(watchedPromises);

        const coursePromises = watchedData.map((watched) => {
          if (!watched || !watched.course_id) {
            console.warn('Invalid watched data:', watched);
            return null; // Skip invalid entries
          }

          const watchedId = watched._id.$oid;
          const courseId = watched.course_id.$oid; // Extract the course ID
          const finishedAt = watched?.finished_at?.$date?.$numberLong || null; // Safely access finished_at

          return fetch(`http://localhost:4000/courses/${courseId}`)
            .then((res) => res.json())
            .then((course) => ({
              ...course,
              watched_id: watchedId,
              finished_at: finishedAt,
            }));
        });

        // Filter out any null promises before resolving
        const coursesData = await Promise.all(coursePromises.filter(Boolean));
        setCourses(coursesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load watched courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchedData();
  }, [userWatchedIds]); // Refetch when userWatchedIds changes

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="watched-list">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Watched key={index} {...course} />
        ))
      ) : (
        <p className="message">Aún no has registrado cursos</p>
      )}
    </div>
  );
};

export default WatchedList;
