import { useId } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./ModalViaje.css";

function ModalViaje({ isOpen, viaje, onClose, onVerPerfil }) {
  const tituloId = useId();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen || !viaje) {
    return null;
  }

  const {
    nombre,
    destino,
    fecha,
    precio,
    comentario,
    rating = 0,
    reviewsCount = 0,
    id: viajeId,
    conductorId,
    apellido,
    avatar,
    barrio,
    lote,
    telefono,
    resenas,
    conductor,
  } = viaje;

  const maxEstrellas = 5;
  const estrellas = Array.from({ length: maxEstrellas }, (_, index) => index + 1);

  const nombreConductor = nombre || conductor || "Conductor";

  const datosConductor = {
    id: conductorId || viajeId,
    nombre: nombreConductor,
    apellido: apellido || "",
    avatar,
    barrio,
    lote,
    telefono,
    resenas,
  };

  const manejarVerPerfil = () => {
    if (onVerPerfil) {
      onVerPerfil(viaje);
      return;
    }

    if (!datosConductor.id) {
      return;
    }

    navigate(`/perfil-pasajero/${datosConductor.id}`, {
      state: {
        pasajero: datosConductor,
        from: {
          pathname: location.pathname,
          state: {
            viajeId,
            reabrirModal: true,
          },
        },
      },
    });
  };

  return (
    <div
      className="modal-viaje__overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={tituloId}
    >
      <div className="modal-viaje__contenedor">
        <button
          type="button"
          className="modal-viaje__cerrar"
          onClick={onClose}
          aria-label="Cerrar detalle del viaje"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <header className="modal-viaje__encabezado">
          <button
            type="button"
            className="modal-viaje__avatar-boton"
            onClick={manejarVerPerfil}
            aria-label={`Ver perfil de ${nombreConductor}`}
          >
            {nombreConductor?.[0]?.toUpperCase() || "?"}
          </button>
          <div>
            <h3 id={tituloId} className="modal-viaje__titulo">
              Viaje con {nombreConductor}
            </h3>
            <div className="modal-viaje__estrellas" aria-label={`Puntaje ${rating} de ${maxEstrellas}`}>
              {estrellas.map((valor) => (
                <FaStar
                  key={valor}
                  className={
                    valor <= Math.round(rating)
                      ? "modal-viaje__estrella modal-viaje__estrella--activa"
                      : "modal-viaje__estrella"
                  }
                  aria-hidden="true"
                />
              ))}
              <span className="modal-viaje__puntaje">
                {rating.toFixed(1)} ({reviewsCount} reseñas)
              </span>
            </div>
          </div>
        </header>

        <section className="modal-viaje__detalle">
          <h4 className="modal-viaje__subtitulo">Detalles del viaje</h4>
          <ul className="modal-viaje__lista">
            <li>
              <strong>Destino:</strong> {destino}
            </li>
            <li>
              <strong>Fecha y hora:</strong> {fecha}
            </li>
            <li>
              <strong>Costo por asiento:</strong> {precio}
            </li>
          </ul>
        </section>

        {comentario && (
          <section className="modal-viaje__comentario">
            <h4 className="modal-viaje__subtitulo">Comentario del conductor</h4>
            <p>{comentario}</p>
          </section>
        )}

        <footer className="modal-viaje__acciones">
          <button type="button" className="modal-viaje__btn" onClick={manejarVerPerfil}>
            Ver perfil del conductor
          </button>
          <button type="button" className="modal-viaje__btn modal-viaje__btn--secundario" onClick={onClose}>
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ModalViaje;
