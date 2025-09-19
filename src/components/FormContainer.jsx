import React from "react";
import "./FormContainer.css";

// este componente solamente permite envolver otros elementos y aplicar estilo 

const FormContainer = ({ children }) => {
  return <div className="form-container">{children}</div>;
};

export default FormContainer;
