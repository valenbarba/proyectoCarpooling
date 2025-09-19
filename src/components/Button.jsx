import React from "react";
import "./Button.css";

/*
  children: lo que va adentro del boton
  type: submit o button
  onclick funcion a ejecutar al hacer click (luego se define)
  
 */
const Button = ({ children, onClick, type = "button", ...rest }) => {
  return (
    <button onClick={onClick} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
