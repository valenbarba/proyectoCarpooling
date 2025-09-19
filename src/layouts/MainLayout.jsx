import React, { useState } from "react";
import HeaderInicio from "../components/HeaderInicio";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import DropdownMenu from "../components/DropdownMenu";
import "./MainLayout.css"

const MainLayout = () => {

  //hook para ubicacion actual
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);

  //diccionario que asocia rutas a titulos
  const titulosPorRuta = {
    "/home": "Inicio",
    "/mis-viajes": "Mis viajes",
    "/publicar": "Publicar Viaje",
    "/notificaciones": "Notificaciones"
    // podés seguir agregando rutas acá
  };

  //busca titulo en el diccionario segun la ruta
  //si no existe, no pone nada
  const tituloHeader = titulosPorRuta[location.pathname] || "";

  //funcion llamada al abrir menu lateral alternando entre abierto y cerrado
  const abrirMenuLateral = () => {
    setMenuVisible((prev) => !prev);
  };


  //determina si hay que mostrar o no este layout segun la ruta
  const mostrarLayout =
    location.pathname !== "/login" && location.pathname !== "/registro";

  return (
    <div className="main-layout">
      {mostrarLayout && (
        <div className="layout-header-wrapper">
          <HeaderInicio
            titulo={tituloHeader}
            onAvatarClick={abrirMenuLateral}
          />

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
