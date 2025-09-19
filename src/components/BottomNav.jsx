import { NavLink } from "react-router-dom";
import { FaHome, FaCar, FaPlus } from "react-icons/fa";
import "./BottomNav.css"; // o usá Tailwind si preferís

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" className="nav-item">
        <FaHome />
        <span>Explorar</span>
      </NavLink>
      <NavLink to="/publicar" className="nav-item">
        <FaPlus />
        <span>Publicar</span>
      </NavLink>
      <NavLink to="/mis-viajes" className="nav-item">
        <FaCar />
        <span>Mis viajes</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
