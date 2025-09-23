import { NavLink } from "react-router-dom";
import { FaHome, FaCar, FaPlus } from "react-icons/fa";
import "./BottomNav.css";

/*
 * Barra de navegación inferior que resume los accesos más frecuentes de la app.
 * NavLink aplica automáticamente clases activas según la ruta actual.
 */
function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" className="nav-item">
        <FaHome aria-hidden="true" />
        <span>Explorar</span>
      </NavLink>
      <NavLink to="/publicar" className="nav-item">
        <FaPlus aria-hidden="true" />
        <span>Publicar</span>
      </NavLink>
      <NavLink to="/mis-viajes" className="nav-item">
        <FaCar aria-hidden="true" />
        <span>Mis viajes</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
