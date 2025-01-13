import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Watched = ({ _id, title, platform, author, duration, language, description, topics, url, watched_id, finished_at  }) => {
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
          <div><b>Plataforma:</b> {platform}</div>
          <div><b>Autor:</b> {author}</div>
          <div><b>Duración:</b> {duration} horas</div>
          <div><b>Idioma:</b> {language}</div>
          <div><b>Descripción:</b> {description}</div>
          <div><b>Terminado:</b> {formattedDate}</div>

          {/* Displaying topics as tags */}
          <div><b>Temas:</b></div>
          <div className="topics-list">
            {topics && topics.length > 0 ? (
              topics.map((topic, index) => (
                <span key={index} className="topic-tag">{topic}</span>
              ))
            ) : (
              <span>No topics available</span>
            )}
          </div>
        </div><br />
        <Button className="watched-visit-button" href={url} target="_blank" rel="noopener noreferrer">
          Ver
        </Button>
        {/*<Button className="watched-edit-button">
          Editar
        </Button>*/}
        <Button className="watched-delete-button">
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Watched;
