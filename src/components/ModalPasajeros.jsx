import PropTypes from "prop-types";
import { useMemo } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import "./ModalPasajeros.css";

const obtenerIniciales = (nombre = "", apellido = "") => {
  const inicialNombre = nombre.trim()[0];
  const inicialApellido = apellido.trim()[0];

  return `${inicialNombre || ""}${inicialApellido || ""}`.toUpperCase() || "?";
};

function ModalPasajeros({
  abierto,
  onCerrar,
  pasajeros = [],
  destino,
  fecha,
  onAceptarPasajero,
  onRechazarPasajero,
}) {
  const { aceptados, pendientes } = useMemo(() => {
    const aceptadosLista = [];
    const pendientesLista = [];

    pasajeros.forEach((pasajero) => {
      if (pasajero.estado === "aceptado") {
        aceptadosLista.push(pasajero);
      } else if (pasajero.estado === "pendiente") {
        pendientesLista.push(pasajero);
      }
    });

    return { aceptados: aceptadosLista, pendientes: pendientesLista };
  }, [pasajeros]);

  if (!abierto) {
    return null;
  }

  return (
    <div className="modal-pasajeros" role="dialog" aria-modal="true">
      <div className="modal-pasajeros__contenedor">
        <header className="modal-pasajeros__encabezado">
          <div>
            <h2 className="modal-pasajeros__titulo">Pasajeros</h2>
            <p className="modal-pasajeros__descripcion">
              {destino}
              {fecha && (
                <span className="modal-pasajeros__fecha">
                  {new Intl.DateTimeFormat("es-AR", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(fecha))}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            className="modal-pasajeros__cerrar"
            onClick={onCerrar}
            aria-label="Cerrar"
          >
            <FiX aria-hidden="true" />
          </button>
        </header>

        <section className="modal-pasajeros__seccion">
          <h3 className="modal-pasajeros__subtitulo">Aceptados</h3>
          {aceptados.length > 0 ? (
            <ul className="modal-pasajeros__lista">
              {aceptados.map((pasajero) => (
                <li key={pasajero.id} className="modal-pasajeros__item">
                  {pasajero.avatar ? (
                    <img
                      className="modal-pasajeros__avatar"
                      src={pasajero.avatar}
                      alt={`${pasajero.nombre} ${pasajero.apellido}`}
                    />
                  ) : (
                    <span className="modal-pasajeros__avatar modal-pasajeros__avatar--placeholder">
                      {obtenerIniciales(pasajero.nombre, pasajero.apellido)}
                    </span>
                  )}
                  <span className="modal-pasajeros__nombre">
                    {pasajero.nombre} {pasajero.apellido}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="modal-pasajeros__mensaje-vacio">Todavía no hay pasajeros aceptados.</p>
          )}
        </section>

        <section className="modal-pasajeros__seccion">
          <h3 className="modal-pasajeros__subtitulo">Pendientes</h3>
          {pendientes.length > 0 ? (
            <ul className="modal-pasajeros__lista">
              {pendientes.map((pasajero) => (
                <li key={pasajero.id} className="modal-pasajeros__item">
                  {pasajero.avatar ? (
                    <img
                      className="modal-pasajeros__avatar"
                      src={pasajero.avatar}
                      alt={`${pasajero.nombre} ${pasajero.apellido}`}
                    />
                  ) : (
                    <span className="modal-pasajeros__avatar modal-pasajeros__avatar--placeholder">
                      {obtenerIniciales(pasajero.nombre, pasajero.apellido)}
                    </span>
                  )}
                  <span className="modal-pasajeros__nombre">
                    {pasajero.nombre} {pasajero.apellido}
                  </span>
                  <div className="modal-pasajeros__acciones">
                    <button
                      type="button"
                      className="modal-pasajeros__accion modal-pasajeros__accion--aceptar"
                      onClick={() => onAceptarPasajero(pasajero.id)}
                      aria-label={`Aceptar a ${pasajero.nombre} ${pasajero.apellido}`}
                    >
                      <FiCheck aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="modal-pasajeros__accion modal-pasajeros__accion--rechazar"
                      onClick={() => onRechazarPasajero(pasajero.id)}
                      aria-label={`Rechazar a ${pasajero.nombre} ${pasajero.apellido}`}
                    >
                      <FiX aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="modal-pasajeros__mensaje-vacio">No hay pasajeros pendientes.</p>
          )}
        </section>
      </div>
      <div className="modal-pasajeros__fondo" onClick={onCerrar} aria-hidden="true" />
    </div>
  );
}

ModalPasajeros.propTypes = {
  abierto: PropTypes.bool,
  onCerrar: PropTypes.func.isRequired,
  pasajeros: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      apellido: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      estado: PropTypes.oneOf(["aceptado", "pendiente", "rechazado"]).isRequired,
    })
  ),
  destino: PropTypes.string,
  fecha: PropTypes.string,
  onAceptarPasajero: PropTypes.func.isRequired,
  onRechazarPasajero: PropTypes.func.isRequired,
};

ModalPasajeros.defaultProps = {
  abierto: false,
  pasajeros: [],
  destino: "",
  fecha: undefined,
};

export default ModalPasajeros;

