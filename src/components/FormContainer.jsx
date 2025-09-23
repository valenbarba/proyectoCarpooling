import React from "react";
import "./FormContainer.css";

/*
 * Contenedor reutilizable que aplica un estilo consistente a los formularios y
 * secciones principales. Evita repetir la misma estructura de divs en cada página.
 */
const FormContainer = ({ children }) => {
  return <div className="form-container">{children}</div>;
};

export default FormContainer;
