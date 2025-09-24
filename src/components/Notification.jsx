import React from "react";
import PropTypes from "prop-types";
import { FiBell } from "react-icons/fi";
import "./Notification.css";

/**
 * Tarjeta de notificación reutilizable.
 * Usala dentro de <ul> (por defecto renderiza un <li/>).
 */
const NotificationCard = ({
  titulo,
  descripcion,
  icono: Icono = FiBell,
  destacada = false,
  className = "",
  onClick,
  as: Tag = "li",
}) => {
  return (
    <Tag
      className={`notificacion-card${
        destacada ? " notificacion-card--destacada" : ""
      } ${className}`.trim()}
      onClick={onClick}
      role={Tag === "li" ? undefined : "listitem"}
    >
      <span className="notificacion-card__icono" aria-hidden="true">
        <Icono />
      </span>
      <div className="notificacion-card__contenido">
        <h3 className="notificacion-card__titulo">{titulo}</h3>
        <p className="notificacion-card__texto">{descripcion}</p>
      </div>
    </Tag>
  );
};

NotificationCard.propTypes = {
  /** Título de la notificación */
  titulo: PropTypes.string.isRequired,
  /** Descripción o detalle de la notificación */
  descripcion: PropTypes.string.isRequired,
  /** Icono (componente React), por defecto FiBell */
  icono: PropTypes.elementType,
  /** Estilo destacado */
  destacada: PropTypes.bool,
  /** Clase extra opcional */
  className: PropTypes.string,
  /** Handler de click */
  onClick: PropTypes.func,
  /** Etiqueta HTML a renderizar (li, div, etc.) */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

export default NotificationCard;