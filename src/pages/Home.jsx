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

          {[
            { id: 1, sigla: "A", titulo: "USAL Pilar", detalle: "Lunes a Viernes 8:00 hrs" },
            { id: 2, sigla: "V", titulo: "Escobar centro", detalle: "Martes 16:00 hrs" },
            { id: 3, sigla: "F", titulo: "Plaza Italia", detalle: "Lunes y Miércoles 8:00 hrs" },
          ].map((t) => (
            <TarjetaViaje
              key={t.id}
              sigla={t.sigla}
              titulo={t.titulo}
              detalle={t.detalle}
              onAgregar={() => console.log("Agregar", t)}
              onOpciones={() => console.log("Opciones de", t)}
            />
          ))}
        </section>
        )}

      </FormContainer>

      
  );
}

export default Home;