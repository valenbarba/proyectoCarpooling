// src/components/HeaderInicio.jsx
import React from "react";
import { FaChevronDown, FaBell } from "react-icons/fa";
import "./HeaderInicio.css";
import { useLocation, useNavigate } from "react-router-dom";

// el header recibe los props titulo y funcion de click en el avatar
const HeaderInicio = ({ titulo, onAvatarClick }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleNotificationsClick = () =>{
    navigate("/notificaciones");
  }

  const estaEnNotificaciones = location.pathname === "/notificaciones";

  return (
    <div className="header-inicio">
      
      {/* Título enviado por prop */}
      <h2>{titulo}</h2>

      <div className="header-iconos">

      <button
          onClick={handleNotificationsClick}
          className="header-notificacion-btn"
          aria-label="Ir a notificaciones"
      >
          <FaBell className={`header-notificacion-icon ${
              estaEnNotificaciones ? "activo" : ""
            }`} />
      
      </button>


      {/* Avatar clickeable */}
        <button
        onClick={onAvatarClick}
        className="header-avatar-btn"
        >
        <img
          src="/IMG_3977.JPG" // Cambiá esto por la ruta real del avatar del usuario
          alt="Perfil"
          className="header-avatar-img"
        />

        {/* Ícono de flechita gris hacia abajo */}
        <FaChevronDown className="header-chevron" />
       </button>

      </div>
      
      


    </div>
  );
};

export default HeaderInicio;
