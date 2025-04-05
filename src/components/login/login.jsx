import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar error previo

    try {
      const response = await axios.post("https://3.143.223.115/usuario/login", usuario);
      console.log(response.data);
      if (response.status === 200 && response.data.message === "Login exitoso") {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", response.data.usuario.rol_nombre);

        const rol = response.data.usuario.rol_nombre;
        if (rol === "admin") {
          navigate("/DashboardAdmin");
        } else {
          navigate("/Welcome");
        }
      } else {
        setError("Error: No se obtuvo una respuesta válida del servidor.");
      }
    } catch (error) {
      setError("Hubo un error al iniciar sesión. Verifica tus credenciales.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <h2>Bienvenido a Technology Vision</h2>
        <img src="/img/logo.png" alt="Login" className="login-image" />
      </div>
      <div className="divider"></div>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <input type="email" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required className="small-input" />
        <input type="password" name="password" placeholder="Password" value={usuario.password} onChange={handleChange} required className="small-input" />
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={() => navigate("/")} className="secondary-button">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Login;
