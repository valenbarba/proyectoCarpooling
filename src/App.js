import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Publicar from "./pages/Publicar";
import NotificationPage from "./pages/NotificationPage";
import MisViajes from "./pages/MisViajes";

// Componente interno que contiene la definición de todas las rutas de la aplicación.
// Se separa para mantener App más legible y favorecer las pruebas unitarias si se agregaran.
function AppRoutes() {
  return (
    <Routes>
      {/* Pantalla de inicio de sesión */}
      <Route path="/login" element={<Login />} />

      {/* Redirección por defecto cuando la ruta base no coincide con ninguna pantalla */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Ruta para el formulario de registro */}
      <Route path="/registro" element={<SignUp />} />

      {/* Rutas protegidas por el layout principal, que comparte encabezado y navegación inferior */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/mis-viajes" element={<MisViajes />} />
        <Route path="/notificaciones" element={<NotificationPage />} />
        {/* Agregar nuevas rutas públicas dentro de este layout según sea necesario */}
      </Route>
    </Routes>
  );
}

// Punto de entrada principal del front-end. Envuelve las rutas con el BrowserRouter
// para habilitar la navegación mediante la API de historial del navegador.
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
