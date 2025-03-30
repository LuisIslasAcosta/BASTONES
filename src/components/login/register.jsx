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
    const [error, setError] = useState(""); // Manejo de errores
    const [loading, setLoading] = useState(false); // Indicador de carga

    const handleChange = (e) => {
        setRegistro({ ...registro, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar error previo
        setLoading(true); // Mostrar indicador de carga

        // Validación básica antes de enviar los datos
        if (!registro.nombre || !registro.email || !registro.telefono || !registro.password) {
            setError("Por favor, completa todos los campos.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("https://echopath.zapto.org/usuario", registro);
            if (response.status === 201) { // Código 201 indica creación exitosa
                alert("Usuario registrado exitosamente");
                navigate("/login"); // Redirige al login tras el registro
            } else {
                setError("Error inesperado al registrar al usuario.");
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Error desconocido del servidor.");
            } else if (error.request) {
                setError("No se pudo conectar con el servidor. Inténtalo más tarde.");
            } else {
                setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
            }
            console.error("Error al registrar usuario:", error);
        } finally {
            setLoading(false); // Ocultar indicador de carga
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Crear Nuevo Usuario</h1>
                {error && <p className="error-message">{error}</p>} {/* Mostrar mensajes de error */}
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={registro.nombre}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registro.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={registro.telefono}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={registro.password}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
            <button onClick={() => navigate("/login")} className="secondary-button">
                Iniciar Sesión
            </button>
        </div>
    );
};

export default Register;