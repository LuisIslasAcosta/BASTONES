import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/login.css";

const Register = () => {
  const navigate = useNavigate();

  const [registro, setRegistro] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://3.143.223.115/usuario/", registro);
      alert("Usuario registrado exitosamente");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error al registrar usuario:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error desconocido:", error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <h2>Bienvenido a Technology Vision</h2>
        <img src="/img/logo.png" alt="Register" className="login-image" />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Crear Nuevo Usuario</h1>
        <input type="text" name="nombre" placeholder="Nombre" value={registro.nombre} onChange={handleChange} required className="small-input" />
        <input type="email" name="email" placeholder="Email" value={registro.email} onChange={handleChange} required className="small-input" />
        <input type="password" name="password" placeholder="Password" value={registro.password} onChange={handleChange} required className="small-input" />
        <input type="tel" name="telefono" placeholder="Teléfono" value={registro.telefono} onChange={handleChange} required className="small-input" />
        <button type="submit">Registrarse</button>
        <button type="button" onClick={() => navigate("/login")} className="secondary-button">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Register;
