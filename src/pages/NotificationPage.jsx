import React from "react";
import { FiBell } from "react-icons/fi";
import Notification from "../components/Notification";
import RequestNotification from "../components/RequestNotification";

export default function NotificationPage({
  solicitudes = [],
  notificaciones = [],
  onAcceptSolicitud,
  onRejectSolicitud,
}) {
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