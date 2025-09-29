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
  const [hora, setHora] = useState("");
  const [asientos, setAsientos] = useState("");
  const [precioPorAsiento, setPrecio] = useState("");
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

    if (!precioPorAsiento) {
      return "Indicá el precio por asiento.";
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
    setPrecio("");
  };

  // Maneja el envío del formulario; envía los datos al backend una vez validados.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const mensajeError = validarFormulario();
    if (mensajeError) {
      setError(mensajeError);
      setSuccess("");
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      setError("No se encontró el usuario autenticado. Iniciá sesión nuevamente.");
      setSuccess("");
      return;
    }

    const url = process.env.REACT_APP_API_URL;

    const lugarSeleccionado = {
      id: lugar.place_id,
      nombre: lugar.name || lugar.formatted_address,
      direccionCompleta: lugar.formatted_address,
      ciudad:
        lugar.address_components?.find((c) => c.types.includes("locality"))?.long_name || "",
      provincia:
        lugar.address_components?.find((c) =>
          c.types.includes("administrative_area_level_1")
        )?.long_name || "",
      latitud: lugar.geometry.location.lat(),
      longitud: lugar.geometry.location.lng(),
    };

    const origen = modoViaje === "desde" ? lugarBarrioUsuario : lugarSeleccionado;
    const destino = modoViaje === "hacia" ? lugarBarrioUsuario : lugarSeleccionado;

    const fechaHora = new Date(`${fecha}T${hora}`);
    const viaje = {
      origen,
      destino,
      fechaOcurrencia: fechaHora.toISOString(),
      asientosDisponibles: Number(asientos),
      precioPorAsiento: Number(precioPorAsiento),
    };

    try {
      const response = await fetch(`${url}/viajes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-email": email,
        },
        body: JSON.stringify(viaje),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "No se pudo publicar el viaje.");
      }

      setError("");
      setSuccess("¡Viaje publicado!");
      limpiarCampos();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      if (err.message === "Failed to fetch" || err.message.includes("NetworkError")) {
        setError("No se pudo conectar con el servidor. Intente nuevamente más tarde.");
      } else {
        setError(err.message || "Ocurrió un error inesperado.");
      }
      setSuccess("");
    }
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
