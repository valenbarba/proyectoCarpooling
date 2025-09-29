import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import Notification from "../components/Notification";
import RequestNotification from "../components/RequestNotification";

export default function NotificationPage({
  solicitudes,
  notificaciones,
  onAcceptSolicitud,
  onRejectSolicitud,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerPerfilSolicitud = (pasajero, solicitud) => {
    if (!pasajero?.id) {
      return;
    }

    navigate(`/perfil-pasajero/${pasajero.id}`, {
      state: {
        pasajero,
        from: {
          pathname: location.pathname,
          state: {
            solicitudId: solicitud?.id,
            viajeId: solicitud?.viajeId,
            reabrirModal: true,
          },
        },
      },
    });
  };

  return (
    <section className="notificaciones-page">
      <ul className="notificaciones-lista">
        {/* Se listan primero las solicitudes pendientes para destacarlas visualmente. */}
        {solicitudes.map((solicitud) => (
          <RequestNotification
            key={solicitud.id}
            titulo={solicitud.titulo}
            descripcion={solicitud.descripcion}
            icono={solicitud.icono}
            destacada={solicitud.destacada}
            pasajero={solicitud.pasajero}
            onVerPerfil={(pasajeroSeleccionado) =>
              handleVerPerfilSolicitud(pasajeroSeleccionado, solicitud)
            }
            onAccept={() => onAcceptSolicitud?.(solicitud)}
            onReject={() => onRejectSolicitud?.(solicitud)}
          />
        ))}

        {/* Luego se muestran las notificaciones informativas. */}
        {notificaciones.map((notificacion) => (
          <Notification
            key={notificacion.id}
            titulo={notificacion.titulo}
            descripcion={notificacion.descripcion}
            icono={notificacion.icono || FiBell}
            destacada={!!notificacion.destacada}
            onClick={() => notificacion.onClick?.(notificacion)}
          />
        ))}

        {/* Mensaje auxiliar cuando no hay notificaciones pendientes. */}
        {solicitudes.length === 0 && notificaciones.length === 0 && (
          <li className="notificaciones-vacias">No tenés notificaciones nuevas.</li>
        )}
      </ul>
    </section>
  );
}

NotificationPage.propTypes = {
  solicitudes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      titulo: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      icono: PropTypes.elementType,
      destacada: PropTypes.bool,
      viajeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    })
  ),
  notificaciones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      titulo: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      icono: PropTypes.elementType,
      destacada: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ),
  onAcceptSolicitud: PropTypes.func,
  onRejectSolicitud: PropTypes.func,
};

NotificationPage.defaultProps = {
  solicitudes: [],
  notificaciones: [],
  onAcceptSolicitud: undefined,
  onRejectSolicitud: undefined,
};
