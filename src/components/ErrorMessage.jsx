import React from "react";
import "./ErrorMessage.css";

/*
 * Muestra un mensaje de error destacado sólo cuando existe texto para mostrar.
 * De esta forma evitamos reservar espacio vacío en la interfaz.
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null; // Si no hay error, no renderizamos nada.

  return <div className="error-message">{message}</div>;
};

export default ErrorMessage;
