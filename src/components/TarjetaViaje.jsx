// src/components/TarjetaViaje.jsx
import "./TarjetaViaje.css";

function TarjetaViaje({
  sigla,
  nombre,
  destino,
  fecha,
  precio,
  onSumarse,
  onVerMas,
  titulo,
  detalle,
  onAgregar,
  onOpciones,
}) {
  const inicial = (sigla || nombre?.[0] || titulo?.[0] || destino?.[0] || "?").toUpperCase();
  const nombreMostrar = nombre || titulo || destino || "Conductor";
  const destinoMostrar = destino || titulo || nombre || "Punto de encuentro";
  const fechaMostrar = fecha || detalle || "";
  const precioMostrar = precio || "Consultar";
  const handleSumarse = onSumarse || onAgregar;
  const handleVerMas = onVerMas || onOpciones;

  return (
    <article className="tarjeta-viaje">
      <div className="tarjeta-viaje__contenido">
        <div className="tarjeta-viaje__avatar" aria-hidden="true">
          {inicial}
        </div>
        <div className="tarjeta-viaje__texto">
          <span className="tarjeta-viaje__nombre">{nombreMostrar}</span>
          <div className="tarjeta-viaje__fila-principal">
            <span className="tarjeta-viaje__destino">{destinoMostrar}</span>
            <span className="tarjeta-viaje__precio">{precioMostrar}</span>
          </div>
          {fechaMostrar && <span className="tarjeta-viaje__fecha">{fechaMostrar}</span>}
        </div>
      </div>

      <div className="tarjeta-viaje__acciones">
        
        <button
          type="button"
          className="tarjeta-viaje__btn tarjeta-viaje__btn--secundario"
          onClick={() => handleVerMas?.()}
        >
          Ver más
        </button>

        <button
          type="button"
          className="tarjeta-viaje__btn tarjeta-viaje__btn--primario"
          onClick={() => handleSumarse?.()}
        >
          Sumarse
        </button>
      </div>
    </article>
  );
}

export default TarjetaViaje;
