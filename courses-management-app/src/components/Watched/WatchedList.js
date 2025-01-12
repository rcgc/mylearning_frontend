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
    if (!userWatchedIds || userWatchedIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchWatchedData = async () => {
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

          const courseId = watched.course_id.$oid; // Extract the course ID
          const finishedAt = watched?.finished_at?.$date?.$numberLong || null; // Safely access finished_at

          return fetch(`http://localhost:4000/courses/${courseId}`)
            .then((res) => res.json())
            .then((course) => ({
              ...course,
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
  }, [userWatchedIds]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="watched-list">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Watched key={index} {...course} />
        ))
      ) : (
        <p className="message">Aún no has guardado cursos</p>
      )}
    </div>
  );
};

export default WatchedList;
