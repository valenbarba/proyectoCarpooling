import { useMemo, useState } from "react";
import "./MisViajes.css";

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

const agruparPorEstado = (viajes) => {
  const ahora = new Date();
  const ordenados = [...viajes].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  const pendientes = ordenados.filter((viaje) => new Date(viaje.fecha) >= ahora);
  const finalizados = ordenados
    .filter((viaje) => new Date(viaje.fecha) < ahora)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return { pendientes, finalizados };
};

const ViajeCard = ({ viaje, tipo, estado }) => {
  const esPropio = tipo === "propio";
  const avatarTexto = esPropio
    ? viaje.destino?.[0] || viaje.puntoEncuentro?.[0] || "?"
    : obtenerIniciales(viaje.conductor);

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
            <span className="viaje-card__valor">{viaje.conductor}</span>
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
};

function MisViajes() {
  const [pestaniaActiva, setPestaniaActiva] = useState("propios");

  const viajesPropios = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const crearFecha = (diasDesdeHoy, horas, minutos) => {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + diasDesdeHoy);
      fecha.setHours(horas, minutos, 0, 0);
      return fecha.toISOString();
    };

    return [
      {
        id: "prop-1",
        destino: "USAL Pilar",
        fecha: crearFecha(2, 8, 15),
        puntoEncuentro: "Garita Norte - Lote 1260",
        pasajerosConfirmados: 2,
        capacidadTotal: 3,
        notas: "Salgo puntual, llevar cambio si necesitan pagar en efectivo.",
      },
      {
        id: "prop-2",
        destino: "Centro de Escobar",
        fecha: crearFecha(-4, 17, 30),
        puntoEncuentro: "Club House - Estacionamiento",
        pasajerosConfirmados: 3,
        capacidadTotal: 4,
        notas: "Gracias por avisar si se retrasan. Tengo lugar para equipaje chico.",
      },
      {
        id: "prop-3",
        destino: "Universidad Di Tella",
        fecha: crearFecha(6, 6, 45),
        puntoEncuentro: "Entrada principal - Portón Sur",
        pasajerosConfirmados: 1,
        capacidadTotal: 3,
        notas: "Puedo desviar hasta la colectora si alguien lo necesita.",
      },
    ];
  }, []);

  const viajesAjenos = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const crearFecha = (diasDesdeHoy, horas, minutos) => {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + diasDesdeHoy);
      fecha.setHours(horas, minutos, 0, 0);
      return fecha.toISOString();
    };

    return [
      {
        id: "aj-1",
        destino: "CABA - Obelisco",
        fecha: crearFecha(1, 7, 0),
        puntoEncuentro: "Rotonda Principal",
        conductor: "Martín Fernández",
        asientoReservado: "Asiento 2 de 3",
        notas: "El viaje incluye peaje, llevar SUBE si quieren combinar.",
      },
      {
        id: "aj-2",
        destino: "Pilar Centro",
        fecha: crearFecha(-2, 19, 10),
        puntoEncuentro: "Garita Sur",
        conductor: "Valentina Ruiz",
        asientoReservado: "Asiento 1 de 4",
        notas: "Gran viaje, conducción muy segura.",
      },
      {
        id: "aj-3",
        destino: "Colegio St. John",
        fecha: crearFecha(4, 7, 30),
        puntoEncuentro: "Playón Deportivo",
        conductor: "Ignacio Paredes",
        asientoReservado: "Asiento 3 de 3",
        notas: "Sale música tranquila durante el viaje.",
      },
    ];
  }, []);

  const datosPropios = useMemo(
    () => agruparPorEstado(viajesPropios),
    [viajesPropios]
  );
  const datosAjenos = useMemo(() => agruparPorEstado(viajesAjenos), [viajesAjenos]);

  const datosActivos = pestaniaActiva === "propios" ? datosPropios : datosAjenos;
  const tipoActual = pestaniaActiva === "propios" ? "propio" : "ajeno";

  return (
    <main className="mis-viajes">
      <header className="mis-viajes__encabezado">
        <h1 className="mis-viajes__titulo">Mis viajes</h1>
        <p className="mis-viajes__descripcion">
          Consultá rápidamente tus trayectos publicados y los que reservaste, separados
          por estado para que encuentres lo que necesitás en segundos.
        </p>
      </header>

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
                <ViajeCard
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
                <ViajeCard
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
