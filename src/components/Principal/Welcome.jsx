import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/usuario.css";
import 'font-awesome/css/font-awesome.min.css'; // Importar Font Awesome

const ESP32 = () => {
  const [datos, setDatos] = useState({ distancia: null, ir1: null, ir2: null });
  const [error, setError] = useState(null);
  const [alertaMostrada, setAlertaMostrada] = useState(false);
  const [instruccion, setInstruccion] = useState(""); // Estado para la instrucción de voz

  const fetchDatos = async () => {
    try {
      const response = await axios.get("https://3.12.166.140/distancia");
      const nuevosDatos = response.data;
      setDatos(nuevosDatos);

      if (nuevosDatos.distancia <= 50 && !alertaMostrada) {
        // Emitir mensaje de voz para alerta
        const mensaje = new SpeechSynthesisUtterance("⚠ ¡Precaución! Obstáculo detectado a menos de 50 cm.");
        window.speechSynthesis.speak(mensaje);
        setAlertaMostrada(true);
      }

      if (nuevosDatos.distancia > 50 && alertaMostrada) {
        // Si la distancia es mayor a 50 cm, quitar la alerta
        setAlertaMostrada(false);
      }

      // Lógica para determinar las instrucciones de voz
      if (nuevosDatos.ir1 === 1 && nuevosDatos.ir2 === 0) {
        if (instruccion !== "Girar a la derecha") {
          setInstruccion("Girar a la derecha");
          const mensaje = new SpeechSynthesisUtterance("Girar a la derecha");
          window.speechSynthesis.speak(mensaje);
        }
      } else if (nuevosDatos.ir2 === 1 && nuevosDatos.ir1 === 0) {
        if (instruccion !== "Girar a la izquierda") {
          setInstruccion("Girar a la izquierda");
          const mensaje = new SpeechSynthesisUtterance("Girar a la izquierda");
          window.speechSynthesis.speak(mensaje);
        }
      } else if (nuevosDatos.ir1 === 1 && nuevosDatos.ir2 === 1) {
        if (instruccion !== "Sigue derecho") {
          setInstruccion("Sigue derecho");
          const mensaje = new SpeechSynthesisUtterance("Sigue derecho");
          window.speechSynthesis.speak(mensaje);
        }
      } else if (nuevosDatos.ir1 === 0 && nuevosDatos.ir2 === 0) {
        if (instruccion !== "Gira a la izquierda o derecha") {
          setInstruccion("Gira a la izquierda o derecha");
          const mensaje = new SpeechSynthesisUtterance("Gira a la izquierda o derecha");
          window.speechSynthesis.speak(mensaje);
        }
      }
    } catch (err) {
      console.error("Error al obtener los datos:", err);
      setError("Error al obtener los datos");
    }
  };

  useEffect(() => {
    fetchDatos();
    const intervalo = setInterval(fetchDatos, 2000);
    return () => clearInterval(intervalo);
  }, [instruccion]); // Agregar 'instruccion' como dependencia

  return (
    <div>
      <h1>Datos de Sensores</h1>
      {error && <p>{error}</p>}
      {datos.distancia !== null ? (
        <>
          <p>Distancia medida: {datos.distancia} cm</p>
          <p>Sensor IR1: {datos.ir1 === 1 ? "Detectando" : "Libre"}</p>
          <p>Sensor IR2: {datos.ir2 === 1 ? "Detectando" : "Libre"}</p>
          {instruccion && <p>{instruccion}</p>} {/* Mostrar la instrucción */}
        </>
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
        <button onClick={closeSidebar} className="close-btn">X</button> {/* Botón de cerrar */}
        <div className="menu-item">
          
        </div>
        <div className="menu-item">
          
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fa fa-sign-out"></i> {/* Ícono de cerrar sesión */}
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
