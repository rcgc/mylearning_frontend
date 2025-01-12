import React, { useState } from 'react';
import axios from 'axios';

const WatchedForm = ({ onAddWatched }) => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseSuggestions, setCourseSuggestions] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [finishedAt, setFinishedAt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch matching courses as user types
  const handleInputChange = async (e) => {
    const title = e.target.value;
    setCourseTitle(title);

    if (title.trim() === '') {
      setCourseSuggestions([]);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/courses/search', { title });
      setCourseSuggestions(response.data); // Assuming the response is an array of course objects
    } catch (error) {
      console.error('Error fetching course suggestions:', error);
      setCourseSuggestions([]);
    }
  };

  // Handle selection from suggestions
  const handleSelectCourse = (course) => {
    setCourseTitle(course.title); // Autofill the title
    setCourseData(course); // Store the course details
    setCourseSuggestions([]); // Clear suggestions
  };

  const handleAddWatched = async () => {
    if (!courseData) {
      setErrorMessage('Select a valid course before adding.');
      return;
    }

    const currentUnixTime = Date.now();
    try {
      const response = await axios.post('http://localhost:4000/watched/', {
        course_id: courseData._id.$oid,
        finished_at: finishedAt
          ? { $date: { $numberLong: new Date(finishedAt).getTime().toString() } }
          : null,
        created_at: { $date: { $numberLong: currentUnixTime.toString() } },
        updated_at: { $date: { $numberLong: currentUnixTime.toString() } },
        archived: false,
      });

      const watchedId = response.data.watched_id; // Assuming the response contains this
      onAddWatched(watchedId); // Call parent function to handle user update
    } catch (error) {
      setErrorMessage('Error adding the watched course.');
    }
  };

  return (
    <div className="watched-form-container">
      <h2 className="watched-form-title">Agregar</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          value={courseTitle}
          onChange={handleInputChange}
          placeholder="Título del curso"
          className="watched-form-input"
        />
        {/* Dropdown for suggestions */}
        {courseSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {courseSuggestions.map((course) => (
              <li
                key={course._id.$oid}
                onClick={() => handleSelectCourse(course)}
                className="suggestion-item"
              >
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </div>
        
      {courseData && (
        <div className="course-data">
          <div className="form-group">
            <label>Plataforma</label>
            <input 
              type="text" 
              value={courseData.platform} 
              readOnly
              disabled={true}
              className="watched-form-input" 
            />
          </div>

          <div className="form-group">
            <label>Autor</label>
            <input 
              type="text" 
              value={courseData.author} 
              readOnly
              disabled={true}
              className="watched-form-input" 
            />
          </div>

          <div className="form-group">
            <label>Duración</label>
            <input 
              type="text" 
              value={courseData.duration} 
              readOnly
              disabled={true}
              className="watched-form-input" 
            />
          </div>

          <div className="form-group">
            <label>Idioma</label>
            <input 
              type="text" 
              value={courseData.language} 
              readOnly
              disabled={true}
              className="watched-form-input" 
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <input 
              type="text" 
              value={courseData.description} 
              readOnly
              disabled={true}
              className="watched-form-input" 
            />
          </div>

          <div className="form-group">
            <label>URL</label>
            <input 
              type="text" 
              value={courseData.url}
              readOnly
              disabled={true}
              className="watched-form-input"
            />
          </div>

          <div className="topics-list">
            {courseData.topics && courseData.topics.length > 0 ? (
              courseData.topics.map((topic, index) => (
                <span key={index} className="topic-tag">
                  {topic}
                </span>
              ))
            ) : (
              <span>No topics available</span>
            )}
          </div>
        </div>
      )}

      <br />
      <div className="form-group">
        <label>Terminado:</label>
        <input
          type="date"
          value={finishedAt}
          onChange={(e) => setFinishedAt(e.target.value)}
          className="watched-form-input"
        />
      </div>

      <button
        type="button"
        className="watched-add-button"
        onClick={handleAddWatched}
      >
        Agregar
      </button>
    </div>
  );
};

export default WatchedForm;
