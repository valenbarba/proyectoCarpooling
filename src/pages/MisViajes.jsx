import { useMemo, useState } from "react";
import TarjetaMiViaje from "../components/TarjetaMiViaje";
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

function MisViajes({ viajesPropios = [], viajesAjenos = [], pestaniaInicial = "propios" }) {
  const [pestaniaActiva, setPestaniaActiva] = useState(pestaniaInicial);

  // Agrupamos los viajes recibidos según si son próximos o ya finalizaron.
  const datosPropios = useMemo(
    () => agruparPorEstado(viajesPropios),
    [viajesPropios]
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
    </main>
  );
}

export default MisViajes;