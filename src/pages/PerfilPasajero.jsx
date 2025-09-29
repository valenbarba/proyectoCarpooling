import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./PerfilPasajero.css";

const obtenerIniciales = (nombre = "", apellido = "") => {
  const inicialNombre = nombre.trim()[0];
  const inicialApellido = apellido.trim()[0];

  return `${inicialNombre || ""}${inicialApellido || ""}`.toUpperCase() || "?";
};

function PerfilPasajero() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const state = location.state || {};
  const pasajero = state.pasajero || {};

  const nombreCompleto = useMemo(() => {
    const partes = [pasajero.nombre, pasajero.apellido].filter(Boolean);
    return partes.length > 0 ? partes.join(" ") : "Pasajero sin nombre";
  }, [pasajero]);

  const ubicacionTexto = useMemo(() => {
    const partes = [pasajero.barrio];
    if (pasajero.lote) {
      partes.push(`Lote ${pasajero.lote}`);
    }
    return partes.filter(Boolean).join(" · ") || "Ubicación no disponible";
  }, [pasajero]);

  const telefonoTexto = pasajero.telefono || "Teléfono no informado";
  const resenas = pasajero.resenas || [];

  const handleVolver = () => {
    if (state?.from?.pathname) {
      navigate(state.from.pathname, { state: state.from.state });
    } else {
      navigate(-1);
    }
  };

  const mostrarDatos = Boolean(pasajero && Object.keys(pasajero).length > 0);

  return (
    <div className="perfil-pasajero">
      <header className="perfil-pasajero__encabezado">
        <button type="button" className="perfil-pasajero__boton-volver" onClick={handleVolver}>
          Volver
        </button>
      </header>

      {mostrarDatos ? (
        <>
          <section className="perfil-pasajero__identidad" aria-labelledby="perfil-pasajero-nombre">
            {pasajero.avatar ? (
              <img
                className="perfil-pasajero__avatar"
                src={pasajero.avatar}
                alt={`Avatar de ${nombreCompleto}`}
              />
            ) : (
              <span className="perfil-pasajero__avatar perfil-pasajero__avatar--placeholder" aria-hidden="true">
                {obtenerIniciales(pasajero.nombre, pasajero.apellido)}
              </span>
            )}
            <h1 id="perfil-pasajero-nombre" className="perfil-pasajero__nombre">
              {nombreCompleto}
            </h1>
            <p className="perfil-pasajero__dato">{ubicacionTexto}</p>
            <p className="perfil-pasajero__dato">{telefonoTexto}</p>
          </section>

          <section className="perfil-pasajero__resenas" aria-labelledby="perfil-pasajero-resenas">
            <h2 id="perfil-pasajero-resenas" className="perfil-pasajero__subtitulo">
              Reseñas
            </h2>
            {resenas.length > 0 ? (
              <ul className="perfil-pasajero__lista-resenas">
                {resenas.map((resena) => (
                  <li key={resena.id} className="perfil-pasajero__resena-item">
                    <p className="perfil-pasajero__resena-autor">{resena.autor || "Vecino"}</p>
                    <p className="perfil-pasajero__resena-texto">{resena.comentario}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="perfil-pasajero__mensaje-vacio">
                Aún no hay reseñas cargadas para este pasajero.
              </p>
            )}
          </section>
        </>
      ) : (
        <section className="perfil-pasajero__mensaje-error">
          <h1 className="perfil-pasajero__subtitulo">No se encontró la información del pasajero</h1>
          <p>Intentá volver atrás y seleccionar nuevamente desde la lista de pasajeros.</p>
        </section>
      )}
    </div>
  );
}

export default PerfilPasajero;
