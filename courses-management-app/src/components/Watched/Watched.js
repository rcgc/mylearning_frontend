import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Watched = ({ title, platform, author, duration, language, description, url, finished_at }) => {
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
          <div><b>Duración:</b> {duration} hours</div>
          <div><b>Idioma:</b> {language}</div>
          <div><b>Descripción:</b> {description}</div>
          <div><b>Terminado:</b> {formattedDate}</div>
        </div><br />
        <Button variant="primary" href={url} target="_blank" rel="noopener noreferrer">
          Go to Course
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Watched;
