import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/style.css";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/login", usuario);

      // Verificamos si la respuesta contiene el token
      if (response.data.token) {
        alert("Inicio de sesión exitoso");

        // Guardamos el token en el localStorage
        localStorage.setItem("token", response.data.token);

        // Redirigimos a la página de bienvenida
        navigate("/welcome");
      } else {
        setError("Error: No se obtuvo un token. Intenta nuevamente.");
      }
    } catch (error) {
      // Verificamos si el error es por credenciales incorrectas o algún otro error
      if (error.response && error.response.status === 401) {
        setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.");
      } else {
        setError("Hubo un error al iniciar sesión. Verifica tus credenciales.");
      }
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <h2>Bienvenido a Technology Vicion</h2>
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
        <button type="submit">Iniciar sesión</button>
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
