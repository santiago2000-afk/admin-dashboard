import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditModal = ({ rowData, onClose }) => {
  const [formData, setFormData] = useState({ ...rowData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios
      .post(`http://localhost:8080/api/notas/editar/${rowData.id}`, formData)
      .then((response) => {
        console.log("Datos guardados exitosamente:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
      });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Nota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicMateria">
            <Form.Label>Materia</Form.Label>
            <Form.Control
              type="text"
              name="materia"
              value={formData.materia}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicNotaGuias">
            <Form.Label>Nota de Guías</Form.Label>
            <Form.Control
              type="text"
              name="notaGuias"
              value={formData.notaGuias}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicNotaLaboratorio">
            <Form.Label>Nota de Laboratorio</Form.Label>
            <Form.Control
              type="text"
              name="notaLaboratorio"
              value={formData.notaLaboratorio}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicNotaEvaluado">
            <Form.Label>Nota Evaluada</Form.Label>
            <Form.Control
              type="text"
              name="notaEvaluado"
              value={formData.notaEvaluado}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
