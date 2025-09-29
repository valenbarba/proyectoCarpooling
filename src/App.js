import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FiBell, FiCalendar, FiCheckCircle, FiUsers } from "react-icons/fi";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Publicar from "./pages/Publicar";
import NotificationPage from "./pages/NotificationPage";
import MisViajes from "./pages/MisViajes";
import PerfilPasajero from "./pages/PerfilPasajero";

// ==== Datos de demostración ====
// Se definen fuera de los componentes para que puedan reemplazarse fácilmente
// por los datos reales provenientes de la API cuando esté disponible.
const crearFechaRelativa = (diasDesdeHoy, horas, minutos) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha = new Date(hoy);
  fecha.setDate(hoy.getDate() + diasDesdeHoy);
  fecha.setHours(horas, minutos, 0, 0);
  return fecha.toISOString();
};

const DATOS_DEMOSTRACION = {
  barrio: {
    nombre: "Haras Santa María",
  },
  viajesDisponibles: [
    {
      id: 1,
      nombre: "Martín",
      sigla: "M",
      destino: "Plaza Italia",
      fecha: "25 de Octubre · 14:00",
      precio: "$2000 / asiento",
      comentario: "Punto de encuentro en la entrada principal del barrio.",
      rating: 4.8,
      reviewsCount: 26,
    },
    {
      id: 2,
      nombre: "Ana",
      sigla: "A",
      destino: "USAL Pilar",
      fecha: "7 de Octubre · 08:00",
      precio: "$1800 / asiento",
      comentario: "Nos encontramos en el lote 1260 a las 8:15 en punto.",
      rating: 4.6,
      reviewsCount: 18,
    },
    {
      id: 3,
      nombre: "Valentina",
      sigla: "V",
      destino: "Escobar centro",
      fecha: "10 de Octubre · 16:00",
      precio: "$1500 / asiento",
      comentario: "Puedo pasar por la garita norte si les queda cómodo.",
      rating: 5,
      reviewsCount: 32,
    },
  ],
  viajesPropios: [
    {
      id: "prop-1",
      destino: "USAL Pilar",
      fecha: crearFechaRelativa(2, 8, 15),
      puntoEncuentro: "Garita Norte - Lote 1260",
      direccion: "Av. Haras Santa María 1260",
      pasajerosConfirmados: 2,
      capacidadTotal: 3,
      notas: "Salgo puntual, llevar cambio si necesitan pagar en efectivo.",
      pasajeros: [
        {
          id: "prop-1-p1",
          nombre: "Sofía",
          apellido: "Giménez",
          avatar: "https://i.pravatar.cc/120?img=32",
          estado: "aceptado",
          barrio: "Haras Santa María",
          lote: "1342",
          telefono: "+54 9 11 4567-1234",
          resenas: [
            {
              id: "prop-1-p1-r1",
              autor: "Martín F.",
              comentario: "Muy puntual y respetuosa durante los viajes.",
            },
            {
              id: "prop-1-p1-r2",
              autor: "Laura P.",
              comentario: "Siempre avisa con tiempo si surge algún cambio.",
            },
          ],
        },
        {
          id: "prop-1-p2",
          nombre: "Martín",
          apellido: "Bustos",
          avatar: "https://i.pravatar.cc/120?img=12",
          estado: "pendiente",
          barrio: "Haras Santa María",
          lote: "1180",
          telefono: "+54 9 11 4789-6654",
          resenas: [
            {
              id: "prop-1-p2-r1",
              autor: "Gonzalo H.",
              comentario: "Buena comunicación y siempre llega con casco para la bici plegable.",
            },
            {
              id: "prop-1-p2-r2",
              autor: "Sofía G.",
              comentario: "Compartimos viaje a diario, muy amable.",
            },
          ],
        },
        {
          id: "prop-1-p3",
          nombre: "Carla",
          apellido: "Nuñez",
          estado: "pendiente",
          barrio: "Haras Santa María",
          lote: "1275",
          telefono: "+54 9 11 5123-9087",
          resenas: [
            {
              id: "prop-1-p3-r1",
              autor: "Valentina R.",
              comentario: "Siempre lleva mate y lo comparte con el grupo.",
            },
          ],
        },
      ],
    },
    {
      id: "prop-2",
      destino: "Centro de Escobar",
      fecha: crearFechaRelativa(-4, 17, 30),
      puntoEncuentro: "Club House - Estacionamiento",
      direccion: "Club House - Camino Central 450",
      pasajerosConfirmados: 3,
      capacidadTotal: 4,
      notas: "Gracias por avisar si se retrasan. Tengo lugar para equipaje chico.",
      pasajeros: [
        {
          id: "prop-2-p1",
          nombre: "Laura",
          apellido: "Sosa",
          avatar: "https://i.pravatar.cc/120?img=5",
          estado: "aceptado",
          barrio: "Haras Santa María",
          lote: "890",
          telefono: "+54 9 11 4455-2266",
          resenas: [
            {
              id: "prop-2-p1-r1",
              autor: "Ignacio P.",
              comentario: "Excelente compañera de viaje, muy organizada.",
            },
            {
              id: "prop-2-p1-r2",
              autor: "Carla N.",
              comentario: "Siempre trae snacks para compartir.",
            },
          ],
        },
        {
          id: "prop-2-p2",
          nombre: "Gonzalo",
          apellido: "Herrera",
          avatar: "https://i.pravatar.cc/120?img=39",
          estado: "aceptado",
          barrio: "Haras Santa María",
          lote: "965",
          telefono: "+54 9 11 4785-3344",
          resenas: [
            {
              id: "prop-2-p2-r1",
              autor: "Martín B.",
              comentario: "Siempre ayuda con el equipaje pesado.",
            },
          ],
        },
        {
          id: "prop-2-p3",
          nombre: "Elena",
          apellido: "Martínez",
          avatar: "https://i.pravatar.cc/120?img=16",
          estado: "pendiente",
          barrio: "Haras Santa María",
          lote: "1042",
          telefono: "+54 9 11 4332-9090",
          resenas: [
            {
              id: "prop-2-p3-r1",
              autor: "Valentina R.",
              comentario: "Muy amable, suele compartir playlists.",
            },
          ],
        },
      ],
    },
    {
      id: "prop-3",
      destino: "Universidad Di Tella",
      fecha: crearFechaRelativa(6, 6, 45),
      puntoEncuentro: "Entrada principal - Portón Sur",
      direccion: "Portón Sur - Haras Santa María",
      pasajerosConfirmados: 1,
      capacidadTotal: 3,
      notas: "Puedo desviar hasta la colectora si alguien lo necesita.",
      pasajeros: [
        {
          id: "prop-3-p1",
          nombre: "Diego",
          apellido: "Rossi",
          avatar: "https://i.pravatar.cc/120?img=27",
          estado: "aceptado",
          barrio: "Haras Santa María",
          lote: "765",
          telefono: "+54 9 11 4556-7788",
          resenas: [
            {
              id: "prop-3-p1-r1",
              autor: "Laura S.",
              comentario: "Siempre ofrece ayuda para coordinar la logística.",
            },
          ],
        },
        {
          id: "prop-3-p2",
          nombre: "Lucía",
          apellido: "Quintana",
          avatar: "https://i.pravatar.cc/120?img=48",
          estado: "pendiente",
          barrio: "Haras Santa María",
          lote: "810",
          telefono: "+54 9 11 4677-2211",
          resenas: [
            {
              id: "prop-3-p2-r1",
              autor: "Diego R.",
              comentario: "Gran compañía, le encanta conversar de música.",
            },
          ],
        },
      ],
    },
  ],
  viajesAjenos: [
    {
      id: "aj-1",
      destino: "CABA - Obelisco",
      fecha: crearFechaRelativa(1, 7, 0),
      puntoEncuentro: "Rotonda Principal",
      direccion: "Rotonda Principal - Km 44 Panamericana",
      conductor: "Martín Fernández",
      asientoReservado: "Asiento 2 de 3",
      notas: "El viaje incluye peaje, llevar SUBE si quieren combinar.",
      estadoSolicitud: "pendiente",
    },
    {
      id: "aj-2",
      destino: "Pilar Centro",
      fecha: crearFechaRelativa(-2, 19, 10),
      puntoEncuentro: "Garita Sur",
      direccion: "Garita Sur - Camino de las Lomas",
      conductor: "Valentina Ruiz",
      asientoReservado: "Asiento 1 de 4",
      notas: "Gran viaje, conducción muy segura.",
      estadoSolicitud: "confirmada",
    },
    {
      id: "aj-3",
      destino: "Colegio St. John",
      fecha: crearFechaRelativa(4, 7, 30),
      puntoEncuentro: "Playón Deportivo",
      direccion: "Playón Deportivo - Calle Los Aromos",
      conductor: "Ignacio Paredes",
      asientoReservado: "Asiento 3 de 3",
      notas: "Sale música tranquila durante el viaje.",
      estadoSolicitud: "confirmada",
    },
  ],
  notificaciones: [
    {
      id: 1,
      titulo: "Reserva confirmada",
      descripcion:
        "Sofía confirmó tu reserva para el viaje hacia Nordelta del 28 de mayo a las 18:30 hs.",
      icono: FiCheckCircle,
    },
    {
      id: 2,
      titulo: "Nuevo viaje cerca tuyo",
      descripcion:
        "Martín publicó un viaje desde Haras Santa María hacia Capital Federal mañana a las 07:15 hs.",
      icono: FiCalendar,
    },
    {
      id: 3,
      titulo: "Recordatorio de salida",
      descripcion:
        "Tu viaje compartido con Laura hacia USAL Pilar parte hoy a las 16:45 hs. Recordá ser puntual.",
      icono: FiBell,
    },
  ],
  solicitudes: [
    {
      id: "sol-1",
      titulo: "Solicitud de viaje",
      descripcion:
        "Valentina solicitó unirse a tu viaje hacia USAL Pilar el 7 de Octubre a las 18:00 hrs.",
      icono: FiUsers,
      viajeId: "prop-1",
      pasajero: {
        id: "pas-987",
        nombre: "Valentina",
        apellido: "Ruiz",
        
        barrio: "Haras Santa María",
        lote: "1275",
        telefono: "+54 9 11 4899-1188",
        resenas: [
          {
            id: "pas-987-r1",
            autor: "Laura S.",
            comentario: "Excelente compañera de viaje, siempre avisa si se retrasa.",
          },
          {
            id: "pas-987-r2",
            autor: "Ignacio P.",
            comentario: "Muy buena onda y respeta los horarios.",
          },
        ],
      },
    },
  ],
};

