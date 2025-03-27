import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ubicaciones = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null); // Usuario inicializado en null

  const navigate = useNavigate();

  // Función para obtener las ubicaciones desde la API
  const obtenerUbicaciones = async () => {
    try {
      const response = await axios.get("https://18.224.58.2/ubicaciones");
      setLocations(response.data); // Guardar las ubicaciones obtenidas en el estado
    } catch (error) {
      setError("Error al obtener las ubicaciones.");
      console.error(error);
    }
  };

  // Función para obtener la ubicación en tiempo real y guardarla
  const getLocation = () => {
    setLoading(true);

    if (!usuario) {
      setError("No se ha encontrado un usuario válido.");
      setLoading(false);
      return; // Evitar realizar la solicitud si el usuario no está presente
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Obtener una dirección opcional aquí si es necesario, o puede ser null
          const direccion = "Dirección opcional";  // Aquí podrías utilizar alguna API de geolocalización para obtener la dirección

          // Crear la nueva ubicación mediante la API
          try {
            await axios.post("https://18.224.58.2/ubicaciones", {
              usuario_id: usuario.id, // Asegúrate de tener el ID del usuario
              latitud: latitude,
              longitud: longitude,
              direccion: direccion,  // Si la dirección no la necesitas, puedes dejarla como null o eliminarla
              baston_id: null, // Asumiendo que baston_id no es obligatorio, si lo necesitas, añádelo
            });

            // Después de crear la ubicación, actualizamos la lista de ubicaciones
            obtenerUbicaciones();  // Vuelve a cargar las ubicaciones después de crear una nueva

            setLoading(false);
          } catch (error) {
            console.error("Error al guardar la ubicación:", error);
            setError("Error al guardar la ubicación.");
            setLoading(false);
          }
        },
        (err) => {
          setError("No se pudo obtener la ubicación.");
          console.error(err);
          setLoading(false);
        }
      );
    } else {
      setError("La geolocalización no es soportada por este navegador.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Obtener las ubicaciones al cargar el componente
    obtenerUbicaciones();

    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUsuario(decodedToken); // Asumimos que el token contiene el usuario
    } else {
      setUsuario({ id: 1, nombre: "Invitado" }); // Fallback en caso de no encontrar el token
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Ubicaciones de {usuario ? usuario.nombre : "Invitado"}</h1>

      {loading && <p>Obteniendo ubicación...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {locations.map((loc, index) => (
          <li key={index}>
            <p><strong>Ubicación {index + 1}:</strong></p>
            <p>Latitud: {loc.latitud}</p>
            <p>Longitud: {loc.longitud}</p>
            <p>Hora: {new Date(loc.timestamp).toLocaleString()}</p>
            {/* Si deseas mostrar la dirección, añade esto */}
            <p>Dirección: {loc.direccion || "No disponible"}</p>
          </li>
        ))}
      </ul>

      <div className="logout-container">
        <button onClick={handleLogout} className="logout-btn">
          <span>🚪</span> Cerrar sesión
        </button>
      </div>

      <button onClick={getLocation} className="add-location-btn">
        Agregar ubicación
      </button>
    </div>
  );
};

export default Ubicaciones;
