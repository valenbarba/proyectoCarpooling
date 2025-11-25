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

const PASAJEROS = {
  sofiaGimenez: {
    id: "pas-sofia",
    nombre: "Sofía",
    apellido: "Giménez",
    avatar: "https://i.pravatar.cc/120?img=32",
    barrio: "Haras Santa María",
    lote: "1342",
    telefono: "+54 9 11 4567-1234",
    resenas: [
      {
        id: "res-sofia-1",
        autor: "Martín F.",
        comentario: "Muy puntual y respetuosa durante los viajes.",
      },
      {
        id: "res-sofia-2",
        autor: "Laura P.",
        comentario: "Siempre avisa con tiempo si surge algún cambio.",
      },
    ],
  },
  martinBustos: {
    id: "pas-martin",
    nombre: "Martín",
    apellido: "Bustos",
    avatar: "https://i.pravatar.cc/120?img=12",
    barrio: "Haras Santa María",
    lote: "1180",
    telefono: "+54 9 11 4789-6654",
    resenas: [
      {
        id: "res-martin-1",
        autor: "Gonzalo H.",
        comentario: "Buena comunicación y siempre llega con casco para la bici plegable.",
      },
      {
        id: "res-martin-2",
        autor: "Sofía G.",
        comentario: "Compartimos viaje a diario, muy amable.",
      },
    ],
  },
  carlaNunez: {
    id: "pas-carla",
    nombre: "Carla",
    apellido: "Nuñez",
    avatar: "https://i.pravatar.cc/120?img=31",
    barrio: "Haras Santa María",
    lote: "1275",
    telefono: "+54 9 11 5123-9087",
    resenas: [
      {
        id: "res-carla-1",
        autor: "Valentina R.",
        comentario: "Siempre lleva mate y lo comparte con el grupo.",
      },
    ],
  },
  lauraSosa: {
    id: "pas-laura",
    nombre: "Laura",
    apellido: "Sosa",
    avatar: "https://i.pravatar.cc/120?img=5",
    barrio: "Haras Santa María",
    lote: "890",
    telefono: "+54 9 11 4455-2266",
    resenas: [
      {
        id: "res-laura-1",
        autor: "Ignacio P.",
        comentario: "Excelente compañera de viaje, muy organizada.",
      },
      {
        id: "res-laura-2",
        autor: "Carla N.",
        comentario: "Siempre trae snacks para compartir.",
      },
    ],
  },
  gonzaloHerrera: {
    id: "pas-gonzalo",
    nombre: "Gonzalo",
    apellido: "Herrera",
    avatar: "https://i.pravatar.cc/120?img=51",
    barrio: "Haras Santa María",
    lote: "965",
    telefono: "+54 9 11 4785-3344",
    resenas: [
      {
        id: "res-gonzalo-1",
        autor: "Martín B.",
        comentario: "Siempre ayuda con el equipaje pesado.",
      },
    ],
  },
  elenaMartinez: {
    id: "pas-elena",
    nombre: "Elena",
    apellido: "Martínez",
    avatar: "https://i.pravatar.cc/120?img=16",
    barrio: "Haras Santa María",
    lote: "1042",
    telefono: "+54 9 11 4332-9090",
    resenas: [
      {
        id: "res-elena-1",
        autor: "Valentina R.",
        comentario: "Muy amable, suele compartir playlists.",
      },
    ],
  },
  diegoRossi: {
    id: "pas-diego",
    nombre: "Diego",
    apellido: "Rossi",
    avatar: "https://i.pravatar.cc/120?img=15",
    barrio: "Haras Santa María",
    lote: "765",
    telefono: "+54 9 11 4556-7788",
    resenas: [
      {
        id: "res-diego-1",
        autor: "Laura S.",
        comentario: "Siempre ofrece ayuda para coordinar la logística.",
      },
    ],
  },
  luciaQuintana: {
    id: "pas-lucia",
    nombre: "Lucía",
    apellido: "Quintana",
    avatar: "https://i.pravatar.cc/120?img=48",
    barrio: "Haras Santa María",
    lote: "810",
    telefono: "+54 9 11 4677-2211",
    resenas: [
      {
        id: "res-lucia-1",
        autor: "Diego R.",
        comentario: "Gran compañía, le encanta conversar de música.",
      },
    ],
  },
  pilarGonzalez: {
    id: "pas-pilar",
    nombre: "Pilar",
    apellido: "Gonzalez",
    avatar: "https://i.pravatar.cc/120?img=9",
    barrio: "Haras Santa María",
    lote: "1275",
    telefono: "+54 9 11 4899-1188",
    resenas: [
      {
        id: "res-pilar-1",
        autor: "Laura S.",
        comentario: "Excelente compañera de viaje, siempre avisa si se retrasa.",
      },
      {
        id: "res-pilar-2",
        autor: "Ignacio P.",
        comentario: "Muy buena onda y respeta los horarios.",
      },
    ],
  },
  lautarMartinez: {
    id: "cond-lautaro",
    nombre: "Lautaro",
    apellido: "Martínez",
    avatar: "https://i.pravatar.cc/120?img=53",
    barrio: "Haras Santa María",
    lote: "1190",
    telefono: "+54 9 11 5012-8899",
    resenas: [
      {
        id: "res-lautaro-1",
        autor: "Mario H.",
        comentario: "Muy puntual y confiable.",
      },
      {
        id: "res-lautaro-2",
        autor: "Mariana P.",
        comentario: "Siempre prende el aire acondicionado.",
      },
    ],
  },
  anaSuarez: {
    id: "cond-ana",
    nombre: "Ana",
    apellido: "Suarez",
    barrio: "Haras Santa María",
    avatar: "https://i.pravatar.cc/120?img=16",
    lote: "1260",
    telefono: "+54 9 11 4455-8899",
    resenas: [
      {
        id: "res-ana-1",
        autor: "Claudia M.",
        comentario: "Muy amable. Nos hicimos amigas!.",
      },
    ],
  },
  valentinaRuiz: {
    id: "cond-valentina",
    nombre: "Valentina",
    apellido: "Ruiz",
    avatar: "https://i.pravatar.cc/120?img=30",
    barrio: "Haras Santa María",
    lote: "1345",
    telefono: "+54 9 11 4000-7788",
    resenas: [
      {
        id: "res-valentina-1",
        autor: "Paula L.",
        comentario: "Siempre viajo con ella y mi hija tambien. Ningun problema",
      },
    ],
  },
  martinFernandez: {
    id: "cond-martin",
    nombre: "Martín",
    apellido: "Fernández",
    barrio: "Haras Santa María",
    avatar: "https://i.pravatar.cc/120?img=18",
    lote: "1080",
    telefono: "+54 9 11 4789-1122",
    resenas: [
      {
        id: "res-ana-1",
        autor: "Sofia G.",
        comentario: "Muy buen conductor",
      },
    ],
  },
  lauraGimenez: {
    id: "cond-laura-g",
    nombre: "Laura",
    apellido: "Gimenez",
    barrio: "Haras Santa María",
    avatar: "https://i.pravatar.cc/120?img=34",
    lote: "990",
    telefono: "+54 9 11 4111-2000",
    resenas: [
      {
        id: "res-ana-1",
        autor: "Fernando B",
        comentario: "Destaco la puntualidad y amabilidad",
      },
    ],
  },
};

