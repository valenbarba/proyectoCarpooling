import AvatarInteractivo from "./AvatarInteractivo";
import "./TarjetaViaje.css";

/*
 * Tarjeta reutilizable para listar viajes disponibles.
 * Recibe múltiples props opcionales para adaptarse a diferentes fuentes de datos
 * y expone callbacks para los botones de acción.
 */
function TarjetaViaje({
  sigla,
  nombre,
  apellido,
  avatar,
  destino,
  fecha,
  precio,
  onSumarse,
  onVerMas,
  titulo,
  detalle,
  onAgregar,
  onOpciones,
  onVerPerfil,
}) {
  const nombreMostrar = nombre || titulo || destino || "Conductor";
  const destinoMostrar = destino || titulo || nombre || "Punto de encuentro";
  const fechaMostrar = fecha || detalle || "";

  // Se permiten nombres alternativos para los handlers para facilitar la reutilización.
  const handleSumarse = onSumarse || onAgregar;
  const handleVerMas = onVerMas || onOpciones;
  const avatarLabel = `Ver perfil de ${nombreMostrar}`;

  return (
    <article className="tarjeta-viaje">
      <div className="tarjeta-viaje__contenido">
        <AvatarInteractivo
          nombre={nombreMostrar}
          apellido={apellido || sigla}
          avatar={avatar}
          onClick={onVerPerfil}
          ariaLabel={onVerPerfil ? avatarLabel : undefined}
          className="tarjeta-viaje__avatar"
        />
        <div className="tarjeta-viaje__texto">
          <span className="tarjeta-viaje__nombre">{nombreMostrar}</span>
          <div className="tarjeta-viaje__fila-principal">
            <span className="tarjeta-viaje__destino">{destinoMostrar}</span>

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
