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

const crearLinkWhatsapp = (numero) => {
  if (!numero) return null;
  const digitos = numero.replace(/\D+/g, "");
  if (!digitos) return null;
  return `https://wa.me/${digitos}`;
};

function TarjetaMiViaje({ viaje, tipo, estado }) {
  const esPropio = tipo === "propio";
  const avatarTexto = esPropio
    ? viaje.destino?.[0] || viaje.puntoEncuentro?.[0] || "?"
    : obtenerIniciales(viaje.conductor);

  const whatsappLink = crearLinkWhatsapp(viaje.whatsapp);

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
          <p className="viaje-card__meta">Salida {formatFecha(viaje.fecha)}</p>
        </div>
      </header>

      <ul className="viaje-card__detalles">
        <li>
          <span className="viaje-card__label">Punto de encuentro</span>
          <span className="viaje-card__valor">{viaje.puntoEncuentro}</span>
        </li>
        {esPropio ? (
          <li>
            <span className="viaje-card__label">Pasajeros confirmados</span>
            <span className="viaje-card__valor">
              {viaje.pasajerosConfirmados} de {viaje.capacidadTotal}
            </span>
          </li>
        ) : (
          <li>
            <span className="viaje-card__label">Conductor</span>
            <div className="viaje-card__dato viaje-card__dato--conductor">
              <span className="viaje-card__valor">{viaje.conductor}</span>
              {whatsappLink && (
                <a
                  className="viaje-card__whatsapp"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="viaje-card__sr-only">
                    Enviar mensaje por WhatsApp a {viaje.conductor}
                  </span>
                  <FaWhatsapp aria-hidden="true" focusable="false" />
                </a>
              )}
            </div>
          </li>
        )}
        {!esPropio && (
          <li>
            <span className="viaje-card__label">Asiento reservado</span>
            <span className="viaje-card__valor">{viaje.asientoReservado}</span>
          </li>
        )}
        {viaje.notas && (
          <li className="viaje-card__nota">
            <span className="viaje-card__label">Notas</span>
            <span className="viaje-card__valor">{viaje.notas}</span>
          </li>
        )}
      </ul>

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
    whatsapp: PropTypes.string,
  }).isRequired,
  tipo: PropTypes.oneOf(["propio", "ajeno"]).isRequired,
  estado: PropTypes.oneOf(["pendiente", "finalizado"]).isRequired,
};

export default TarjetaMiViaje;