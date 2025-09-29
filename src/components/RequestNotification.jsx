import React from "react";
import PropTypes from "prop-types";
import { FiBell } from "react-icons/fi";
import "./RequestNotification.css";

const obtenerIniciales = (nombre = "", apellido = "") => {
  const inicialNombre = nombre.trim()[0];
  const inicialApellido = apellido.trim()[0];

  return `${inicialNombre || ""}${inicialApellido || ""}`.toUpperCase() || "?";
};

/**
 * Tarjeta de notificación con botones de acción.
 * Extiende el estilo de NotificationCard agregando Aceptar/Rechazar
 * y acceso directo al perfil del pasajero que realiza la solicitud.
 */
const RequestNotification = ({
  titulo,
  descripcion,
  icono: Icono = FiBell,
  destacada = false,
  pasajero,
  onVerPerfil,
  onAccept,
  onReject,
  className = "",
  as: Tag = "li",
}) => {
  const manejarVerPerfil = () => {
    if (pasajero && onVerPerfil) {
      onVerPerfil(pasajero);
    }
  };

  const detalleUbicacion = [
    pasajero?.barrio?.trim(),
    pasajero?.lote ? `Lote ${pasajero.lote}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

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
        {pasajero && (
          <div className="request-notificacion__pasajero">
            <button
              type="button"
              className="request-notificacion__avatar-boton"
              onClick={manejarVerPerfil}
              aria-label={`Ver perfil de ${pasajero.nombre} ${pasajero.apellido}`}
            >
              {pasajero.avatar ? (
                <img
                  className="request-notificacion__avatar"
                  src={pasajero.avatar}
                  alt=""
                />
              ) : (
                <span className="request-notificacion__avatar request-notificacion__avatar--placeholder">
                  {obtenerIniciales(pasajero.nombre, pasajero.apellido)}
                </span>
              )}
            </button>
            <div className="request-notificacion__info">
              <span className="request-notificacion__nombre">
                {pasajero.nombre} {pasajero.apellido}
              </span>
              {detalleUbicacion && (
                <span className="request-notificacion__detalle">{detalleUbicacion}</span>
              )}
            </div>
          </div>
        )}

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
  pasajero: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    barrio: PropTypes.string,
    lote: PropTypes.string,
    telefono: PropTypes.string,
    resenas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        autor: PropTypes.string,
        comentario: PropTypes.string,
      })
    ),
  }).isRequired,
  onVerPerfil: PropTypes.func,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

export default RequestNotification;
