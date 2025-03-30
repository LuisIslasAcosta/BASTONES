import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/style.css";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!usuario.email || !usuario.password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://echopath.zapto.org/usuario/login", usuario);

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
      if (error.response) {
        setError(error.response.data.message || "Error desconocido del servidor.");
      } else if (error.request) {
        setError("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
      } else {
        setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
      }
      console.error(error);
    } finally {
      setLoading(false);
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={usuario.email}
          onChange={handleChange}
          required
          className="small-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={usuario.password}
          onChange={handleChange}
          required
          className="small-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
      <div className="button-group">
        <button onClick={() => navigate("/")} className="register-button">
          Crear Cuenta
        </button>
      </div>
    </div>
  );
};

export default Login;