import React from "react";
import "./Input.css"; // Importamos la hoja de estilo compartida entre inputs y selects.

/*
 * Campo de texto reutilizable para formularios.
 * Recibe una etiqueta y todas las propiedades típicas de un <input> HTML, además
 * de una clase opcional para personalizar el estilo de la etiqueta.
 */
const Input = ({ label, type, value, onChange, name, labelClassName = "", ...rest }) => {
  return (
    <div className="input-group">
      {/* Etiqueta descriptiva que se muestra encima del campo */}
      <label className={`input-label ${labelClassName}`.trim()} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input-field"
        {...rest}
      />
    </div>
  );
};

export default Input;
