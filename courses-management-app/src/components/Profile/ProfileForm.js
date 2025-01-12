import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ProfileForm = () => {
  const { userData, setUserData } = useAuth(); // Access user data from AuthContext
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    major: '',
    watched_ids: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        lastname: userData.lastname || '',
        major: userData.major || '',
        email: userData.email || '',
        watched_ids: userData.watched_ids || [],
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation patterns for name and lastname
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚ\s\-]+$/;

    // Validate name and lastname fields
    if (name === 'name' || name === 'lastname') {
      if (!namePattern.test(value) && value.trim() !== '') {
        setErrorMessage(
          `${name === 'name' ? 'Nombre' : 'Apellido'} tuvo caracteres inválidos.`
        );
        setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3s
        return; // Prevent invalid value from being set
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Ensure non-empty name and lastname before saving
    if (!formData.name.trim() || !formData.lastname.trim()) {
      setErrorMessage('Nombre/apellido vacíos');
      setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3s
      return;
    }

    try {
      const currentUnixTime = Date.now(); // Current date-time in milliseconds
      const updatedData = {
        ...formData,
        password: userData.password, // Include password from AuthContext
        created_at: userData.created_at, // Include created_at from AuthContext
        updated_at: {
          $date: {
            $numberLong: currentUnixTime.toString(),
          },
        },
      };

      console.log('Updated Data:', updatedData); // Log for debugging

      const response = await axios.put(
        `http://localhost:4000/users/${userData._id.$oid}`, // Endpoint to update user
        updatedData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Response value:', response);

      const resp = await axios.get(`http://localhost:4000/users/${userData._id.$oid}`);

      console.log('Resp value:', resp);

      setUserData(resp.data); // Update AuthContext
      setSuccessMessage('Actualización exitosa');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3s

      // Keep formData with the updated values from the response (userData)
      setFormData({
        name: resp.data.name || '',
        lastname: resp.data.lastname || '',
        email: resp.data.email || '',
        major: resp.data.major || '',
        watched_ids: resp.data.watched_ids || [],
      });

      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Error al actualizar');
      setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3s
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-form-container">
      <h2 className="profile-title">Perfil</h2>
      {successMessage && <div className="successMsg">{successMessage}</div>}
      {errorMessage && <div className="errorMsg">{errorMessage}</div>}
      <form className="profile-form">
        <div className="form-group">
          <label>Nombre(s)</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>Apellido(s)</label><br />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>Correo</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>Grado académico</label><br />
          <select
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-select"
          >
            <option value="default">default</option>
            <option value="Bachiller">Bachiller</option>
            <option value="Técnico">Técnico</option>
            <option value="Técnico superior">Técnico superior</option>
            <option value="Pasante">Pasante</option>
            <option value="Licenciado">Licenciado</option>
            <option value="Ingeniero">Ingeniero</option>
            <option value="Maestrante">Maestrante</option>
            <option value="Maestro">Maestro</option>
            <option value="Doctorante">Doctorante</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        <div className="profile-buttons">
          {isEditing ? (
            <>
              <button
                type="button"
                className="profile-save-button"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                type="button"
                className="profile-cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              className="profile-edit-button"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