const obtenerSigla = (persona) => persona?.nombre?.[0]?.toUpperCase() || "?";

const VIAJES_DISPONIBLES_BASE = [
  {
    id: "disp-1",
    conductorId: "lautarMartinez",
    destino: "USAL Pilar",
    fecha: "9 de Diciembre · 8:00 hrs",
    comentario: "Punto de encuentro en la entrada principal del barrio.",
    rating: 4.8,
    reviewsCount: 26,
  },
  {
    id: "disp-2",
    conductorId: "anaSuarez",
    destino: "Plaza Italia",
    fecha: "8 de Diciembre · 17:00 hrs",
    precio: "$1800 / asiento",
    comentario: "Nos encontramos en el lote 1260 a las 16:45 en punto.",
    rating: 4.6,
    reviewsCount: 18,
  },
  {
    id: "disp-3",
    conductorId: "valentinaRuiz",
    destino: "Escobar centro",
    fecha: "6 de Diciembre · 9:00",
    precio: "$1500 / asiento",
    comentario: "Puedo pasar por el Club House si les queda cómodo.",
    rating: 5,
    reviewsCount: 32,
  },
];

const VIAJES_PROPIOS_BASE = [
  {
    id: "prop-1",
    destino: "USAL Pilar",
    fecha: crearFechaRelativa(2, 8, 15),
    puntoEncuentro: "Garita Norte - Lote 1260",
    direccion: "Champagnat 1599",
    capacidadTotal: 3,
    notas: "Salgo puntual, llevar cambio si necesitan pagar en efectivo.",
    pasajeros: [
      { id: "sofiaGimenez", estado: "aceptado" },
      { id: "martinBustos", estado: "pendiente" },
      { id: "carlaNunez", estado: "pendiente" },
    ],
  },
  {
    id: "prop-2",
    destino: "Escobar Centro",
    fecha: crearFechaRelativa(-4, 17, 30),
    puntoEncuentro: "Club House - Estacionamiento",
    direccion: "Tapia de Cruz 376, Escobar",
    capacidadTotal: 4,
    notas: "Gracias por avisar si se retrasan. Tengo lugar para equipaje chico.",
    pasajeros: [
      { id: "lauraSosa", estado: "aceptado" },
      { id: "gonzaloHerrera", estado: "aceptado" },
      { id: "elenaMartinez", estado: "pendiente" },
    ],
  },
  {
    id: "prop-3",
    destino: "BBVA CABA",
    fecha: crearFechaRelativa(4, 6, 45),
    puntoEncuentro: "Entrada principal - Portón Sur",
    direccion: "Reconquista 199, C1003 Cdad. Autónoma de Buenos Aires",
    capacidadTotal: 3,
    notas: "Puedo desviar hasta la colectora si alguien lo necesita.",
    pasajeros: [
      { id: "diegoRossi", estado: "aceptado" },
      { id: "luciaQuintana", estado: "pendiente" },
    ],
  },
];

