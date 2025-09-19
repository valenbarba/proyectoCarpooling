import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
//import Notifications from "./pages/Notifications"
import MainLayout from './layouts/MainLayout';
import Publicar from "./pages/Publicar"
import NotificationPage from "./pages/NotificationPage"
import MisViajes from './pages/MisViajes';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Redirección por defecto si no coincide ninguna ruta */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/registro" element={<SignUp />} />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/mis-viajes" element={<MisViajes />} />
        <Route path="/notificaciones" element={<NotificationPage />} />
        {/* Agregá más rutas aquí */}
      </Route>

    </Routes>
  );
}

function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
