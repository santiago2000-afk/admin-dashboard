import React    from "react";
import template from "./EstudiantesTable.jsx";

class EstudiantesTable extends React.Component {
  render() {
    return template.call(this);
  }
}

export default EstudiantesTable;
