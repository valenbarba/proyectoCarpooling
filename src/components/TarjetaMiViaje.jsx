import { useState } from "react";
import PropTypes from "prop-types";
import "./TarjetaMiViaje.css";
import { FaCar } from "react-icons/fa";
import { FiCheck, FiClock } from "react-icons/fi";
import ModalConfirmacion from "./ModalConfirmacion";

const formatFecha = (fechaISO, opciones) => {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat("es-AR", opciones).format(fecha);
};

const obtenerIniciales = (texto) => {
  if (!texto) return "?";
  const partes = texto.trim().split(/\s+/);
  if (partes.length === 1) {
    return partes[0][0]?.toUpperCase() || "?";
  }
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
};

function TarjetaMiViaje({
  viaje,
  tipo,
  estado,
  onVerPasajeros,
  onPuntuar,
  onCancelar,
}) {
  const esPropio = tipo === "propio";
  const [mostrarModalCancelacion, setMostrarModalCancelacion] = useState(false);

  const abrirModalCancelacion = () => {
    setMostrarModalCancelacion(true);
  };

  const cerrarModalCancelacion = () => {
    setMostrarModalCancelacion(false);
  };

  const confirmarCancelacion = () => {
    setMostrarModalCancelacion(false);
    onCancelar?.(viaje);
  };
  const avatarTexto = esPropio
    ? viaje.destino?.[0] || viaje.puntoEncuentro?.[0] || "?"
    : obtenerIniciales(viaje.conductor);
  const direccionTexto = viaje.direccion?.trim() || "Dirección no especificada";
  const fechaTexto = viaje.fecha
    ? formatFecha(viaje.fecha, {
        weekday: "short",
        day: "numeric",
        month: "long",
      })
    : "Fecha no disponible";
  const horaTexto = viaje.fecha
    ? formatFecha(viaje.fecha, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Horario no disponible";
  const horarioTexto = viaje.fecha
    ? formatFecha(viaje.fecha, {
        weekday: "short",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Horario no disponible";
  const whatsappNumero = viaje.contactoConductor
    ? viaje.contactoConductor.replace(/[^\d]/g, "")
    : "";
  const whatsappHref = whatsappNumero ? `https://wa.me/${whatsappNumero}` : null;

  const acciones = [];

  if (esPropio && estado === "pendiente") {
    acciones.push({ id: "editar-viaje", etiqueta: "Editar viaje" });
  }
  if (esPropio) {
    acciones.push({
      id: "ver-pasajeros",
      etiqueta: "Ver pasajeros",
      onClick: onVerPasajeros,
    });
  }
  if (estado === "finalizado") {
    acciones.push({
      id: "puntuar",
      etiqueta: esPropio ? "Puntuar pasajeros" : "Puntuar conductor",
      onClick: onPuntuar
        ? () => onPuntuar(viaje, esPropio ? "propio" : "ajeno")
        : undefined,
    });
  }
  if (!esPropio && estado === "pendiente") {
    acciones.push({
      id: "cancelar-asistencia",
      etiqueta: "Cancelar",
      onClick: abrirModalCancelacion,
    });
  }
  

  const estadoSolicitudCrudo = (viaje.estadoSolicitud || viaje.estadoReserva || "")
    .toString()
    .toLowerCase();
  const estadoSolicitud =
    estadoSolicitudCrudo === "aceptada" || estadoSolicitudCrudo === "aceptado"
      ? "aceptada"
      : estadoSolicitudCrudo === "confirmada" || estadoSolicitudCrudo === "confirmado"
      ? "aceptada"
      : "pendiente";

  const estadoSolicitudEtiqueta =
    estadoSolicitud === "aceptada" ? "Solicitud aceptada" : "Solicitud pendiente";

  return (
    <article
      className={`viaje-card${estado === "finalizado" ? " viaje-card--finalizado" : ""}`}
    >
      <header
        className={`viaje-card__header${
          !esPropio ? " viaje-card__header--con-estado" : ""
        }`}
      >
        {!esPropio && (
          <div
            className={`viaje-card__estado viaje-card__estado--${estadoSolicitud}`}
            role="img"
            aria-label={estadoSolicitudEtiqueta}
          >
            {estadoSolicitud === "aceptada" ? (
              <FiCheck aria-hidden="true" />
            ) : (
              <FiClock aria-hidden="true" />
            )}
          </div>
        )}
        <div className="viaje-card__header-principal">
          <div className="viaje-card__avatar" aria-hidden="true">
            {avatarTexto}
          </div>
          <div className="viaje-card__encabezado">
            <h4 className="viaje-card__titulo">{viaje.destino}</h4>
            <p className="viaje-card__direccion">{direccionTexto}</p>
          </div>
        </div>
        <div className="viaje-card__horario" aria-label={`Salida ${horarioTexto}`}>
          <span className="viaje-card__horario-fecha">{fechaTexto}</span>
          <span className="viaje-card__horario-hora">{horaTexto}</span>
        </div>
      </header>

      {tipo === "ajeno" && (
        <div className="viaje-card__conductor">
          <div className="viaje-card__conductor-datos">
            <div className="viaje-card__conductor-identidad">
              <span
                className="viaje-card__label viaje-card__label-icon"
                role="img"
                aria-label="Conductor"
              >
                <FaCar aria-hidden="true" />
              </span>
              <span className="viaje-card__conductor-nombre">
                {viaje.conductor || "Por confirmar"}
              </span>
              {whatsappHref && (
                <a
                  className="viaje-card__whatsapp-enlace"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                >
                  <svg
                    className="viaje-card__whatsapp-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.325.623 4.49 1.71 6.36L4 29l7.832-1.655C13.562 28.424 14.748 28.7 16 28.7c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.8c-1.05 0-2.083-.212-3.044-.627l-.215-.093-4.65.983.988-4.526-.105-.214C8.282 20.142 7.9 18.596 7.9 17c0-4.47 3.63-8.1 8.1-8.1s8.1 3.63 8.1 8.1-3.63 8.1-8.1 8.1zm4.373-5.657c-.237-.118-1.403-.692-1.62-.77-.217-.079-.376-.118-.536.118-.158.237-.615.77-.753.928-.139.158-.277.178-.514.059-.237-.118-1.003-.369-1.91-1.176-.707-.63-1.184-1.409-1.322-1.646-.138-.237-.014-.365.104-.483.107-.107.237-.277.355-.415.118-.139.158-.237.237-.395.079-.158.04-.296-.02-.414-.059-.118-.536-1.293-.734-1.771-.193-.464-.39-.401-.536-.409l-.456-.008c-.158 0-.415.06-.633.296-.217.237-.827.808-.827 1.97 0 1.162.848 2.285.965 2.442.118.158 1.668 2.548 4.047 3.572.566.244 1.008.39 1.352.499.568.181 1.084.156 1.493.095.455-.068 1.403-.574 1.601-1.13.197-.556.197-1.032.138-1.13-.059-.098-.217-.158-.455-.276z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {tipo === "ajeno" && (
        <ul className="viaje-card__detalles">
          {viaje.notas && (
            <li className="viaje-card__nota">
              <span className="viaje-card__label">Notas</span>
              <span className="viaje-card__valor">{viaje.notas}</span>
            </li>
          )}
        </ul>
      )}
      

      {acciones.length > 0 && (
        <div className="viaje-card__acciones">
          {acciones.map((accion) => (
            <button
              key={accion.id}
              type="button"
              id={accion.id}
              className="viaje-card__boton"
              onClick={accion.onClick}
            >
              {accion.etiqueta}
            </button>
          ))}
        </div>
      )}

      <ModalConfirmacion
        isOpen={mostrarModalCancelacion}
        titulo="Cancelar solicitud"
        descripcion="¿Estás seguro de que deseas cancelar la solicitud del viaje?"
        confirmText="Sí, cancelar"
        cancelText="No, volver"
        onConfirm={confirmarCancelacion}
        onCancel={cerrarModalCancelacion}
      />
    </article>
  );
}

TarjetaMiViaje.propTypes = {
  viaje: PropTypes.shape({
    id: PropTypes.string.isRequired,
    destino: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    puntoEncuentro: PropTypes.string.isRequired,
    pasajerosConfirmados: PropTypes.number,
    capacidadTotal: PropTypes.number,
    conductor: PropTypes.string,
    asientoReservado: PropTypes.string,
    notas: PropTypes.string,
    direccion: PropTypes.string,
    contactoConductor: PropTypes.string,
    estadoSolicitud: PropTypes.string,
    estadoReserva: PropTypes.string,
  }).isRequired,
  tipo: PropTypes.oneOf(["propio", "ajeno"]).isRequired,
  estado: PropTypes.oneOf(["pendiente", "finalizado"]).isRequired,
  onVerPasajeros: PropTypes.func,
  onPuntuar: PropTypes.func,
  onCancelar: PropTypes.func,
};

TarjetaMiViaje.defaultProps = {
  onVerPasajeros: undefined,
  onPuntuar: undefined,
  onCancelar: undefined,
};

export default TarjetaMiViaje;
