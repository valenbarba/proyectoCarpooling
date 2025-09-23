import { useState } from "react";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage"
import "./Publicar.css";
//permite utilizar google maps y places
import { LoadScript } from "@react-google-maps/api";
import AutocompleteInput from "../components/AutoCompleteInput";
import SelectAsientos from "../components/SelectAsientos"; 


function Publicar() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const lugarBarrioUsuario = usuario.barrio?.lugar;
  const nombreBarrio = usuario.barrio?.nombre;


  //maneja el estado del formulario "hacia barrio o desde el barrio"
  const [modoViaje, setModoViaje] = useState("hacia"); // "hacia" o "desde"

  //la direccion que se utiliza
  const [lugar, setLugar] = useState(null);

  //maneja estado de fecha y hora
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [asientos, setAsientos] = useState("");
  const [precioPorAsiento, setPrecio] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getMinDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-CA"); 
  };

  const validarFormulario = () => {

    if (!lugar) {
      return ("Por favor ingrese una dirección.");
    }

    if (!asientos) {
      return ("Por favor seleccioná la cantidad de asientos.");
    }

      if (!fecha || !hora) {
      return ("Completá la fecha y la hora.");
    }

    const fechaHoraIngresada = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    
    if (fechaHoraIngresada <= ahora){
          return("No puedes agregar un viaje en el pasado.");
    }

    return null;
    
  }

  const limpiarCampos = () => {
    setLugar(null);
    setFecha("");
    setHora("");
    setAsientos("");
  }
  //maneja el envio del formulario. mas tarde lo enviará al backend
  const handleSubmit = async(e) => {
    e.preventDefault();

    const mensajeError = validarFormulario();
    if (mensajeError) {
            setError(mensajeError);
            setSuccess("");
            return;
    }

    const email = localStorage.getItem("email");
    const url = process.env.REACT_APP_API_URL;
  
    const lugarSeleccionado = {
      id: lugar.place_id,
      nombre: lugar.name || lugar.formatted_address,
      direccionCompleta: lugar.formatted_address,
      ciudad: lugar.address_components?.find(c => c.types.includes("locality"))?.long_name || "",
      provincia: lugar.address_components?.find(c => c.types.includes("administrative_area_level_1"))?.long_name || "",
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
      asientosDisponibles: parseInt(asientos),
    }

    
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
      throw new Error(errorText);
    }

    setError("");
    setSuccess("Viaje Publicado!");
    limpiarCampos();
  
    setTimeout(() => {
      setSuccess("");
    }, 3000);
    

    } catch (err) {
      if(err.message === "Failed to fetch" || err.message.includes("NetworkError")){
        setError("No se pudo conectar con el servidor. Intente nuevamente más tarde.");
      } else {
         setError(err.message || "Ocurrió un error inesperado.");
      }
      setSuccess("");
    }

    
  };

  return  (
    <FormContainer titulo="Publicar un viaje">

      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >

      {success && (<div className="mensajeExito">{success}</div>)}


      <form onSubmit={handleSubmit} className="form-publicar">

      <div className="input-group">
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
          {/* Segun el modo de viaje (hacia barrio o desde barrio), muestra un input
            cuando el usuario selecciona un Place, se auto completa con la direccion
           */}
            {modoViaje === "hacia" ? (
              
              <AutocompleteInput
                label = "Desde"
                placeholder="Ingrese dirección de origen"
                value={lugar?.formatted_address || ""}
                onPlaceSelected={(place) => setLugar(place)}
              />
            ) : (
              <AutocompleteInput
                label= "Hacia"
                placeholder="Ingrese dirección de destino"
                value={lugar?.formatted_address || ""}
                onPlaceSelected={(place) => setLugar(place)}
              />
            )}
          </div>

        <div className="campo-fecha-hora">
            <SelectAsientos value={asientos} onChange={(e) => setAsientos(e.target.value)} />
        
        <Input
            type="number"
            label="Precio por asiento"
            value={precioPorAsiento}
            onChange={(e) => {setPrecio(e.target.value)
              setError("");
            }}
          />
        </div>
        

        <div className="campo-fecha-hora">
          <Input
            type="date"
            label="Fecha"
            value={fecha}
            onChange={(e) => {setFecha(e.target.value);
              setError("");
            }}
         
            min={getMinDate()}
          />
          <Input
            type="time"
            label="Hora"
            value={hora}
            onChange={(e) => {setHora(e.target.value)
              setError("");
            }}
       
          />

          
        </div>

        
      </div>
       

        <ErrorMessage message={error} />

        <Button type="submit" className="botonPrimario">Publicar</Button>
      </form>
      </LoadScript>

  


    </FormContainer>
  );

}

export default Publicar;