const VIAJES_AJENOS_BASE = [
  {
    id: "aj-1",
    conductorId: "martinFernandez",
    destino: "CABA - Obelisco",
    fecha: crearFechaRelativa(7, 7, 0),
    puntoEncuentro: "Rotonda Principal",
    direccion: "Av. Corrientes, C1035 Cdad. Autónoma de Buenos Aires",
    asientoReservado: "Asiento 2 de 3",
    notas: "Paso por la entrada 6:50 hrs. Porfavor sean puntuales",
    estadoSolicitud: "pendiente",
  },
  {
    id: "aj-2",
    conductorId: "valentinaRuiz",
    destino: "Pilar Centro",
    fecha: crearFechaRelativa(-2, 19, 10),
    puntoEncuentro: "Garita Sur",
    direccion: "Estanislao López 525, Pilar",
    asientoReservado: "Asiento 1 de 4",
    notas: "Gran viaje, conducción muy segura.",
    estadoSolicitud: "confirmada",
  },
  {
    id: "aj-3",
    conductorId: "lauraGimenez",
    destino: "Colegio Belgrano Escobar",
    fecha: crearFechaRelativa(4, 7, 30),
    puntoEncuentro: "Playón Deportivo",
    direccion: "Juan P. Asborno, Belén de Escobar.",
    asientoReservado: "Asiento 3 de 3",
    notas: "Dejo a los chicos en la entrada y espero a que entren.",
    estadoSolicitud: "confirmada",
  },
];

const SOLICITUDES_BASE = [
  {
    id: "sol-1",
    titulo: "Solicitud de viaje",
    descripcion:
      "Pilar solicitó unirse a tu viaje hacia USAL Pilar el 5 de Diciembre a las 8:10 hrs.",
    icono: FiUsers,
    viajeId: "prop-1",
    pasajeroId: "pilarGonzalez",
  },
];

const NOTIFICACIONES_BASE = [
  {
    id: 1,
    titulo: "Reserva confirmada",
    descripcion:
      "Sofía confirmó tu reserva para el viaje hacia Nordelta del 28 de Septiembre a las 18:30 hs.",
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
];

const mapPasajeros = (pasajeros) =>
  pasajeros.map(({ id, estado }) => ({ ...PASAJEROS[id], estado }));

const viajesDisponibles = VIAJES_DISPONIBLES_BASE.map((viaje) => {
  const conductor = PASAJEROS[viaje.conductorId];
  return {
    ...viaje,
    nombre: conductor?.nombre,
    apellido: conductor?.apellido,
    sigla: obtenerSigla(conductor),
    avatar: conductor?.avatar,
    barrio: conductor?.barrio,
    lote: conductor?.lote,
    telefono: conductor?.telefono,
    resenas: conductor?.resenas,
  };
});

const viajesPropios = VIAJES_PROPIOS_BASE.map((viaje) => {
  const pasajeros = mapPasajeros(viaje.pasajeros);
  const pasajerosConfirmados = pasajeros.filter((p) => p.estado === "aceptado").length;

  return {
    ...viaje,
    pasajeros,
    pasajerosConfirmados,
  };
});

const viajesAjenos = VIAJES_AJENOS_BASE.map((viaje) => {
  const conductor = PASAJEROS[viaje.conductorId];
  const nombreConductor = conductor
    ? `${conductor.nombre} ${conductor.apellido || ""}`.trim()
    : "Conductor";

  return {
    ...viaje,
    conductor: nombreConductor,
    conductorNombre: conductor?.nombre,
    conductorApellido: conductor?.apellido,
    conductorAvatar: conductor?.avatar,
    conductorBarrio: conductor?.barrio,
    conductorLote: conductor?.lote,
    conductorResenas: conductor?.resenas,
    contactoConductor: conductor?.telefono,
  };
});

const solicitudes = SOLICITUDES_BASE.map((solicitud) => ({
  ...solicitud,
  pasajero: PASAJEROS[solicitud.pasajeroId],
}));

const DATOS_DEMOSTRACION = {
  barrio: { nombre: "Haras Santa María" },
  viajesDisponibles,
  viajesPropios,
  viajesAjenos,
  notificaciones: NOTIFICACIONES_BASE,
  solicitudes,
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
