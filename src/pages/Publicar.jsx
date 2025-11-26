import { useMemo, useState } from "react";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import "./Publicar.css";
import { LoadScript } from "@react-google-maps/api"; // Permite utilizar Google Maps y Places.
import AutocompleteInput from "../components/AutoCompleteInput";
import SelectAsientos from "../components/SelectAsientos";

const obtenerUsuario = () => {
  const almacenado = localStorage.getItem("usuario");
  if (!almacenado) return null;
  try {
    return JSON.parse(almacenado);
  } catch (error) {
    console.error("Error al parsear usuario almacenado", error);
    return null;
  }
};

function Publicar() {
  const usuario = obtenerUsuario();
  const lugarBarrioUsuario = usuario?.barrio?.lugar ?? null;
  const nombreBarrio = usuario?.barrio?.nombre ?? "Haras Santa María";

  // Maneja el estado del formulario "hacia" el barrio o "desde" el barrio.
  const [modoViaje, setModoViaje] = useState("hacia");
  const [lugar, setLugar] = useState(null); // Lugar seleccionado en el autocomplete.
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [hora, setHora] = useState("");
  const [asientos, setAsientos] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const minDate = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString("en-CA");
  }, []);

  const validarFormulario = () => {
    if (!lugar) {
      return "Por favor ingresá una dirección.";
    }

    if (!asientos) {
      return "Por favor seleccioná la cantidad de asientos.";
    }

    if (!fecha || !hora) {
      return "Completá la fecha y la hora.";
    }

    const fechaHoraIngresada = new Date(`${fecha}T${hora}`);
    if (fechaHoraIngresada <= new Date()) {
      return "No podés publicar un viaje en el pasado.";
    }

    if (!lugarBarrioUsuario) {
      return "No se encontró la información de tu barrio. Iniciá sesión nuevamente.";
    }

    return null;
  };

  const limpiarCampos = () => {
    setLugar(null);
    setFecha("");
    setHora("");
    setAsientos("");
  };

  // Maneja el envío del formulario; enviaria los datos al backend una vez validados.
 const handleSubmit = (e) => {
  e.preventDefault();

  setError("");
  setSuccess("¡Viaje Publicado!");
  limpiarCampos();

  setTimeout(() => {
    setSuccess("");
  }, 3000);
};


  return (
    <FormContainer titulo="Publicar un viaje">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        {success && <div className="mensajeExito">{success}</div>}

        <form onSubmit={handleSubmit} className="form-publicar">

          <div className="input-group">
            
            <div className="campo-label">
              <label className="etiqueta">Tipo de viaje:</label>
            </div>

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

            <div className="campo-direccion">
              {modoViaje === "hacia" ? (
                <AutocompleteInput
                  label="Desde"
                  placeholder="Ingrese dirección de origen"
                  value={lugar?.formatted_address || ""}
                  onPlaceSelected={(place) => {
                    setLugar(place);
                    setError("");
                  }}
                />
              ) : (
                <AutocompleteInput
                  label="Hacia"
                  placeholder="Ingrese dirección de destino"
                  value={lugar?.formatted_address || ""}
                  onPlaceSelected={(place) => {
                    setLugar(place);
                    setError("");
                  }}
                />
              )}
            </div>

           
              <SelectAsientos value={asientos} onChange={(e) => setAsientos(e.target.value)} />
            

            <div className="campo-fecha-hora">
              <Input
                type="date"
                label="Fecha"
                value={fecha}
                min={minDate}
                onChange={(e) => {
                  setFecha(e.target.value);
                  setError("");
                }}
              />
              <Input
                type="time"
                label="Hora"
                value={hora}
                onChange={(e) => {
                  setHora(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="campo-comentario">
              <Input
                type="text"
                label="Comentarios adicionales"
                value={comentario}
                onChange={(e) => {
                  setComentario(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          <ErrorMessage message={error} />

          <Button type="submit" className="botonPrimario">
            Publicar
          </Button>
        </form>
      </LoadScript>
    </FormContainer>
  );
}

export default Publicar;
