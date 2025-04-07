import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/style.css";

const ESP32 = () => {
  const [distancia, setDistancia] = useState(null); // Estado de la distancia
  const [alertaEmitida, setAlertaEmitida] = useState(false); // Control de emisión de alerta
  const [error, setError] = useState(null);
  const [contadorAlertas, setContadorAlertas] = useState(0); // Contador de alertas emitidas

  const emitirVoz = (mensaje) => {
    const speech = new SpeechSynthesisUtterance(mensaje);
    window.speechSynthesis.speak(speech);
  };

  const fetchDatos = async () => {
    try {
      const response = await axios.get("https://3.12.166.140/distancia"); // Ajusta si tu IP cambió
      const nuevosDatos = response.data;

      if (nuevosDatos.distancia !== undefined) {
        setDistancia(nuevosDatos.distancia);

        // Si la distancia es menor a 50 cm y no se ha emitido alerta recientemente
        if (nuevosDatos.distancia < 50 && (!alertaEmitida || contadorAlertas < 2)) {
          emitirVoz("¡Obstáculo detectado a menos de 50 centímetros!");
          setAlertaEmitida(true); // Marcar la alerta como emitida
          setContadorAlertas(contadorAlertas + 1); // Incrementar contador de alertas
        }

        // Resetear la alerta si ya no hay obstáculos cercanos
        if (nuevosDatos.distancia >= 50) {
          setAlertaEmitida(false); // Permitir una nueva alerta en caso de que se detecten nuevos obstáculos
          setContadorAlertas(0); // Reiniciar contador de alertas cuando el obstáculo desaparezca
        }
      } else {
        setError("Error: Datos de distancia no válidos.");
      }
    } catch (err) {
      console.error("Error al obtener los datos:", err);
      setError("Error al obtener los datos");
    }
  };

  useEffect(() => {
    fetchDatos(); // Cargar datos iniciales
    const intervalo = setInterval(fetchDatos, 2000); // Actualizar cada 2 segundos
    return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
  }, []);

  return (
    <div className="sensor-container">
      <h1>Detección de Obstáculos</h1>
      {error && <p className="error">{error}</p>}
      <p>{distancia !== null ? `${distancia} cm` : "Cargando..."}</p>
    </div>
  );
};

const WelcomeMessage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUsuario(decodedToken.nombre);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <h1>Bienvenido a nuestro sistema para bastones inteligentes, {usuario}!</h1>
      <button onClick={handleLogout} className="logout-btn">
        Cerrar sesión
      </button>
      <ESP32 />
    </div>
  );
};

export default WelcomeMessage;
