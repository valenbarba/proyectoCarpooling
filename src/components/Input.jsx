import React from "react";
import "./Input.css"; // importamos la hoja de estilo de este componente

// campo reutilizable para formulario 
/*
  label: etiqueta que aparece sobre el input
  type: tipo
  value: lo que hay dentro del input, lo trae el estado
  name: para identificar el campo
  onChange: funcion que actualiza el estado cuando se escribe
  ...rest permite pasar otros atributos como required, minLength, etc.
*/

const Input = ({ label, type, value, onChange, name, labelClassName="", ...rest }) => {
  return (
    <div className="input-group">
      <label className={`input-label ${labelClassName}`}>{label}</label>
      <input
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
