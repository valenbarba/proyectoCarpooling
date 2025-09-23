import React from "react";
import "./Button.css";

/*
 * Botón reutilizable que centraliza estilos y comportamientos comunes.
 * - children: contenido a renderizar dentro del botón (texto o iconos).
 * - onClick: función a ejecutar cuando se presiona.
 * - type: tipo de botón HTML (por defecto "button").
 * - rest: permite inyectar atributos adicionales como className o disabled.
 */
const Button = ({ children, onClick, type = "button", ...rest }) => {
  return (
    <button onClick={onClick} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
