import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeMessage = () => {
    const [usuario, setUsuario] = useState(null);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLocationSaved, setIsLocationSaved] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la ubicación en tiempo real
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (err) => {
                        setError("No se pudo obtener la ubicación.");
                        console.error(err);
                    }
                );
            } else {
                setError("La geolocalización no es soportada por este navegador.");
            }
        };

        getLocation();

        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUsuario(decodedToken.nombre);
        } else {
            setUsuario("Invitado");
        }
    }, []);

    useEffect(() => {
        // Enviar la ubicación al backend cuando se obtienen las coordenadas
        if (location) {
            const token = localStorage.getItem("token");
            const usuarioId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

            if (usuarioId) {
                saveLocation(usuarioId, location.latitude, location.longitude);
            }
        }
    }, [location]);

    const saveLocation = async (usuarioId, latitude, longitude) => {
        try {
            const response = await fetch("https://3.148.234.248/api/ubicaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviar token JWT para autenticación
                },
                body: JSON.stringify({
                    usuario_id: usuarioId,
                    latitud: latitude,
                    longitud: longitude,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsLocationSaved(true);
                console.log("Ubicación guardada con éxito:", data);
            } else {
                console.error("Error al guardar la ubicación:", data);
            }
        } catch (error) {
            console.error("Hubo un problema al guardar la ubicación:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h1>Bienvenido {usuario}!</h1>
            {location ? (
                <p>
                    Ubicación en tiempo real: <br />
                    Latitud: {location.latitude} <br />
                    Longitud: {location.longitude}
                </p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <p>Cargando ubicación...</p>
            )}

            {isLocationSaved && <p>¡Ubicación guardada exitosamente!</p>}

            <div className="logout-container">
                <button onClick={handleLogout} className="logout-btn">
                    <span>🚪</span> Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default WelcomeMessage;
