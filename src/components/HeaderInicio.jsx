import React from "react";
import { FaChevronDown, FaBell } from "react-icons/fa";
import "./HeaderInicio.css";
import { useLocation, useNavigate } from "react-router-dom";

/*
 * Encabezado que muestra el título contextual de cada pantalla, acceso a
 * notificaciones y el avatar del usuario.
 */
const HeaderInicio = ({ titulo, onAvatarClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNotificationsClick = () => {
    navigate("/notificaciones");
  };

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
          <FaBell
            className={`header-notificacion-icon ${estaEnNotificaciones ? "activo" : ""}`}
            aria-hidden="true"
          />
        </button>

        {/* Avatar clickeable que despliega el menú */}
        <button onClick={onAvatarClick} className="header-avatar-btn">
          <img
            src="/IMG_2178 (1).JPG" // Reemplazar por la ruta real del avatar del usuario.
            alt="Perfil"
            className="header-avatar-img"
          />

          {/* Ícono que refuerza visualmente que el avatar es desplegable */}
          <FaChevronDown className="header-chevron" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default HeaderInicio;