// Componente interno que contiene la definición de todas las rutas de la aplicación.
// Recibe los datos y callbacks como props para que App los pueda reemplazar
// con información proveniente de un backend en el futuro.
function AppRoutes({
  nombreBarrio,
  viajesDisponibles,
  viajesPropios,
  viajesAjenos,
  notificaciones,
  solicitudes,
  onBuscarViajes,
  onSumarseViaje,
  onVerDetalleViaje,
  onAceptarSolicitud,
  onRechazarSolicitud,
}) {
  return (
    <Routes>
      {/* Pantalla de inicio de sesión */}
      <Route path="/login" element={<Login />} />

      {/* Redirección por defecto cuando la ruta base no coincide con ninguna pantalla */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Ruta para el formulario de registro */}
      <Route path="/registro" element={<SignUp />} />

      {/* Rutas protegidas por el layout principal, que comparte encabezado y navegación inferior */}
      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={
            <Home
              nombreBarrio={nombreBarrio}
              viajesDisponibles={viajesDisponibles}
              onBuscarViajes={onBuscarViajes}
              onSumarseViaje={onSumarseViaje}
              onVerDetalleViaje={onVerDetalleViaje}
            />
          }
        />
        <Route path="/publicar" element={<Publicar />} />
        <Route
          path="/mis-viajes"
          element={
            <MisViajes
              viajesPropios={viajesPropios}
              viajesAjenos={viajesAjenos}
            />
          }
        />
        <Route path="/perfil-pasajero/:id" element={<PerfilPasajero />} />
        <Route
          path="/notificaciones"
          element={
            <NotificationPage
              solicitudes={solicitudes}
              notificaciones={notificaciones}
              onAcceptSolicitud={onAceptarSolicitud}
              onRejectSolicitud={onRechazarSolicitud}
            />
          }
        />
        {/* Agregar nuevas rutas públicas dentro de este layout según sea necesario */}
      </Route>
    </Routes>
  );
}

