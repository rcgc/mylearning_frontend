import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Watched = ({
  _id,
  title,
  platform,
  author,
  duration,
  language,
  description,
  topics,
  url,
  watched_id,
  finished_at,
}) => {
  const { userData, setUserData, userWatchedIds, setUserWatchedIds } = useAuth();

  const handleDelete = async () => {
    try {
      // Step 1: Remove the watched_id from the user's watched_ids list
      const updatedWatchedIds = userWatchedIds.filter((id) => id !== watched_id);

      // Step 2: Update the user's data in the database
      await axios.put(
        `http://localhost:4000/users/${userData._id.$oid}`,
        {
          ...userData,
          watched_ids: updatedWatchedIds,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Step 3: Delete the watched item from the database
      await axios.delete(`http://localhost:4000/watched/${watched_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Step 4: Update local storage
      const updatedUserData = { ...userData, watched_ids: updatedWatchedIds };
      localStorage.setItem(
        'authData',
        JSON.stringify({ user: updatedUserData })
      );

      // Step 5: Update the AuthContext
      setUserWatchedIds(updatedWatchedIds);
      setUserData(updatedUserData);

      alert('Watched eliminado exitosamente!');
    } catch (error) {
      console.error('Error deleting watched item:', error);
      alert('Failed to delete the watched item. Please try again.');
    }
  };

  const formattedDate = finished_at
    ? new Date(parseInt(finished_at, 10)).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : 'No terminado';

  return (
    <Card className="watched-card">
      <Card.Body>
        <Card.Title className="watched-title">{title}</Card.Title>
        <div className="course-details">
          <div>
            <b>Plataforma:</b> {platform}
          </div>
          <div>
            <b>Autor:</b> {author}
          </div>
          <div>
            <b>Duración:</b> {duration} horas
          </div>
          <div>
            <b>Idioma:</b> {language}
          </div>
          <div>
            <b>Descripción:</b> {description}
          </div>
          <div>
            <b>Terminado:</b> {formattedDate}
          </div>

          {/* Displaying topics as tags */}
          <div>
            <b>Temas:</b>
          </div>
          <div className="topics-list">
            {topics && topics.length > 0 ? (
              topics.map((topic, index) => (
                <span key={index} className="topic-tag">
                  {topic}
                </span>
              ))
            ) : (
              <span>No topics available</span>
            )}
          </div>
        </div>
        <br />
        <Button
          className="watched-visit-button"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver
        </Button>
        {/*<Button className="watched-edit-button">
          Editar
        </Button>*/}
        <Button
          className="watched-delete-button"
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Watched;
