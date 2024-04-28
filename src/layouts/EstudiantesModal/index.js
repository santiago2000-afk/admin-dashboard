import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const EstudianteModal = ({ isOpen, toggle, handleSubmit, handleChange, form, errors }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Agregar Estudiante</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="form-row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Nombres:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombres"
                  value={form.nombres}
                  onChange={handleChange}
                />
                {errors.nombres && <div className="text-danger">{errors.nombres}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Apellidos:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                />
                {errors.apellidos && <div className="text-danger">{errors.apellidos}</div>}
              </div>
            </div>
          </div>
          {/* Resto del código... */}
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
          <button type="button" className="btn btn-secondary" onClick={toggle}>
            Cancelar
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

EstudianteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChangeFechaNacimiento: PropTypes.func.isRequired,
};

export default EstudianteModal;
