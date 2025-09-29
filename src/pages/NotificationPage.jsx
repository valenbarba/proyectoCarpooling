import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import Notification from "../components/Notification";
import RequestNotification from "../components/RequestNotification";
import ModalConfirmacion from "../components/ModalConfirmacion";

export default function NotificationPage({
  solicitudes = [],
  notificaciones = [],
  onAcceptSolicitud,
  onRejectSolicitud,
}) {
  const [accionPendiente, setAccionPendiente] = useState(null);

  const abrirModalAccion = (solicitud, accion) => {
    setAccionPendiente({ solicitud, accion });
  };

  const cerrarModalAccion = () => {
    setAccionPendiente(null);
  };

  const confirmarAccion = () => {
    if (!accionPendiente) return;

    const { solicitud, accion } = accionPendiente;

    if (accion === "accept") {
      onAcceptSolicitud?.(solicitud);
    } else if (accion === "reject") {
      onRejectSolicitud?.(solicitud);
    }

    cerrarModalAccion();
  };

  const esAceptar = accionPendiente?.accion === "accept";
  const solicitudSeleccionada = accionPendiente?.solicitud;
  const tituloModal = esAceptar ? "Aceptar solicitud" : "Rechazar solicitud";
  const descripcionModal = solicitudSeleccionada
    ? esAceptar
      ? `¿Deseás aceptar la solicitud "${solicitudSeleccionada.titulo}"?`
      : `¿Deseás rechazar la solicitud "${solicitudSeleccionada.titulo}"?`
    : "";
  const confirmText = esAceptar ? "Sí, aceptar" : "Sí, rechazar";

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
            onAccept={() => abrirModalAccion(solicitud, "accept")}
            onReject={() => abrirModalAccion(solicitud, "reject")}
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
      <ModalConfirmacion
        isOpen={Boolean(accionPendiente)}
        titulo={tituloModal}
        descripcion={descripcionModal}
        confirmText={confirmText}
        cancelText="No, volver"
        onConfirm={confirmarAccion}
        onCancel={cerrarModalAccion}
      />
    </section>
  );
}