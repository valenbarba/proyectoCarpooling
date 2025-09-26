import PropTypes from "prop-types";
import "./TarjetaMiViaje.css";

const formatFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(fecha);
};

const obtenerIniciales = (texto) => {
  if (!texto) return "?";
  const partes = texto.trim().split(/\s+/);
  if (partes.length === 1) {
    return partes[0][0]?.toUpperCase() || "?";
  }
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
};

function TarjetaMiViaje({ viaje, tipo, estado }) {
  const esPropio = tipo === "propio";
  const avatarTexto = esPropio
    ? viaje.destino?.[0] || viaje.puntoEncuentro?.[0] || "?"
    : obtenerIniciales(viaje.conductor);
  const direccionTexto = viaje.direccion?.trim() || "Dirección no especificada";
  const horarioTexto = viaje.fecha ? formatFecha(viaje.fecha) : "Horario no disponible";
  const whatsappNumero = viaje.contactoConductor
    ? viaje.contactoConductor.replace(/[^\d]/g, "")
    : "";
  const whatsappHref = whatsappNumero ? `https://wa.me/${whatsappNumero}` : null;

  const accion = (() => {
    if (estado !== "finalizado") return null;
    if (esPropio) return "Puntuar pasajero";
    return "Puntuar conductor";
  })();

  return (
    <article
      className={`viaje-card${estado === "finalizado" ? " viaje-card--finalizado" : ""}`}
    >
      <header className="viaje-card__header">
        <div className="viaje-card__avatar" aria-hidden="true">
          {avatarTexto}
        </div>
        <div className="viaje-card__encabezado">
          <h4 className="viaje-card__titulo">{viaje.destino}</h4>
          <p className="viaje-card__meta">Salida {horarioTexto}</p>
        </div>
      </header>

      <div className="viaje-card__resumen">
        <div className="viaje-card__resumen-item">
          <span className="viaje-card__resumen-label">Dirección</span>
          <span className="viaje-card__resumen-value">{direccionTexto}</span>
        </div>
        <div className="viaje-card__resumen-item">
          <span className="viaje-card__resumen-label">Horario</span>
          <span className="viaje-card__resumen-value">{horarioTexto}</span>
        </div>
      </div>

      <ul className="viaje-card__detalles">
        <li>
          <span className="viaje-card__label">Punto de encuentro</span>
          <span className="viaje-card__valor">{viaje.puntoEncuentro}</span>
        </li>
        {viaje.notas && (
          <li className="viaje-card__nota">
            <span className="viaje-card__label">Notas</span>
            <span className="viaje-card__valor">{viaje.notas}</span>
          </li>
        )}
      </ul>

      {tipo === "ajeno" && (
        <div className="viaje-card__conductor">
          <div className="viaje-card__conductor-datos">
            <span className="viaje-card__label">Conductor</span>
            <span className="viaje-card__valor">{viaje.conductor || "Por confirmar"}</span>
          </div>
          {whatsappHref && (
            <a
              className="viaje-card__whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactar
            </a>
          )}
        </div>
      )}

      {accion && (
        <div className="viaje-card__acciones">
          <button type="button" className="viaje-card__boton">
            {accion}
          </button>
        </div>
      )}
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
  }).isRequired,
  tipo: PropTypes.oneOf(["propio", "ajeno"]).isRequired,
  estado: PropTypes.oneOf(["pendiente", "finalizado"]).isRequired,
};

export default TarjetaMiViaje;