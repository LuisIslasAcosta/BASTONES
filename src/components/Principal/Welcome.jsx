import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/usuario.css";
import 'font-awesome/css/font-awesome.min.css'; // Importar Font Awesome

const ESP32 = () => {
  const [datos, setDatos] = useState({ distancia: null }); // Solo manejar distancia
  const [error, setError] = useState(null); // Estado para errores
  const [alertaMostrada, setAlertaMostrada] = useState(false); // Control de alertas únicas

  const fetchDatos = async () => {
    try {
      const response = await axios.get("https://3.12.166.140/distancia"); // Cambiar a tu IP real si es diferente
      const nuevosDatos = response.data;
      setDatos(nuevosDatos);

      // Lógica para la alerta de distancia
      if (nuevosDatos.distancia <= 50 && !alertaMostrada) {
        const mensaje = new SpeechSynthesisUtterance("⚠ ¡Precaución! Obstáculo detectado a menos de 50 cm.");
        window.speechSynthesis.speak(mensaje);
        setAlertaMostrada(true); // Marcar la alerta como mostrada
      }

      if (nuevosDatos.distancia > 50 && alertaMostrada) {
        setAlertaMostrada(false); // Resetear alerta para próximos obstáculos
      }
    } catch (err) {
      console.error("Error al obtener los datos:", err);
      setError("Error al obtener los datos");
    }
  };

  useEffect(() => {
    fetchDatos(); // Llamar a la función para obtener datos al inicio
    const intervalo = setInterval(fetchDatos, 2000); // Actualizar cada 2 segundos
    return () => clearInterval(intervalo); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div>
      <h1>Detección de Obstáculos</h1>
      {error && <p>{error}</p>}
      {datos.distancia !== null ? (
        <p>Distancia medida: {datos.distancia} cm</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

const WelcomeMessage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUsuario(decodedToken.nombre);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div>
      <button onClick={toggleSidebar} className="toggle-btn">☰</button>

      <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        <button onClick={closeSidebar} className="close-btn">X</button>
        <div className="menu-item">Opciones</div>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fa fa-sign-out"></i>
          Cerrar sesión
        </button>
      </div>

      <div className={`main-content ${sidebarVisible ? "shifted" : ""}`}>
        <h1>Bienvenido a nuestro sistema para bastones inteligentes {usuario ? usuario : ""}!</h1>
        <ESP32 />
      </div>
    </div>
  );
};

export default WelcomeMessage;