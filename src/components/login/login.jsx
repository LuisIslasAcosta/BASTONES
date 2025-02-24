import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/style.css";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios.post("http://localhost:3000/api/login", usuario)
      .then((response) => {
        alert("Inicio de sesión exitoso");

        const token = response.data.token;
        localStorage.setItem("token", token);

        navigate("/welcome");
      })
      .catch((error) => {
        setError("Hubo un error al iniciar sesión. Verifica tus credenciales.");
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="email" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={usuario.password} onChange={handleChange} required />
        <button type="submit">Iniciar sesión</button>
      </form>
      <button onClick={() => navigate("/login-admin")}>Iniciar sesión como Admin</button>
      <button onClick={() => navigate("/")}>Crear Cuenta</button>
    </div>
  );
};

export default Login;
