import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TarjetaMiViaje from "../components/TarjetaMiViaje";
import ModalPasajeros from "../components/ModalPasajeros";
import ModalPuntuacion from "../components/ModalPuntuacion";
import ModalConfirmacion from "../components/ModalConfirmacion";
import "./MisViajes.css";

const agruparPorEstado = (viajes) => {
  const ahora = new Date();
  const ordenados = [...viajes].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const pendientes = ordenados.filter((viaje) => new Date(viaje.fecha) >= ahora);
  const finalizados = ordenados
    .filter((viaje) => new Date(viaje.fecha) < ahora)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return { pendientes, finalizados };
};

function MisViajes({
  viajesPropios = [],
  viajesAjenos = [],
  pestaniaInicial = "propios",
  onEnviarPuntuacion,
  onCancelarSolicitud,
}) {
  const [pestaniaActiva, setPestaniaActiva] = useState(pestaniaInicial);
  const [viajesPropiosEstado, setViajesPropiosEstado] = useState(viajesPropios);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [modalPasajerosAbierto, setModalPasajerosAbierto] = useState(false);
  const [modalPuntuacion, setModalPuntuacion] = useState({
    abierto: false,
    tipo: null,
    viaje: null,
  });
  const [viajeACancelar, setViajeACancelar] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setViajesPropiosEstado(viajesPropios);
  }, [viajesPropios]);

  useEffect(() => {
    const locationState = location.state;

    if (locationState?.viajeId && locationState?.reabrirModal) {
      const viaje = viajesPropiosEstado.find(
        (item) => item.id === locationState.viajeId
      );

      if (viaje) {
        setPestaniaActiva("propios");
        setViajeSeleccionado(viaje);
        setModalPasajerosAbierto(true);
      }

      const { viajeId: _viajeId, reabrirModal: _reabrirModal, ...restoEstado } =
        locationState;

      navigate(location.pathname, {
        replace: true,
        state: Object.keys(restoEstado).length > 0 ? restoEstado : undefined,
      });
    }
  }, [location, navigate, viajesPropiosEstado]);

  const viajeSeleccionadoId = viajeSeleccionado?.id || null;

  const handleVerPasajeros = (viajeId) => {
    const viaje = viajesPropiosEstado.find((item) => item.id === viajeId);
    if (viaje) {
      setViajeSeleccionado(viaje);
      setModalPasajerosAbierto(true);
    }
  };

  const handleCerrarModalPasajeros = () => {
    setModalPasajerosAbierto(false);
    setViajeSeleccionado(null);
  };

  const handleAbrirModalPuntuacion = (viaje, tipo) => {
    setModalPuntuacion({ abierto: true, tipo, viaje });
  };

  const handleCerrarModalPuntuacion = () => {
    setModalPuntuacion({ abierto: false, tipo: null, viaje: null });
  };

  const handleConfirmarPuntuacion = (datos) => {
    if (typeof onEnviarPuntuacion === "function") {
      onEnviarPuntuacion(datos);
    }

    handleCerrarModalPuntuacion();
  };

  const handleAbrirModalCancelacion = (viaje) => {
    setViajeACancelar(viaje);
  };

  const handleCerrarModalCancelacion = () => {
    setViajeACancelar(null);
  };

  const handleConfirmarCancelacion = () => {
    if (viajeACancelar && typeof onCancelarSolicitud === "function") {
      onCancelarSolicitud(viajeACancelar);
    }

    setViajeACancelar(null);
  };

  const actualizarEstadoPasajero = (pasajeroId, nuevoEstado) => {
    if (!viajeSeleccionadoId) return;

    setViajesPropiosEstado((viajesPrevios) =>
      viajesPrevios.map((viaje) => {
        if (viaje.id !== viajeSeleccionadoId) return viaje;
        const pasajerosActualizados = (viaje.pasajeros || []).map((pasajero) =>
          pasajero.id === pasajeroId
            ? { ...pasajero, estado: nuevoEstado }
            : pasajero
        );

        return { ...viaje, pasajeros: pasajerosActualizados };
      })
    );

    setViajeSeleccionado((viajePrevio) => {
      if (!viajePrevio || viajePrevio.id !== viajeSeleccionadoId) return viajePrevio;
      const pasajerosActualizados = (viajePrevio.pasajeros || []).map((pasajero) =>
        pasajero.id === pasajeroId
          ? { ...pasajero, estado: nuevoEstado }
          : pasajero
      );

      return { ...viajePrevio, pasajeros: pasajerosActualizados };
    });
  };

  const handleAceptarPasajero = (pasajeroId) => {
    actualizarEstadoPasajero(pasajeroId, "aceptado");
  };

  const handleRechazarPasajero = (pasajeroId) => {
    actualizarEstadoPasajero(pasajeroId, "rechazado");
  };

  // Agrupamos los viajes recibidos según si son próximos o ya finalizaron.
  const datosPropios = useMemo(
    () => agruparPorEstado(viajesPropiosEstado),
    [viajesPropiosEstado]
  );
  const datosAjenos = useMemo(() => agruparPorEstado(viajesAjenos), [viajesAjenos]);

  const datosActivos = pestaniaActiva === "propios" ? datosPropios : datosAjenos;
  const tipoActual = pestaniaActiva === "propios" ? "propio" : "ajeno";

  return (
    <main className="mis-viajes">

      <div className="mis-viajes__tabs" role="tablist" aria-label="Mis viajes">
        <button
          type="button"
          role="tab"
          aria-selected={pestaniaActiva === "propios"}
          className={`mis-viajes__tab${
            pestaniaActiva === "propios" ? " mis-viajes__tab--activa" : ""
          }`}
          onClick={() => setPestaniaActiva("propios")}
        >
          Propios
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={pestaniaActiva === "ajenos"}
          className={`mis-viajes__tab${
            pestaniaActiva === "ajenos" ? " mis-viajes__tab--activa" : ""
          }`}
          onClick={() => setPestaniaActiva("ajenos")}
        >
          Ajenos
        </button>
      </div>

      <section
        className="mis-viajes__panel"
        role="tabpanel"
        aria-label={pestaniaActiva === "propios" ? "Viajes propios" : "Viajes ajenos"}
      >
        <div className="mis-viajes__grupo">
          <h3 className="mis-viajes__subtitulo">Pendientes</h3>
          <div className="mis-viajes__lista">
            {datosActivos.pendientes.length > 0 ? (
              datosActivos.pendientes.map((viaje) => (
                <TarjetaMiViaje
                  key={viaje.id}
                  viaje={viaje}
                  tipo={tipoActual}
                  estado="pendiente"
                  onVerPasajeros={
                    tipoActual === "propio"
                      ? () => handleVerPasajeros(viaje.id)
                      : undefined
                  }
                  onCancelar={() => handleAbrirModalCancelacion(viaje)}
                />
              ))
            ) : (
              <p className="mis-viajes__estado-vacio">
                No tenés viajes pendientes en esta sección.
              </p>
            )}
          </div>
        </div>

        <div className="mis-viajes__grupo">
          <h3 className="mis-viajes__subtitulo">Finalizados</h3>
          <div className="mis-viajes__lista">
            {datosActivos.finalizados.length > 0 ? (
              datosActivos.finalizados.map((viaje) => (
                <TarjetaMiViaje
                  key={viaje.id}
                  viaje={viaje}
                  tipo={tipoActual}
                  estado="finalizado"
                  onVerPasajeros={
                    tipoActual === "propio"
                      ? () => handleVerPasajeros(viaje.id)
                      : undefined
                  }
                  onPuntuar={handleAbrirModalPuntuacion}
                />
              ))
            ) : (
              <p className="mis-viajes__estado-vacio">
                Todavía no finalizaste viajes en esta sección.
              </p>
            )}
          </div>
        </div>
      </section>
      {viajeSeleccionado && (
        <ModalPasajeros
          abierto={modalPasajerosAbierto}
          onCerrar={handleCerrarModalPasajeros}
          pasajeros={viajeSeleccionado.pasajeros}
          destino={viajeSeleccionado.destino}
          fecha={viajeSeleccionado.fecha}
          onAceptarPasajero={handleAceptarPasajero}
          onRechazarPasajero={handleRechazarPasajero}
          viajeId={viajeSeleccionado.id}
        />
      )}
      <ModalPuntuacion
        abierto={modalPuntuacion.abierto}
        tipo={modalPuntuacion.tipo}
        viaje={modalPuntuacion.viaje}
        onCerrar={handleCerrarModalPuntuacion}
        onConfirmar={handleConfirmarPuntuacion}
      />
      <ModalConfirmacion
        isOpen={Boolean(viajeACancelar)}
        titulo="Cancelar solicitud"
        descripcion="¿Estás seguro de que deseas cancelar la solicitud del viaje?"
        confirmText="Sí, cancelar"
        cancelText="No, volver"
        onConfirm={handleConfirmarCancelacion}
        onCancel={handleCerrarModalCancelacion}
      />
    </main>
  );
}

export default MisViajes;
