import React from "react";
import { FiBell, FiCheckCircle, FiCalendar, FiUsers } from "react-icons/fi";
import Notification from "../components/Notification";
import RequestNotification from "../components/RequestNotification";

// Lista temporal de notificaciones de ejemplo asociadas al usuario.
const notificacionesEjemplo = [
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
];

export default function NotificationPage() {
  return (
    <section className="notificaciones-page">
      <ul className="notificaciones-lista">

        <RequestNotification
          titulo="Solicitud de grupo"
          descripcion="Valentina solicitó unirse a tu viaje hacia USAL Pilar el 7 de Octubre a las 18:00 hrs."
          icono={FiUsers}
          onAccept={() => alert("Aceptado ✅")}
          onReject={() => alert("Rechazado ❌")}
        />
        
        {notificacionesEjemplo.map((n) => (
          <Notification
            key={n.id}
            titulo={n.titulo}
            descripcion={n.descripcion}
            icono={n.icono || FiBell}
            destacada={!!n.destacada}
            // onClick={() => console.log("Abrir notificación", n.id)}
          />
        ))}

        
      </ul>
    </section>
  );
}