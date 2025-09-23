import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./Input.css";

//onPlaceSelected funcion que se llama cuando el usuario elije un lugar

const AutocompleteInput = ({
  value,
  onPlaceSelected,
  placeholder,
  label,
  containerClassName = "",
  inputClassName = "",
  inputProps = {},
}) => {
  const autocompleteRef = useRef(null);

  // Se ejecuta cuando el usuario elige una sugerencia; getPlace devuelve el lugar seleccionado
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      onPlaceSelected(place);
    }
  };

  return (
    <div
      className={`input-group${
        containerClassName ? ` ${containerClassName}` : ""
      }`}
    >
      {label && <label className="input-label">{label}</label>}
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={value}
          className={`input-field ${inputClassName}`.trim()}
          {...inputProps}
        />
      </Autocomplete>
    </div>
  );
};

export default AutocompleteInput;
