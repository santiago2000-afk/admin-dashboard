import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import DataTable from "../../../examples/Tables/DataTable";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    fontSize: 8,
  },
});

const Alumnos = () => {
  const [alumnosData, setAlumnosData] = useState([]);
  const [gradosDisponibles, setGradosDisponibles] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState(1); // Inicializa selectedGrado con el id del primer grado
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]); // Nuevo estado para almacenar estudiantes filtrados
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/estudiantes?idGrado=${selectedGrado}`);
        if (response.ok) {
          const data = await response.json();
          setAlumnosData(data);
        } else {
          throw new Error("Error al obtener los datos de los alumnos");
        }
      } catch (error) {
        console.error("Error al obtener los datos de los alumnos:", error);
        setError(
          "Error al obtener los datos de los alumnos. Por favor, inténtelo de nuevo más tarde."
        );
      }
    };

    fetchData();
  }, [selectedGrado]);

  useEffect(() => {
    // Obtener los grados disponibles de los estudiantes
    const grados = new Set(alumnosData.map(alumno => alumno.idGrado));
    setGradosDisponibles(Array.from(grados));

    // Filtrar los estudiantes por grado seleccionado
    const filteredStudents = alumnosData.filter(alumno => alumno.idGrado === selectedGrado);
    setAlumnosFiltrados(filteredStudents);
  }, [alumnosData, selectedGrado]);

  const generatePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          {transformData(alumnosFiltrados).columns.map((column, index) => (
            <Text key={index} style={styles.headerCell}>
              {column.Header}
            </Text>
          ))}
        </View>
        {alumnosFiltrados.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {transformData(alumnosFiltrados).columns.map((column, cellIndex) => (
              <Text key={cellIndex} style={styles.cell}>
                {row[column.accessor]}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );  

  const handleGradoChange = (idGrado) => {
    setSelectedGrado(idGrado); // Cambia selectedGrado al id del grado seleccionado
  };

  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-success dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Seleccionar Grado
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {gradosDisponibles.map((idGrado) => (
            <li key={idGrado}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleGradoChange(idGrado)} // Pasa el id del grado a handleGradoChange
              >
                Grado {idGrado}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {error ? (
        <div>{error}</div>
      ) : alumnosFiltrados.length > 0 ? ( // Usar alumnosFiltrados en lugar de alumnosData
        <>
          <DataTable table={transformData(alumnosFiltrados)} />
          <PDFDownloadLink document={generatePDF()} fileName="alumnos.pdf">
            {({ loading }) =>
              loading ? "Generando PDF..." : <button className="btn btn-success">Exportar a PDF</button>
            }
          </PDFDownloadLink>
        </>
      ) : (
        <div>No hay datos de alumnos disponibles.</div>
      )}
    </div>
  );
};

const transformData = (alumnosData) => {
  return {
    columns: [
      { Header: "Carnet", accessor: "carnet", width: "15%", align: "left" },
      { Header: "Nombres", accessor: "nombres", width: "20%", align: "left" },
      { Header: "Apellidos", accessor: "apellidos", width: "20%", align: "left" },
      { Header: "Genero", accessor: "genero", width: "10%", align: "left" },
      { Header: "Direccion", accessor: "direccion", width: "20%", align: "left" },
      { Header: "Encargado", accessor: "encargado", width: "15%", align: "left" },
      { Header: "Grado", accessor: "idGrado", width: "10%", align: "center" },
    ],
    rows: alumnosData.map(
      ({ carnet, nombres, apellidos, genero, direccion, encargado, idGrado }, index) => ({
        carnet,
        nombres,
        apellidos,
        genero,
        direccion,
        encargado,
        idGrado,
        id: index,
      })
    ),
  };
};

export default Alumnos;
