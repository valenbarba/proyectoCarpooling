import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DropdownMenu.css";

/*
 * Menú lateral que se muestra al presionar el avatar. Se cierra automáticamente
 * cuando el usuario hace clic fuera del contenedor.
 */
const DropdownMenu = ({ onClose }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const irAMiPerfil = () => {
    navigate("/mi-perfil");
    onClose();
  };

  const cerrarSesion = () => {
    navigate("/login");
    onClose();
  }


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={menuRef} className="dropdown-menu">
      <ul>
        <li onClick={irAMiPerfil}>Mi perfil</li>
        <li>Configuración</li>
        <li onClick={cerrarSesion}>Cerrar sesión</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
