// src/components/TarjetaViaje.jsx
import "./TarjetaViaje.css";

function TarjetaViaje({ sigla, titulo, detalle, onAgregar, onOpciones }) {
  return (
    <div className="tarjeta-trayecto">
      <div className="trayecto-izq">
        <div className="avatar-trayecto">{sigla}</div>
        <div className="trayecto-textos">
          <div className="trayecto-titulo">{titulo}</div>
          <div className="trayecto-detalle">{detalle}</div>
        </div>
      </div>

      <div className="trayecto-acciones">
        <button
          type="button"
          className="icono-btn"
          aria-label="Más opciones"
          onClick={onOpciones}
        >
          ⋮
        </button>
        <button
          type="button"
          className="icono-btn icono-primario"
          aria-label="Agregar trayecto"
          onClick={onAgregar}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default TarjetaViaje;
