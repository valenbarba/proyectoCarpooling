import React from "react";
import PropTypes from "prop-types";
import { FiBell } from "react-icons/fi";
import "./RequestNotification.css";

/**
 * Tarjeta de notificación con botones de acción.
 * Extiende el estilo de NotificationCard agregando Aceptar/Rechazar.
 */
const RequestNotification = ({
  titulo,
  descripcion,
  icono: Icono = FiBell,
  destacada = false,
  onAccept,
  onReject,
  className = "",
  as: Tag = "li",
}) => {
  return (
    <Tag
      className={`notificacion-card notificacion-card--con-acciones${
        destacada ? " notificacion-card--destacada" : ""
      } ${className}`.trim()}
      role={Tag === "li" ? undefined : "listitem"}
    >
      <span className="notificacion-card__icono" aria-hidden="true">
        <Icono />
      </span>
      <div className="notificacion-card__contenido">
        <h3 className="notificacion-card__titulo">{titulo}</h3>
        <p className="notificacion-card__texto">{descripcion}</p>

        <div className="notificacion-card__acciones">
          <button
            type="button"
            className="notificacion-card__btn notificacion-card__btn--reject"
            onClick={onReject}
          >
            Rechazar
          </button>
          <button
            type="button"
            className="notificacion-card__btn notificacion-card__btn--accept"
            onClick={onAccept}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Tag>
  );
};

RequestNotification.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  icono: PropTypes.elementType,
  destacada: PropTypes.bool,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

export default RequestNotification;
