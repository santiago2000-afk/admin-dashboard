import React from "react";
import PropTypes from "prop-types";

const EstudiantesTable = ({ data, handleEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Estudiante ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Celular</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Género</th>
          <th>Fecha de Nacimiento</th>
          <th>Fecha de Ingreso</th>
          <th>Dirección</th>
          <th>Nombre del Padre</th>
          <th>Nombre de la Madre</th>
          <th>Encargado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((alumno, index) => (
          <tr key={index}>
            <td>{alumno.estudianteId}</td>
            <td>{alumno.nombres}</td>
            <td>{alumno.apellidos}</td>
            <td>{alumno.celular}</td>
            <td>{alumno.correo}</td>
            <td>{alumno.telefono}</td>
            <td>{alumno.genero}</td>
            <td>{alumno.fechaNacimiento}</td>
            <td>{alumno.fechaIngreso}</td>
            <td>{alumno.direccion}</td>
            <td>{alumno.nombrePadre}</td>
            <td>{alumno.nombreMadre}</td>
            <td>{alumno.encargado}</td>
            <td>
              <button className="btn btn-primary" onClick={() => handleEdit(alumno)}>
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

EstudiantesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      estudianteId: PropTypes.number.isRequired,
      nombres: PropTypes.string.isRequired,
      apellidos: PropTypes.string.isRequired,
      celular: PropTypes.string.isRequired,
      correo: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      genero: PropTypes.string.isRequired,
      fechaNacimiento: PropTypes.string.isRequired,
      fechaIngreso: PropTypes.string.isRequired,
      direccion: PropTypes.string.isRequired,
      nombrePadre: PropTypes.string.isRequired,
      nombreMadre: PropTypes.string.isRequired,
      encargado: PropTypes.string.isRequired,
    })
  ).isRequired,

  handleEdit: PropTypes.func.isRequired,
};

export default EstudiantesTable;
