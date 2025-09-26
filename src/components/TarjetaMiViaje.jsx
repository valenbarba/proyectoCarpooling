import PropTypes from "prop-types";
import { FaWhatsapp } from "react-icons/fa";
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
    ? viaje.destino?.[0] || viaje.direccion?.[0] || "?"
    : obtenerIniciales(viaje.conductor);

  const enlaceWhatsapp = (() => {
    if (!viaje.contactoConductor) return null;
    const numeroSanitizado = viaje.contactoConductor.replace(/[^\d+]/g, "");
    const numeroFinal = numeroSanitizado.replace(/^\+/, "");
    return numeroFinal ? `https://wa.me/${numeroFinal}` : null;
  })();

  const lugaresDisponibles = esPropio && typeof viaje.capacidadTotal === "number"
    ? Math.max(viaje.capacidadTotal - (viaje.pasajerosConfirmados || 0), 0)
    : null;

  const accion = (() => {
    if (estado !== "finalizado") return null;
    if (esPropio) return "Puntuar pasajero";
    return "Puntuar conductor";
  })();

  return (
    <article className={`viaje-card${estado === "finalizado" ? " viaje-card--finalizado" : ""}`}>
      <header className="viaje-card__header">
        <div className="viaje-card__avatar" aria-hidden="true">
          {avatarTexto}
        </div>
        <div className="viaje-card__encabezado">
          <h4 className="viaje-card__titulo">{viaje.destino}</h4>
          {viaje.direccion && (
            <p className="viaje-card__direccion">{viaje.direccion}</p>
          )}
          <p className="viaje-card__fecha">Salida {formatFecha(viaje.fecha)}</p>
        </div>
      </header>

      <div className="viaje-card__info">
        {esPropio ? (
          <div className="viaje-card__dato">
            <span className="viaje-card__dato-label">Pasajeros</span>
            <span className="viaje-card__dato-valor">
              {viaje.pasajerosConfirmados ?? 0} / {viaje.capacidadTotal ?? "-"}
            </span>
          </div>
        ) : (
          <div className="viaje-card__dato viaje-card__dato--conductor">
            <div>
              <span className="viaje-card__dato-label">Conductor</span>
              <span className="viaje-card__dato-valor">{viaje.conductor}</span>
            </div>
            {enlaceWhatsapp && (
              <a
                className="viaje-card__whatsapp"
                href={enlaceWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chatear con ${viaje.conductor} por WhatsApp`}
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
            )}
          </div>
        )}

        {esPropio && lugaresDisponibles !== null && (
          <div className="viaje-card__dato">
            <span className="viaje-card__dato-label">Disponible</span>
            <span className="viaje-card__dato-valor">
              {lugaresDisponibles} lugar{lugaresDisponibles === 1 ? "" : "es"}
            </span>
          </div>
        )}
      </div>

      {viaje.notas && (
        <div className="viaje-card__notas">
          <span className="viaje-card__notas-titulo">Notas</span>
          <p className="viaje-card__notas-texto">{viaje.notas}</p>
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
    direccion: PropTypes.string,
    fecha: PropTypes.string.isRequired,
    pasajerosConfirmados: PropTypes.number,
    capacidadTotal: PropTypes.number,
    conductor: PropTypes.string,
    contactoConductor: PropTypes.string,
    notas: PropTypes.string,
  }).isRequired,
  tipo: PropTypes.oneOf(["propio", "ajeno"]).isRequired,
  estado: PropTypes.oneOf(["pendiente", "finalizado"]).isRequired,
};

export default TarjetaMiViaje;