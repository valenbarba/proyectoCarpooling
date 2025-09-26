import { useId } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import "./ModalViaje.css";

function ModalViaje({ isOpen, viaje, onClose, onVerPerfil }) {
  const tituloId = useId();

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
  } = viaje;

  const maxEstrellas = 5;
  const estrellas = Array.from({ length: maxEstrellas }, (_, index) => index + 1);

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
          <div className="modal-viaje__avatar" aria-hidden="true">
            {nombre?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <h3 id={tituloId} className="modal-viaje__titulo">
              Viaje con {nombre}
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
          <button type="button" className="modal-viaje__btn" onClick={onVerPerfil}>
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
