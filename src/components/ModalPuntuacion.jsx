import { useEffect, useId, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FaStar, FaTimes } from "react-icons/fa";
import "./ModalPuntuacion.css";

const ESTRELLAS = Array.from({ length: 5 }, (_, index) => index + 1);

const ESTADO_INICIAL_CONDUCTOR = {
  puntualidad: 0,
  amabilidad: 0,
  conduccionSegura: 0,
  comentario: "",
};

const crearEstadoInicialPasajeros = (pasajeros = []) =>
  pasajeros.reduce((acumulador, pasajero) => {
    acumulador[pasajero.id] = {
      puntualidad: 0,
      amabilidad: 0,
      general: 0,
      comentario: "",
    };
    return acumulador;
  }, {});

function ModalPuntuacion({ abierto, tipo, viaje, onCerrar, onConfirmar }) {
  const tituloId = useId();
  const [calificacionesPasajeros, setCalificacionesPasajeros] = useState({});
  const [calificacionConductor, setCalificacionConductor] = useState(
    ESTADO_INICIAL_CONDUCTOR
  );

  const pasajerosCalificables = useMemo(() => {
    if (tipo !== "propio" || !viaje) return [];

    return (viaje.pasajeros || []).filter(
      (pasajero) => pasajero.estado === "aceptado"
    );
  }, [tipo, viaje]);

  useEffect(() => {
    if (!abierto) return;

    if (tipo === "propio") {
      setCalificacionesPasajeros(
        crearEstadoInicialPasajeros(pasajerosCalificables)
      );
    } else if (tipo === "ajeno") {
      setCalificacionConductor(ESTADO_INICIAL_CONDUCTOR);
    }
  }, [abierto, tipo, pasajerosCalificables]);

  if (!abierto || !viaje) {
    return null;
  }

  const manejarClickEstrella = (valorActual, valorNuevo, onChange) => {
    const nuevoValor = valorActual === valorNuevo ? 0 : valorNuevo;
    onChange(nuevoValor);
  };

  const renderEstrellas = (valorActual, onChange, etiqueta) => (
    <div className="modal-puntuacion__estrellas" role="radiogroup" aria-label={etiqueta}>
      {ESTRELLAS.map((valor) => (
        <button
          key={valor}
          type="button"
          className={`modal-viaje__estrella modal-puntuacion__estrella-boton${
            valor <= valorActual ? " modal-viaje__estrella--activa" : ""
          }`}
          onClick={() => manejarClickEstrella(valorActual, valor, onChange)}
          aria-label={`${valor} estrella${valor === 1 ? "" : "s"}`}
        >
          <FaStar aria-hidden="true" />
        </button>
      ))}
      <span className="modal-puntuacion__valor">{valorActual}</span>
    </div>
  );

  const manejarCambioPasajero = (pasajeroId, campo, valor) => {
    setCalificacionesPasajeros((previo) => ({
      ...previo,
      [pasajeroId]: {
        ...previo[pasajeroId],
        [campo]: valor,
      },
    }));
  };

  const manejarCambioConductor = (campo, valor) => {
    setCalificacionConductor((previo) => ({
      ...previo,
      [campo]: valor,
    }));
  };

  const manejarConfirmar = (evento) => {
    evento.preventDefault();

    if (tipo === "propio") {
      const calificaciones = Object.entries(calificacionesPasajeros).map(
        ([pasajeroId, datos]) => ({
          pasajeroId,
          ...datos,
        })
      );

      onConfirmar({
        tipo: "propio",
        viajeId: viaje.id,
        destino: viaje.destino,
        calificaciones,
      });
    } else {
      onConfirmar({
        tipo: "ajeno",
        viajeId: viaje.id,
        destino: viaje.destino,
        conductor: viaje.conductor,
        calificacion: calificacionConductor,
      });
    }
  };

  return (
    <div className="modal-puntuacion" role="dialog" aria-modal="true" aria-labelledby={tituloId}>
      <div className="modal-puntuacion__contenedor">
        <header className="modal-puntuacion__encabezado">
          <div>
            <h2 id={tituloId} className="modal-puntuacion__titulo">
              {tipo === "propio" ? "Puntuar pasajeros" : "Puntuar conductor"}
            </h2>
            <p className="modal-puntuacion__descripcion">
              {viaje.destino}
              {viaje.fecha && (
                <span className="modal-puntuacion__fecha">
                  {new Intl.DateTimeFormat("es-AR", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(viaje.fecha))}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            className="modal-puntuacion__cerrar"
            onClick={onCerrar}
            aria-label="Cerrar"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </header>

        <form className="modal-puntuacion__formulario" onSubmit={manejarConfirmar}>
          {tipo === "propio" ? (
            <div className="modal-puntuacion__contenido">
              {pasajerosCalificables.length > 0 ? (
                pasajerosCalificables.map((pasajero) => {
                  const calificacionActual =
                    calificacionesPasajeros[pasajero.id] ||
                    crearEstadoInicialPasajeros([pasajero])[pasajero.id];

                  return (
                    <section key={pasajero.id} className="modal-puntuacion__tarjeta">
                      <header className="modal-puntuacion__tarjeta-encabezado">
                        {pasajero.avatar ? (
                          <img
                            src={pasajero.avatar}
                            alt=""
                            className="modal-puntuacion__avatar"
                          />
                        ) : (
                          <span className="modal-puntuacion__avatar modal-puntuacion__avatar--placeholder">
                            {pasajero.nombre?.[0]?.toUpperCase()}
                          </span>
                        )}
                        <div>
                          <h3 className="modal-puntuacion__tarjeta-titulo">
                            {pasajero.nombre} {pasajero.apellido}
                          </h3>
                          
                        </div>
                      </header>

                      <div className="modal-puntuacion__campos">
                        <label className="modal-puntuacion__campo">
                          <span className="modal-puntuacion__campo-label">Puntualidad</span>
                          {renderEstrellas(
                            calificacionActual.puntualidad,
                            (valor) =>
                              manejarCambioPasajero(
                                pasajero.id,
                                "puntualidad",
                                valor
                              ),
                            `Puntualidad de ${pasajero.nombre} ${pasajero.apellido}`
                          )}
                        </label>

                        <label className="modal-puntuacion__campo">
                          <span className="modal-puntuacion__campo-label">Amabilidad</span>
                          {renderEstrellas(
                            calificacionActual.amabilidad,
                            (valor) =>
                              manejarCambioPasajero(
                                pasajero.id,
                                "amabilidad",
                                valor
                              ),
                            `Amabilidad de ${pasajero.nombre} ${pasajero.apellido}`
                          )}
                        </label>

                        <label className="modal-puntuacion__campo">
                          <span className="modal-puntuacion__campo-label">Puntuación general</span>
                          {renderEstrellas(
                            calificacionActual.general,
                            (valor) =>
                              manejarCambioPasajero(
                                pasajero.id,
                                "general",
                                valor
                              ),
                            `Puntuación general de ${pasajero.nombre} ${pasajero.apellido}`
                          )}
                        </label>

                        <label className="modal-puntuacion__campo">
                          <span className="modal-puntuacion__campo-label">Comentario</span>
                          <textarea
                            className="modal-puntuacion__textarea"
                            value={calificacionActual.comentario}
                            onChange={(evento) =>
                              manejarCambioPasajero(
                                pasajero.id,
                                "comentario",
                                evento.target.value
                              )
                            }
                            placeholder="Compartí detalles del viaje con esta persona"
                          />
                        </label>
                      </div>
                    </section>
                  );
                })
              ) : (
                <p className="modal-puntuacion__mensaje-vacio">
                  No hay pasajeros aceptados para calificar en este viaje.
                </p>
              )}
            </div>
          ) : (
            <section className="modal-puntuacion__tarjeta">
              <header className="modal-puntuacion__tarjeta-encabezado">
                <span className="modal-puntuacion__avatar modal-puntuacion__avatar--placeholder">
                  {viaje.conductor?.[0]?.toUpperCase() || "?"}
                </span>
                <div>
                  <h3 className="modal-puntuacion__tarjeta-titulo">
                    {viaje.conductor || "Conductor"}
                  </h3>
                  <p className="modal-puntuacion__tarjeta-detalle">
                    Valorá la puntualidad, la amabilidad y la conducción segura del viaje.
                  </p>
                </div>
              </header>

              <div className="modal-puntuacion__campos">
                <label className="modal-puntuacion__campo">
                  <span className="modal-puntuacion__campo-label">Puntualidad</span>
                  {renderEstrellas(
                    calificacionConductor.puntualidad,
                    (valor) => manejarCambioConductor("puntualidad", valor),
                    "Puntualidad del conductor"
                  )}
                </label>

                <label className="modal-puntuacion__campo">
                  <span className="modal-puntuacion__campo-label">Amabilidad</span>
                  {renderEstrellas(
                    calificacionConductor.amabilidad,
                    (valor) => manejarCambioConductor("amabilidad", valor),
                    "Amabilidad del conductor"
                  )}
                </label>

                <label className="modal-puntuacion__campo">
                  <span className="modal-puntuacion__campo-label">Conducción segura</span>
                  {renderEstrellas(
                    calificacionConductor.conduccionSegura,
                    (valor) => manejarCambioConductor("conduccionSegura", valor),
                    "Conducción segura del viaje"
                  )}
                </label>

                <label className="modal-puntuacion__campo">
                  <span className="modal-puntuacion__campo-label">Comentario</span>
                  <textarea
                    className="modal-puntuacion__textarea"
                    value={calificacionConductor.comentario}
                    onChange={(evento) =>
                      manejarCambioConductor("comentario", evento.target.value)
                    }
                    placeholder="Comentá cómo fue el viaje con la persona que condujo"
                  />
                </label>
              </div>
            </section>
          )}

          <footer className="modal-puntuacion__acciones">
            <button
              type="button"
              className="modal-puntuacion__boton modal-puntuacion__boton--secundario"
              onClick={onCerrar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="modal-puntuacion__boton modal-puntuacion__boton--primario"
            >
              Guardar
            </button>
          </footer>
        </form>
      </div>
      <div className="modal-puntuacion__fondo" onClick={onCerrar} aria-hidden="true" />
    </div>
  );
}

ModalPuntuacion.propTypes = {
  abierto: PropTypes.bool,
  tipo: PropTypes.oneOf(["propio", "ajeno"]),
  viaje: PropTypes.shape({
    id: PropTypes.string,
    destino: PropTypes.string,
    fecha: PropTypes.string,
    conductor: PropTypes.string,
    pasajeros: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        nombre: PropTypes.string,
        apellido: PropTypes.string,
        avatar: PropTypes.string,
        estado: PropTypes.string,
      })
    ),
  }),
  onCerrar: PropTypes.func.isRequired,
  onConfirmar: PropTypes.func.isRequired,
};

ModalPuntuacion.defaultProps = {
  abierto: false,
  tipo: undefined,
  viaje: undefined,
};

export default ModalPuntuacion;
