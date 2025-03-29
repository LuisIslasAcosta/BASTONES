import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/style.css";

// Importamos 'https' para deshabilitar la validación SSL en desarrollo
import https from "https";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Creamos un agente HTTPS que ignore la validación del certificado
        const agent = new https.Agent({
            rejectUnauthorized: false,  // Esto ignora los errores de certificado
        });

        // Usamos el agente en la solicitud axios
        axios.post("https://3.143.223.115/usuario/", registro, { httpsAgent: agent })
            .then(() => alert("Usuario registrado exitosamente"))
            .catch(error => {
                console.error("Error al registrar usuario:", error);
                alert("Hubo un problema al registrar al usuario. Intenta de nuevo.");
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Crear Nuevo Usuario</h1>
                <input type="text" name="nombre" placeholder="Nombre" value={registro.nombre} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={registro.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={registro.password} onChange={handleChange} required />
                <input type="tel" name="telefono" placeholder="Teléfono" value={registro.telefono} onChange={handleChange} required />
                
                <button type="submit">Registrarse</button>
            </form>
            <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
        </div>
    );
};

export default Register;
