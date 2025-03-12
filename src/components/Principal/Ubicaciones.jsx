import { useState, useEffect } from 'react';

const Ubicaciones = () => {
  // Estado para almacenar las ubicaciones
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    // Función para obtener la ubicación actual
    const getLocation = () => {
        setLoading(true);

        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;

            // Almacenar la ubicación en el estado
            setLocations((prevLocations) => [
                ...prevLocations,
                { latitude, longitude, timestamp: new Date().toISOString() },
            ]);

            setLoading(false);
            },
            (error) => {
            console.error("Error al obtener la ubicación: ", error);
            setLoading(false);
            }
        );
        } else {
        alert('La geolocalización no es compatible con este navegador.');
        setLoading(false);
        }
    };

    // Llamar a getLocation cada vez que el componente se monta
    useEffect(() => {
        // Obtiene la ubicación automáticamente al montar el componente
        const intervalId = setInterval(() => {
        getLocation();
        }, 100000); // Obtener la ubicación cada 10 segundos

        return () => clearInterval(intervalId); // Limpiar intervalo cuando se desmonte el componente
    }, []);

    return (
        <div>
        <h1>Ubicaciones Guardadas</h1>

        {loading && <p>Obteniendo ubicación...</p>}

        <ul>
            {locations.map((loc, index) => (
            <li key={index}>
                <p>
                <strong>Ubicación {index + 1}:</strong>
                </p>
                <p>Latitud: {loc.latitude}</p>
                <p>Longitud: {loc.longitude}</p>
                <p>Hora: {new Date(loc.timestamp).toLocaleString()}</p>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Ubicaciones;
