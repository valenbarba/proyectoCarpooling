import { useEffect, useId, useRef, useState } from "react";
import AutocompleteInput from "../components/AutoCompleteInput";
import { LoadScript } from "@react-google-maps/api";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import TarjetaViaje from "../components/TarjetaViaje";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./Home.css";

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
  const [modoViaje, setModoViaje] = useState("desde"); // "hacia" | "desde"
  const [lugar, setLugar] = useState(null); // Google Place
  const [buscadorExpandido, setBuscadorExpandido] = useState(false);

  const [mostrarTrayectos, setMostrarTrayectos] = useState(false);
  const resultadosRef = useRef(null);
  const buscadorContentId = useId();

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

  const toggleBuscador = () => {
    setBuscadorExpandido((prev) => !prev);
  };

  const trayectosEjemplo = [
    {
      id: 1,
      nombre: "Martín",
      sigla: "M",
      destino: "Plaza Italia",
      fecha: "25 de abr. 14:00",
      precio: "$2000 / asiento",
    },
    {
      id: 2,
      nombre: "Ana",
      sigla: "A",
      destino: "USAL Pilar",
      fecha: "Lunes a Viernes · 08:00",
      precio: "$1800 / asiento",
    },
    {
      id: 3,
      nombre: "Valentina",
      sigla: "V",
      destino: "Escobar centro",
      fecha: "Martes · 16:00",
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
          <div className="buscador-colapsable">
            <div
              className={`buscador-resumen${
                buscadorExpandido ? " buscador-resumen--abierto" : ""
              }`}
            >
              <FaSearch className="buscador-resumen__icono" aria-hidden="true" />
              <AutocompleteInput
                label="Buscar un Viaje"
                placeholder={
                  modoViaje === "hacia"
                    ? "Ingrese dirección de origen"
                    : "Ingrese dirección de destino"
                }
                value={lugar?.formatted_address || ""}
                onPlaceSelected={(place) => setLugar(place)}
                containerClassName="buscador-resumen__input-group"
                inputClassName="buscador-resumen__input"
                inputProps={{ onFocus: () => setBuscadorExpandido(true) }}
              />
              <button
                type="button"
                className="buscador-toggle"
                onClick={toggleBuscador}
                aria-expanded={buscadorExpandido}
                aria-controls={buscadorContentId}
                aria-label="Mostrar opciones del buscador"
              >
                <FaChevronDown
                  className={`buscador-icon${
                    buscadorExpandido ? " buscador-icon--abierto" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {buscadorExpandido && (
              <div id={buscadorContentId} className="buscador-contenido">
                <div className="input-group" style={{ marginTop: 8 }}>
                  <div className="radio-viaje">
                    
                    <label>
                      <input
                        type="radio"
                        value="desde"
                        checked={modoViaje === "desde"}
                        onChange={() => setModoViaje("desde")}
                      />
                      Viajo desde {nombreBarrio}
                    </label>

                    <label>
                      <input
                        type="radio"
                        value="hacia"
                        checked={modoViaje === "hacia"}
                        onChange={() => setModoViaje("hacia")}
                      />
                      Viajo hacia {nombreBarrio}
                    </label>
                  </div>
                </div>

                <Button type="submit" className="botonPrimario">
                  Buscar
                </Button>
              </div>
            )}
          </div>
        </form>
      </LoadScript>

      
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
     
    </FormContainer>
  );
}

export default Home;
