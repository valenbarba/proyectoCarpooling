import PropTypes from "prop-types";
import "./AvatarInteractivo.css";

export const obtenerIniciales = (nombre = "", apellido = "") => {
  const inicialNombre = nombre?.trim?.()[0] || "";
  const inicialApellido = apellido?.trim?.()[0] || "";

  const iniciales = `${inicialNombre}${inicialApellido}`.toUpperCase();

  return iniciales || "?";
};

function AvatarInteractivo({
  nombre,
  apellido,
  avatar,
  onClick,
  ariaLabel,
  size = "md",
  className = "",
  alt,
}) {
  const iniciales = obtenerIniciales(nombre, apellido);
  const clases = [
    "avatar-interactivo",
    `avatar-interactivo--${size}`,
    onClick ? "avatar-interactivo--clickable" : "avatar-interactivo--static",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textoAlternativo =
    alt ||
    (ariaLabel
      ? ariaLabel
      : nombre
      ? `Ver perfil de ${nombre}${apellido ? ` ${apellido}` : ""}`
      : undefined);

  return (
    <button
      type="button"
      className={clases}
      onClick={onClick}
      aria-label={textoAlternativo}
      disabled={!onClick}
    >
      {avatar ? (
        <img
          src={avatar}
          className="avatar-interactivo__imagen"
          alt={textoAlternativo || "Avatar"}
          loading="lazy"
        />
      ) : (
        <span className="avatar-interactivo__placeholder">{iniciales}</span>
      )}
    </button>
  );
}

AvatarInteractivo.propTypes = {
  nombre: PropTypes.string,
  apellido: PropTypes.string,
  avatar: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default AvatarInteractivo;
