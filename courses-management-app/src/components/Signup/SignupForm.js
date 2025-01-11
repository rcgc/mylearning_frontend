import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out effect
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setErrorMessage('Contraseñas diferentes');
      setFadeOut(false); // Reset fade-out
      setTimeout(() => setFadeOut(true), 2000); // Trigger fade-out after 2 seconds
      setTimeout(() => setErrorMessage(''), 2500); // Clear error after 2.5 seconds
      return;
    }

    try {
      // Check if email exists
      const emailCheckResponse = await axios.post('http://localhost:4000/users/search', { email: email.trim() });

      if (emailCheckResponse.data) { // Response is a boolean
        setErrorMessage('Correo existente');
        setFadeOut(false); // Reset fade-out
        setTimeout(() => setFadeOut(true), 2000); // Trigger fade-out after 2 seconds
        setTimeout(() => setErrorMessage(''), 2500); // Clear error after 2.5 seconds
        return;
      }

      // Generate current Unix timestamp (milliseconds since epoch)
      const currentTimestamp = Date.now(); 

      // Prepare the payload with the BSON DateTime structure
      const userPayload = {
        name: 'default',
        lastname: 'default',
        major: 'default',
        email: email.trim(),
        password: password.trim(),
        watched_ids: [],
        created_at: {
          "$date": {
            "$numberLong": currentTimestamp.toString(), // Convert to string for BSON
          },
        },
        updated_at: {
          "$date": {
            "$numberLong": currentTimestamp.toString(), // Convert to string for BSON
          },
        },
      };

      // Send POST request to backend
      await axios.post('http://localhost:4000/users', userPayload);

      setSuccessMessage('Registro exitoso');
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error al registrar');
        }
        setFadeOut(false); // Reset fade-out
        setTimeout(() => setFadeOut(true), 2000); // Trigger fade-out after 2 seconds
        setTimeout(() => setErrorMessage(''), 2500); // Clear error after 2.5 seconds
        console.error(error);
      }
  };

  return (
    <div className="signup-form-container">
      <h2 className="login-title">Todos tus cursos<br/> en un sólo lugar</h2>
      <h5 className="login-subtitle">¡El aprendizaje nunca<br/> termina!</h5>
      <br/>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className={`errorMsg ${fadeOut ? 'fade-out' : ''}`}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="successMsg">{successMessage}</div>
        )}
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            required
            className="signup-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="signup-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repetir Contraseña"
            required
            className="signup-input"
          />
        </div>
        <button type="submit" className="signup-button">Registrar</button>
      </form>
      <br />
      <p>¿Ya tienes una cuenta?</p>
      <Link to="/login" className="login-link">Inicia sesión</Link>
    </div>
  );
};

export default SignupForm;
