import React, { useEffect, useState } from "react";
import DataTable from "../../../examples/Tables/DataTable";

const NotasTable = () => {
  const [notasData, setNotasData] = useState(null);
  const [periodos, setPeriodos] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/notases");
        if (response.ok) {
          const data = await response.json();
          setNotasData(data._embedded.notases);

          // Extrae los periodos únicos de las notas
          const uniquePeriodos = [
            ...new Set(data._embedded.notases.map((nota) => nota.periodo.nombre)),
          ];
          setPeriodos(uniquePeriodos);

          // Establece el primer periodo como seleccionado por defecto
          if (uniquePeriodos.length > 0) {
            setSelectedPeriodo(uniquePeriodos[0]);
          }
        } else {
          console.error("Error al obtener los datos de las notas:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los datos de las notas:", error);
      }
    };

    fetchData();
  }, []);

  const notasFilteredByPeriodo = notasData
    ? notasData.filter((nota) => nota.periodo.nombre === selectedPeriodo)
    : [];

  return (
    <div>
      {/* Dropdown para seleccionar el periodo */}
      <select value={selectedPeriodo} onChange={(e) => setSelectedPeriodo(e.target.value)}>
        {periodos.map((periodo, index) => (
          <option key={index} value={periodo}>
            {periodo}
          </option>
        ))}
      </select>

      {/* Renderiza la tabla de notas filtrada por el periodo seleccionado */}
      {notasFilteredByPeriodo.length > 0 ? (
        <DataTable table={transformData(notasFilteredByPeriodo)} />
      ) : (
        <div>No hay notas disponibles para el periodo seleccionado.</div>
      )}
    </div>
  );
};

const transformData = (notasData) => {
  return {
    columns: [
      { Header: "Materia", accessor: "materia.nombre", width: "25%", align: "left" },
      { Header: "Periodo", accessor: "periodo.nombre", width: "20%", align: "left" },
      { Header: "Tipo de Evaluación", accessor: "tipoEvaluacion", width: "20%", align: "left" },
      { Header: "Ponderación", accessor: "ponderacion", width: "10%", align: "center" },
      { Header: "Nota", accessor: "nota", width: "10%", align: "center" },
      { Header: "Nota Ponderada", accessor: "notaPonderada", width: "15%", align: "center" },
    ],
    rows: notasData.map((nota) => ({
      materia: { nombre: nota.materia.nombre },
      periodo: { nombre: nota.periodo.nombre },
      tipoEvaluacion: nota.tipoEvaluacion,
      ponderacion: nota.ponderacion,
      nota: nota.nota,
      notaPonderada: nota.notaPonderada,
    })),
  };
};

export default NotasTable;
