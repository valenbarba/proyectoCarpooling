import { FaUsers } from "react-icons/fa";
import "./SelectAsientos.css";

/*
 * Selector con ícono para elegir la cantidad de asientos disponibles en un viaje.
 */
const SelectAsientos = ({ value, onChange }) => {
  return (
    <div className="input-with-icon">
      <label htmlFor="asientos" className="input-label">
        Asientos disponibles
      </label>
      <div className="select-wrapper">
        <FaUsers className="input-icon" aria-hidden="true" />
        <select
          id="asientos"
          name="asientos"
          value={value}
          onChange={onChange}
          className="input-field select-estilizado"
        >
          <option value="">Seleccionar</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectAsientos;
