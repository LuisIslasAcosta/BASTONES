import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
            // Asegúrate de que la URL sea correcta
            const response = await axios.post("http://127.0.0.1:5000/usuario/", registro);
            alert("Usuario registrado exitosamente");
            console.log(response.data);  // Muestra la respuesta del servidor
        } catch (error) {
            // Muestra el error detallado
            if (error.response) {
                // Error recibido desde el servidor (500, 400, etc.)
                console.error("Error al registrar usuario:", error.response.data);
            } else if (error.request) {
                // Error en la solicitud (sin respuesta del servidor)
                console.error("No se recibió respuesta del servidor:", error.request);
            } else {
                // Otro tipo de error
                console.error("Error desconocido:", error.message);
            }
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
