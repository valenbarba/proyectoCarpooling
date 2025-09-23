import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

import FormContainer from "../components/FormContainer";
import ErrorMessage from "../components/ErrorMessage";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";

const SignUp = () => {
  const url = process.env.REACT_APP_API_URL;

  // Estados controlados para cada campo del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [barrios, setBarrios] = useState([]);
  const [barrioSeleccionado, setBarrioSeleccionado] = useState("");

  // Obtiene la lista de barrios privados desde la API.
  useEffect(() => {
    fetch(`${url}/barrios`)
      .then((res) => res.json())
      .then((data) => setBarrios(data))
      .catch(() => setBarrios([]));
  }, [url]);

  const navigate = useNavigate();

  // Realiza validaciones básicas antes de enviar los datos al backend.
  const validarFormulario = () => {
    if (!barrioSeleccionado) {
      return "Por favor seleccioná tu barrio";
    }

    if (password !== password2) {
      return "Las contraseñas no coinciden";
    }

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(nombre) || !soloLetras.test(apellido)) {
      return "El nombre y el apellido no deben contener números ni caracteres especiales";
    }

    if (!genero) {
      return "Por favor seleccioná un género válido";
    }

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const dia = hoy.getDate() - nacimiento.getDate();

    const edadFinal = mes < 0 || (mes === 0 && dia < 0) ? edad - 1 : edad;

    if (edadFinal < 16) {
      return "Debés tener al menos 16 años para registrarte";
    }

    return null;
  };

  const limpiarCampos = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setFechaNacimiento("");
    setGenero("");
    setBarrioSeleccionado("");
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    const mensajeError = validarFormulario();

    if (mensajeError) {
      setError(mensajeError);
      setSuccess("");
      return;
    }

    try {
      const response = await fetch(`${url}/usuarios/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          fechaNacimiento,
          genero,
          email,
          password,
          barrio: {
            id: barrioSeleccionado, // UUID del barrio elegido
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "No se pudo completar el registro");
      }

      setError("");
      setSuccess("Registro exitoso!");
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

  const irALogin = () => {
    navigate("/login");
  };

  return (
    <div className="signupPage">
      <FormContainer>
        <h2 className="signup-title">Registro</h2>

        {success && <div className="mensajeExito">{success}</div>}

        <form onSubmit={handleRegistro}>
          <div className="input-group">
            <Select
              label="Barrio privado"
              labelClassName="label-signup"
              name="barrio"
              value={barrioSeleccionado}
              onChange={(e) => setBarrioSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccioná tu barrio</option>
              {barrios.map((barrio) => (
                <option key={barrio.id} value={barrio.id}>
                  {barrio.nombre}
                </option>
              ))}
            </Select>

            <Input
              label="Nombre"
              labelClassName="label-signup"
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <Input
              label="Apellido"
              labelClassName="label-signup"
              type="text"
              name="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />

            <div className="campo-fecha">
              <Input
                label="Fecha de nacimiento"
                labelClassName="label-signup"
                type="date"
                name="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <Select
              label="Género"
              labelClassName="label-signup"
              name="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option value="">Seleccioná un género</option>
              <option value="true">Masculino</option>
              <option value="false">Femenino</option>
            </Select>

            <Input
              label="Email"
              labelClassName="label-signup"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Contraseña"
              labelClassName="label-signup"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Repita la contraseña"
              labelClassName="label-signup"
              type="password"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          <ErrorMessage message={error} />

          <Button type="submit" className="botonSecundario">
            Registrarme
          </Button>
        </form>
      </FormContainer>

      <div className="divSecundario">
        <Button onClick={irALogin} className="botonPrimario">
          Iniciar Sesión
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
