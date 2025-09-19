import React, { useRef, useEffect } from "react";
import "./DropdownMenu.css";

const DropdownMenu = ({ onClose }) => {
  const menuRef = useRef(null);

  // Cierra si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose(); // Llama al cierre desde el padre
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={menuRef} className="dropdown-menu">
      <ul>
        <li>Mi perfil</li>
        <li>Configuración</li>
        <li onClick={onClose}>Cerrar sesión</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
