import React, { useState } from "react";
import HeaderInicio from "../components/HeaderInicio";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import DropdownMenu from "../components/DropdownMenu";
import "./MainLayout.css";

/*
 * Layout principal que comparte encabezado y navegación inferior entre varias páginas.
 * Se oculta automáticamente en pantallas públicas como login y registro.
 */
const MainLayout = () => {
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);

  // Diccionario que asocia cada ruta con el título que debe mostrarse en el header.
  const titulosPorRuta = {
    "/home": "Carpooling HSM",
    "/mis-viajes": "Mis viajes",
    "/publicar": "Publicar Viaje",
    "/notificaciones": "Notificaciones",
  };

  const tituloHeader = location.pathname.startsWith("/perfil-pasajero")
    ? "Perfil del pasajero"
    : titulosPorRuta[location.pathname] || "";

  const abrirMenuLateral = () => {
    setMenuVisible((prev) => !prev);
  };

  // Determina si corresponde mostrar el layout completo o una pantalla pública.
  const mostrarLayout =
    location.pathname !== "/login" && location.pathname !== "/registro";

  return (
    <div className="main-layout">
      {mostrarLayout && (
        <div className="layout-header-wrapper">
          <HeaderInicio titulo={tituloHeader} onAvatarClick={abrirMenuLateral} />

          {menuVisible && <DropdownMenu onClose={() => setMenuVisible(false)} />}
        </div>
      )}

      <main className="main-content">
        <Outlet />
      </main>

      {mostrarLayout && <BottomNav />}
    </div>
  );
};

export default MainLayout;
