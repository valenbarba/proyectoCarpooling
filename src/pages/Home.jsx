import { useEffect, useRef, useState } from "react";
import AutocompleteInput from "../components/AutoCompleteInput";
import { LoadScript } from "@react-google-maps/api";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import TarjetaViaje from "../components/TarjetaViaje";

function Home() {
  let usuario = null;
  const usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    try {
      usuario = JSON.parse(usuarioGuardado);
    } catch (e) {
      console.error("Error al parsear usuario:", e);
      usuario = null;
    }
  }

  // === nuevo estado UI Home ===
  const nombreBarrio = usuario?.barrio?.nombre || "Mi barrio";
  const [modoViaje, setModoViaje] = useState("hacia"); // "hacia" | "desde"
  const [lugar, setLugar] = useState(null); // Google Place

  const [mostrarTrayectos, setMostrarTrayectos] = useState(false);
  const resultadosRef = useRef(null);

  useEffect(() => {
    if (mostrarTrayectos && resultadosRef.current) {
      resultadosRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mostrarTrayectos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // activamos los trayectos de ejemplo
    setMostrarTrayectos(true);
  };

  const trayectosEjemplo = [
    {
      id: 1,
      nombre: "Martín",
      sigla: "M",
      destino: "Plaza Italia",
      fecha: "Martes 25 de octubre. 14:00",
      precio: "$2000 / asiento",
    },
    {
      id: 2,
      nombre: "Ana",
      sigla: "A",
      destino: "USAL Pilar",
      fecha: "Lunes 7 de octubre · 08:00",
      precio: "Sin tarifa",
    },
    {
      id: 3,
      nombre: "Valentina",
      sigla: "V",
      destino: "Escobar centro",
      fecha: "Sábado 30 de septiembre · 16:00",
      precio: "$1500 / asiento",
    },
  ];

  return (
    <FormContainer>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <form onSubmit={handleSubmit} className="form-buscar">
          {/* Buscador de direcciones*/}
          <div className="campo-direccion">
            {modoViaje === "hacia" ? (
              <AutocompleteInput
                label="Desde"
                placeholder="Ingrese dirección de origen"
                value={lugar?.formatted_address || ""}
                onPlaceSelected={(place) => setLugar(place)}
              />
            ) : (
              <AutocompleteInput
                label="Hacia"
                placeholder="Ingrese dirección de destino"
                value={lugar?.formatted_address || ""}
                onPlaceSelected={(place) => setLugar(place)}
              />
            )}
          </div>

          {/* Contenedor con las mismas clases que en Publicar.jsx */}
          <div className="input-group" style={{ marginTop: 8 }}>
            {/* Selector de dirección (reutiliza .radio-viaje) */}
            <div className="radio-viaje">
              <label>
                <input
                  type="radio"
                  value="hacia"
                  checked={modoViaje === "hacia"}
                  onChange={() => setModoViaje("hacia")}
                />
                Viajo hacia {nombreBarrio}
              </label>
              <label>
                <input
                  type="radio"
                  value="desde"
                  checked={modoViaje === "desde"}
                  onChange={() => setModoViaje("desde")}
                />
                Viajo desde {nombreBarrio}
              </label>
            </div>
          </div>

          <Button type="submit" className="botonPrimario">Buscar</Button>
        </form>
      </LoadScript>

      {mostrarTrayectos && (
        <section ref={resultadosRef} className="seccion-trayectos">
          <h3 className="seccion-titulo">Trayectos disponibles</h3>

          {trayectosEjemplo.map((t) => (
            <TarjetaViaje
              key={t.id}
              sigla={t.sigla}
              nombre={t.nombre}
              destino={t.destino}
              fecha={t.fecha}
              precio={t.precio}
              onSumarse={() => console.log("Sumarse", t)}
              onVerMas={() => console.log("Ver más de", t)}
            />
          ))}
        </section>
      )}
    </FormContainer>
  );
}

export default Home;
