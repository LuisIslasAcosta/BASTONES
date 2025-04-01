//Welcome correcto

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/style.css";

const ESP32 = () => {
  const [distancia, setDistancia] = useState(null);
  const [error, setError] = useState(null);

  // Función para obtener la distancia del ESP32
  const fetchDistancia = async () => {
    try {
      const response = await axios.get("https://3.12.166.140/distancia");
      setDistancia(response.data.distancia); // Guardamos la distancia en el estado
    } catch (err) {
      console.error("Error al obtener la distancia:", err);
      setError("Error al obtener la distancia");
    }
  };

  // Usamos useEffect para obtener la distancia cada 2 segundos
  useEffect(() => {
    fetchDistancia();  // Llamamos a la función para obtener la distancia
    const intervalo = setInterval(fetchDistancia, 2000); // Obtener la distancia cada 2 segundos

    return () => clearInterval(intervalo); // Limpiar intervalo cuando el componente se desmonte
  }, []);

  return (
    <div>
      <h1>Distancia medida</h1>
      {error && <p>{error}</p>}
      {distancia !== null ? (
        <p>La distancia medida es: {distancia} cm</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

const WelcomeMessage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

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

  return (
    <div>
      <h1>Bienvenido a nuestro sistema para bastones inteligentes {usuario ? usuario : ""}!</h1>
      <button onClick={handleLogout} className="logout-btn">
        Cerrar sesión
      </button>
      <ESP32 /> {/* Aquí estamos insertando el componente ESP32 dentro del componente Login */}
    </div>
  );
};

export default WelcomeMessage;