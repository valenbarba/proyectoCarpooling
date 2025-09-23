import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();

  // Campos controlados por estado local
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const url = process.env.REACT_APP_API_URL;

  // Envia las credenciales al backend y guarda los datos necesarios en localStorage.
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${url}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Credenciales inválidas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      localStorage.setItem("email", data.usuario.email);
      navigate("/home");
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("No se pudo conectar con el servidor.");
      } else {
        setError(err.message || "Ocurrió un error inesperado.");
      }
    }
  };

  const irARegistro = () => {
    navigate("/registro");
  };

  return (
    <div className="loginPage">
      <FormContainer>
        <h2 className="login-title">Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            labelClassName="label-login"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Contraseña"
            labelClassName="label-login"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <ErrorMessage message={error} />

          <Button type="submit" className="botonPrimario">
            Entrar
          </Button>
        </form>
      </FormContainer>

      <div className="divSecundario">
        <Button onClick={irARegistro} className="botonSecundario">
          Registrarme
        </Button>
      </div>
    </div>
  );
};

export default Login;
