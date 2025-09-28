import { useEffect, useId, useRef, useState } from "react";
import AutocompleteInput from "../components/AutoCompleteInput";
import { LoadScript } from "@react-google-maps/api";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import TarjetaViaje from "../components/TarjetaViaje";
import ModalViaje from "../components/ModalViaje";
import ModalConfirmacion from "../components/ModalConfirmacion";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./Home.css";

function Home({
  nombreBarrio,
  viajesDisponibles = [],
  onBuscarViajes,
  onSumarseViaje,
  onVerDetalleViaje,
  onVerPerfilConductor,
}) {
  // === Estados para controlar el buscador de viajes ===
  const [modoViaje, setModoViaje] = useState("desde"); // "hacia" | "desde"
  const [lugar, setLugar] = useState(null); // Google Place seleccionado
  const [buscadorExpandido, setBuscadorExpandido] = useState(false);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [mostrarTrayectos, setMostrarTrayectos] = useState(viajesDisponibles.length > 0);
  const [seRealizoBusqueda, setSeRealizoBusqueda] = useState(false);
  const resultadosRef = useRef(null);
  const buscadorContentId = useId();
  const [viajeAConfirmar, setViajeAConfirmar] = useState(null);

  useEffect(() => {
    // Al recibir nuevos viajes (por ejemplo, desde el backend) se muestran automáticamente.
    if (viajesDisponibles.length > 0) {
      setMostrarTrayectos(true);
    }
  }, [viajesDisponibles]);

  useEffect(() => {
    if (mostrarTrayectos && resultadosRef.current) {
      resultadosRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mostrarTrayectos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSeRealizoBusqueda(true);
    setMostrarTrayectos(true);

    // Se envían los filtros seleccionados para que el componente padre pueda consultar al backend.
    onBuscarViajes?.({ modo: modoViaje, lugarSeleccionado: lugar });
  };

  const toggleBuscador = () => {
    setBuscadorExpandido((prev) => !prev);
  };

  const abrirModalViaje = (trayecto) => {
    setViajeSeleccionado(trayecto);
    onVerDetalleViaje?.(trayecto);
  };

  const cerrarModalViaje = () => {
    setViajeSeleccionado(null);
  };

  const handleSumarse = (trayecto) => {
    setViajeAConfirmar(trayecto);
  };

  const cerrarConfirmacion = () => {
    setViajeAConfirmar(null);
  };

  const confirmarSumarse = () => {
    if (viajeAConfirmar) {
      onSumarseViaje?.(viajeAConfirmar);
    }
    setViajeAConfirmar(null);
  };

  const handleVerPerfil = () => {
    if (viajeSeleccionado) {
      onVerPerfilConductor?.(viajeSeleccionado);
    }
  };

  return (
    <FormContainer>
      <h2 className="seccion-titulo">Viajes Disponibles</h2>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <form onSubmit={handleSubmit} className="form-buscar">
          <div className="buscador-colapsable">
            <div
              className={`buscador-resumen${
                buscadorExpandido ? " buscador-resumen--abierto" : ""
              }`}
            >
              <FaSearch className="buscador-resumen__icono" aria-hidden="true" />
              <AutocompleteInput
                placeholder={
                  modoViaje === "hacia"
                    ? "Ingrese dirección de origen"
                    : "Ingrese dirección de destino"
                }
                value={lugar?.formatted_address || ""}
                onPlaceSelected={(place) => setLugar(place)}
                containerClassName="buscador-resumen__input-group"
                inputClassName="buscador-resumen__input"
                inputProps={{ onFocus: () => setBuscadorExpandido(true) }}
              />
              <button
                type="button"
                className="buscador-toggle"
                onClick={toggleBuscador}
                aria-expanded={buscadorExpandido}
                aria-controls={buscadorContentId}
                aria-label="Mostrar opciones del buscador"
              >
                <FaChevronDown
                  className={`buscador-icon${
                    buscadorExpandido ? " buscador-icon--abierto" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {buscadorExpandido && (
              <div id={buscadorContentId} className="buscador-contenido">
                <div className="input-group" style={{ marginTop: 8 }}>
                  <div className="radio-viaje">
                    <label>
                      <input
                        type="radio"
                        value="desde"
                        checked={modoViaje === "desde"}
                        onChange={() => setModoViaje("desde")}
                      />
                      Viajo desde {nombreBarrio}
                    </label>

                    <label>
                      <input
                        type="radio"
                        value="hacia"
                        checked={modoViaje === "hacia"}
                        onChange={() => setModoViaje("hacia")}
                      />
                      Viajo hacia {nombreBarrio}
                    </label>
                  </div>
                </div>

                <Button type="submit" className="botonBuscar" onClick={setMostrarTrayectos}>
                  Buscar
                </Button>
              </div>
            )}
          </div>
        </form>
      </LoadScript>

      <section ref={resultadosRef} className="seccion-trayectos">
        {mostrarTrayectos && viajesDisponibles.length > 0 &&
          viajesDisponibles.map((viaje) => (
            <TarjetaViaje
              key={viaje.id}
              sigla={viaje.sigla}
              nombre={viaje.nombre}
              destino={viaje.destino}
              fecha={viaje.fecha}
              precio={viaje.precio}
              onSumarse={() => handleSumarse(viaje)}
              onVerMas={() => abrirModalViaje(viaje)}
            />
          ))}

        {mostrarTrayectos && viajesDisponibles.length === 0 && seRealizoBusqueda && (
          <p className="seccion-trayectos__mensaje-vacio">
            No encontramos viajes con los filtros seleccionados. Probá con otros criterios.
          </p>
        )}
      </section>

      <ModalViaje
        isOpen={Boolean(viajeSeleccionado)}
        viaje={viajeSeleccionado}
        onClose={cerrarModalViaje}
        onVerPerfil={handleVerPerfil}
      />

      <ModalConfirmacion
        isOpen={Boolean(viajeAConfirmar)}
        titulo="Confirmar solicitud"
        descripcion={
          viajeAConfirmar
            ? `¿Desea enviar una solicitud a ${
                viajeAConfirmar.nombre || "el conductor"
              } para sumarse al viaje?`
            : ""
        }
        confirmText="Enviar solicitud"
        cancelText="Cancelar"
        onConfirm={confirmarSumarse}
        onCancel={cerrarConfirmacion}
      />
    </FormContainer>
  );
}

export default Home;
