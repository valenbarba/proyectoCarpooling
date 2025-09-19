import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage"

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    //evita que el navegador recargue la pagina al enviar el form
    //muestra datos por consola, en este caso se van a enviar al backend
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const url = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch (`${url}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if(response.ok){
        const data = await response.json();
        console.log("respuesta login:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("email", data.usuario.email);
        navigate("/home");
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      
    } catch (err) {
    if (err.message === "Failed to fetch") {
      setError("No se pudo conectar con el servidor.");
    } else {
      setError(err.message);
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
        {/* El formulario contiene dos inputs, y a ambos se les asignan sus variables 
        La funcion onChange actualiza el estado segun lo escrito en el campo*/}
        
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

        <Button type="submit" className="botonPrimario">Entrar</Button>

      </form>
      
    </FormContainer>

    <div className="divSecundario">
      <Button onClick={irARegistro} className="botonSecundario">Registrarme</Button>
    </div>
    </div>
  );
};

//el formulario contenido dentro del FormContainer, al ser enviado llama a la funcion ManejarSubmit
export default Login;