// Punto de entrada principal del front-end. Envuelve las rutas con el BrowserRouter
// y prepara los datos que se enviarán como props. En una integración real,
// estos datos se obtendrían desde un backend mediante fetch/axios u otra librería.
function App() {
  // Handlers de ejemplo para dejar listo el flujo de datos desde el backend.
  const manejarBusquedaViajes = () => {};
  const manejarSumarseViaje = () => {};
  const manejarVerDetalleViaje = () => {};
  const manejarAceptarSolicitud = () => {};
  const manejarRechazarSolicitud = () => {};

  return (
    <Router>
      <AppRoutes
        nombreBarrio={DATOS_DEMOSTRACION.barrio.nombre}
        viajesDisponibles={DATOS_DEMOSTRACION.viajesDisponibles}
        viajesPropios={DATOS_DEMOSTRACION.viajesPropios}
        viajesAjenos={DATOS_DEMOSTRACION.viajesAjenos}
        notificaciones={DATOS_DEMOSTRACION.notificaciones}
        solicitudes={DATOS_DEMOSTRACION.solicitudes}
        onBuscarViajes={manejarBusquedaViajes}
        onSumarseViaje={manejarSumarseViaje}
        onVerDetalleViaje={manejarVerDetalleViaje}
        onAceptarSolicitud={manejarAceptarSolicitud}
        onRechazarSolicitud={manejarRechazarSolicitud}
      />
    </Router>
  );
}

export default App;
