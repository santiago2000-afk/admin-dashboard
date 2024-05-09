import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import DataTable from "../../../examples/Tables/DataTable";
import EditModal from "./EditModal";

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
    alignItems: "center",
  },
  cell: {
    flex: 1,
    fontSize: 8,
  },
  button: {
    marginLeft: 10,
  },
});

const NotasTable = () => {
  const [notasData, setNotasData] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/notas/estudiante/IS00012024/periodo/${selectedGrado}`
        );
        if (response.ok) {
          const data = await response.json();
          setNotasData(data);
        } else {
          throw new Error("Error al obtener los datos de las notas");
        }
      } catch (error) {
        console.error("Error al obtener los datos de las notas:", error);
        setError(
          "Error al obtener los datos de las notas. Por favor, inténtelo de nuevo más tarde."
        );
      }
    };

    fetchData();
  }, [selectedGrado]);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const generatePDF = () => {
    if (!notasData || notasData.length === 0) return null;

    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.header}>
            {transformData(notasData).columns.map((column, index) => (
              <Text key={index} style={styles.headerCell}>
                {column.Header}
              </Text>
            ))}
          </View>
          {notasData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {transformData(notasData).columns.map((column, cellIndex) => (
                <Text key={cellIndex} style={styles.cell}>
                  {row[column.accessor]}
                </Text>
              ))}
            </View>
          ))}
        </Page>
      </Document>
    );
  };

  const transformData = (notasData) => {
    return {
      columns: [
        { Header: "Materia", accessor: "materia", width: "25%", align: "left" },
        { Header: "Nota de Guías", accessor: "notaGuias", width: "20%", align: "left" },
        { Header: "Nota de Laboratorio", accessor: "notaLaboratorio", width: "20%", align: "left" },
        { Header: "Nota Evaluada", accessor: "notaEvaluado", width: "20%", align: "center" },
        {
          Header: "Acciones",
          accessor: "acciones",
          Cell: ({ row }) => (
            <Button variant="primary" onClick={() => handleEdit(row.original)}>
              Editar
            </Button>
          ),
        },
      ],
      rows: notasData.map(
        ({ materia, notaGuias, notaLaboratorio, notaEvaluado, promedioPeriodoMateria }, index) => ({
          materia,
          notaGuias,
          notaLaboratorio,
          notaEvaluado,
          promedioPeriodoMateria,
          id: index,
        })
      ),
    };
  };

  return (
    <div>
      {showModal && selectedRow && (
        <EditModal rowData={selectedRow} onClose={handleCloseModal} />
      )}
      {error ? (
        <div>{error}</div>
      ) : notasData.length > 0 ? (
        <>
          <DataTable table={transformData(notasData)} /> {/* Pasar transformData a DataTable */}
          <PDFDownloadLink document={generatePDF()} fileName="notas.pdf">
            {({ loading }) =>
              loading ? "Generando PDF..." : <Button variant="success">Exportar a PDF</Button>
            }
          </PDFDownloadLink>
        </>
      ) : (
        <div>No hay notas disponibles para el grado seleccionado.</div>
      )}
    </div>
  );
};

export default NotasTable;
