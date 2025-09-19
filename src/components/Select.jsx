import React from "react";
import "./Input.css"; // reutilizamos los mismos estilos

const Select = ({ label, labelClassName, name, value, onChange, required, children }) => {
  return (
    <div className="input-group">
      {label && <label className={labelClassName} htmlFor={name}>{label}</label>}
      <select
        className="input-field"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;