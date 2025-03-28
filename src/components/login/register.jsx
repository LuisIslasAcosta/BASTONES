import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import https from "https"; // Importar el módulo para manejar SSL en Node.js
import "../../style/style.css";

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
            const response = await axios.post("http://3.148.234.248/usuario/", registro, {
                httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignorar SSL solo en desarrollo
            });

            alert("Usuario registrado exitosamente");
            console.log(response.data);
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                alert("Error de red: No se pudo conectar con el servidor. Verifica la conexión.");
            } else if (error.response) {
                alert(`Error ${error.response.status}: ${error.response.data.message || "Error desconocido"}`);
            } else {
                alert("Ocurrió un error inesperado.");
            }
            console.error("Error al registrar usuario:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Crear Nuevo Usuario</h1>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={registro.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registro.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registro.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={registro.telefono}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Registrarse</button>
            </form>
            <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
        </div>
    );
};

export default Register;
