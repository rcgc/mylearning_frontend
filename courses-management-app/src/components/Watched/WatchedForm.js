import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const WatchedForm = (props) => {
  const [libro, setLibro] = useState({
    nombrelibro: props.libro ? props.libro.nombrelibro : '',
    autor: props.libro ? props.libro.autor : '',
    cantidad: props.libro ? props.libro.cantidad : '',
    fecha: props.libro ? props.libro.fecha : ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { nombrelibro, autor, cantidad } = libro;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const valores = [nombrelibro, autor, cantidad];
    let errorMsg = '';

    const todosLosCamposLlenos = valores.every((campo) => {
      const valor = `${campo}`.trim();
      return valor !== '' && valor !== '0';
    });

    if (todosLosCamposLlenos) {
      const libro = {
        id: uuidv4(),
        nombrelibro,
        autor,
        cantidad,
        fecha: new Date()
      };
      props.handleOnSubmit(libro);
    } else {
      errorMsg = 'Por favor, rellene todos los campos.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { nombre, valor } = event.target;
    switch (nombre) {
      case 'cantidad':
        if (valor === '' || parseInt(valor) === +valor) {
          setLibro((prevState) => ({
            ...prevState,
            [nombre]: valor
          }));
        }
        break;
      default:
        setLibro((prevState) => ({
          ...prevState,
          [nombre]: valor
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Título</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="nombrelibro"
            value={nombrelibro}
            placeholder="Ingrese el título del curso"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="autor">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="autor"
            value={autor}
            placeholder="Ingrese el nombre del autor"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="cantidad">
          <Form.Label>Duración</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="cantidad"
            value={cantidad}
            placeholder="Ingrese la duración en horas"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default WatchedForm;