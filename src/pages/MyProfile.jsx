import { useMemo, useState } from "react";
import "./MyProfile.css";

const obtenerIniciales = (nombre = "", apellido = "") => {
  const inicialNombre = nombre.trim()[0];
  const inicialApellido = apellido.trim()[0];

  return `${inicialNombre || ""}${inicialApellido || ""}`.toUpperCase() || "?";
};

const PERFIL_INICIAL = {
  nombre: "Valentina",
  apellido: "Rossi",
  avatar: "https://i.pravatar.cc/120?img=47",
  barrio: "Haras Santa María",
  lote: "1120",
  telefono: "+54 9 11 5566-7890",
  email: "valentina.rossi@email.com",
  bio: "Vecina del barrio que usa la bici plegable y le gusta compartir música en los viajes.",
  resenas: [
    {
      id: "res-valentina-1",
      autor: "Gonzalo H.",
      comentario: "Siempre avisa a tiempo si se retrasa y coordina muy bien los puntos de encuentro.",
    },
    {
      id: "res-valentina-2",
      autor: "Laura S.",
      comentario: "Muy buena compañera de viaje, respeta los horarios y la comunicación es clara.",
    },
  ],
};

function MyProfile() {
  const [perfilGuardado, setPerfilGuardado] = useState(PERFIL_INICIAL);
  const [borradorPerfil, setBorradorPerfil] = useState(PERFIL_INICIAL);
  const [modoEdicion, setModoEdicion] = useState(false);

  const perfilVisible = modoEdicion ? borradorPerfil : perfilGuardado;

  const nombreCompleto = useMemo(() => {
    const partes = [perfilVisible.nombre, perfilVisible.apellido].filter(Boolean);
    return partes.length > 0 ? partes.join(" ") : "Mi perfil";
  }, [perfilVisible]);

  const ubicacionTexto = useMemo(() => {
    const partes = [perfilVisible.barrio];
    if (perfilVisible.lote) {
      partes.push(`Lote ${perfilVisible.lote}`);
    }
    return partes.filter(Boolean).join(" · ") || "Ubicación no disponible";
  }, [perfilVisible]);

  const handleChange = (campo) => (event) => {
    setBorradorPerfil((prev) => ({ ...prev, [campo]: event.target.value }));
  };

  const habilitarEdicion = () => {
    setBorradorPerfil(perfilGuardado);
    setModoEdicion(true);
  };

  const cancelarEdicion = () => {
    setBorradorPerfil(perfilGuardado);
    setModoEdicion(false);
  };

  const guardarCambios = (event) => {
    event.preventDefault();
    setPerfilGuardado(borradorPerfil);
    setModoEdicion(false);
  };

  return (
    <div className="my-profile">
      <section className="my-profile__identidad" aria-labelledby="mi-perfil-nombre">
        {perfilVisible.avatar ? (
          <img
            className="my-profile__avatar"
            src={perfilVisible.avatar}
            alt={`Avatar de ${nombreCompleto}`}
          />
        ) : (
          <span className="my-profile__avatar my-profile__avatar--placeholder" aria-hidden="true">
            {obtenerIniciales(perfilVisible.nombre, perfilVisible.apellido)}
          </span>
        )}

        <div className="my-profile__datos">
          <p className="my-profile__identificador">Mi perfil</p>
          <h1 id="mi-perfil-nombre" className="my-profile__nombre">
            {nombreCompleto}
          </h1>
          <p className="my-profile__dato">{ubicacionTexto}</p>
          <p className="my-profile__dato">{perfilVisible.telefono || "Teléfono no informado"}</p>
          <p className="my-profile__dato">{perfilVisible.email || "Correo no informado"}</p>
        </div>

        {!modoEdicion ? (
          <button type="button" className="my-profile__accion" onClick={habilitarEdicion}>
            Editar perfil
          </button>
        ) : (
          <div className="my-profile__acciones-inline">
            <button type="button" className="my-profile__accion my-profile__accion--secundario" onClick={cancelarEdicion}>
              Cancelar
            </button>
            <button type="submit" form="form-mi-perfil" className="my-profile__accion">
              Guardar cambios
            </button>
          </div>
        )}
      </section>

      <section className="my-profile__formulario" aria-labelledby="mi-perfil-formulario">
        <h2 id="mi-perfil-formulario" className="my-profile__subtitulo">
          Información personal
        </h2>
        <p className="my-profile__descripcion">
          Esta información será visible para quienes compartan viaje con vos. Podés actualizarla en cualquier momento.
        </p>

        <form id="form-mi-perfil" className="my-profile__grid" onSubmit={guardarCambios}>
          <div className="my-profile__campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={borradorPerfil.nombre}
              onChange={handleChange("nombre")}
              disabled={!modoEdicion}
            />
          </div>
          <div className="my-profile__campo">
            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              type="text"
              value={borradorPerfil.apellido}
              onChange={handleChange("apellido")}
              disabled={!modoEdicion}
            />
          </div>
          <div className="my-profile__campo">
            <label htmlFor="barrio">Barrio</label>
            <input
              id="barrio"
              type="text"
              value={borradorPerfil.barrio}
              onChange={handleChange("barrio")}
              disabled={!modoEdicion}
            />
          </div>
          <div className="my-profile__campo">
            <label htmlFor="lote">Lote</label>
            <input
              id="lote"
              type="text"
              value={borradorPerfil.lote}
              onChange={handleChange("lote")}
              disabled={!modoEdicion}
            />
          </div>
          <div className="my-profile__campo">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="tel"
              value={borradorPerfil.telefono}
              onChange={handleChange("telefono")}
              disabled={!modoEdicion}
            />
          </div>
          <div className="my-profile__campo">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={borradorPerfil.email}
              onChange={handleChange("email")}
              disabled={!modoEdicion}
            />
          </div>
          <div className="my-profile__campo my-profile__campo--full">
            <label htmlFor="avatar">URL de foto de perfil</label>
            <input
              id="avatar"
              type="url"
              placeholder="https://"
              value={borradorPerfil.avatar}
              onChange={handleChange("avatar")}
              disabled={!modoEdicion}
            />
          </div>
          <div className="my-profile__campo my-profile__campo--full">
            <label htmlFor="bio">Sobre mí</label>
            <textarea
              id="bio"
              rows="3"
              value={borradorPerfil.bio || ""}
              onChange={handleChange("bio")}
              disabled={!modoEdicion}
            />
          </div>
        </form>
      </section>

      <section className="my-profile__resenas" aria-labelledby="mi-perfil-resenas">
        <h2 id="mi-perfil-resenas" className="my-profile__subtitulo">
          Lo que otros dicen de vos
        </h2>
        {perfilGuardado.resenas?.length ? (
          <ul className="my-profile__lista-resenas">
            {perfilGuardado.resenas.map((resena) => (
              <li key={resena.id} className="my-profile__resena-item">
                <p className="my-profile__resena-autor">{resena.autor || "Vecino"}</p>
                <p className="my-profile__resena-texto">{resena.comentario}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="my-profile__mensaje-vacio">Aún no tenés reseñas cargadas.</p>
        )}
      </section>
    </div>
  );
}

export default MyProfile;
