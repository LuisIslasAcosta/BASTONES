<<<<<<< HEAD
import { useState, useEffect } from 'react';
import axios from "axios";

const AsignarBaston = () => {
    const [usuarioId, setUsuarioId] = useState("");
    const [bastonId, setBastonId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [bastones, setBastones] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Cargar usuarios y bastones cuando el componente se monte
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/usuario/obtener", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si es necesario, incluir el token
                    }
                });
                setUsuarios(response.data); // Guardamos los usuarios
            } catch (error) {
                setError("Error al obtener los usuarios.");
                console.error(error);
            }
        };

        const fetchBastones = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/bastones/bastones", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si es necesario, incluir el token
                    }
                });
                setBastones(response.data); // Guardamos los bastones
            } catch (error) {
                setError("Error al obtener los bastones.");
                console.error(error);
            }
        };

        fetchUsuarios();
        fetchBastones();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!usuarioId || !bastonId) {
            setError("Debe seleccionar un usuario y un bastón.");
            return;
        }

        const data = {
            usuario_id: usuarioId,
            baston_id: bastonId
        };

        try {
            await axios.post("http://127.0.0.1:5000/bastones/asignar_baston", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,  // Si necesitas token de autorización
                }
            });
            
            setSuccessMessage("Bastón asignado con éxito.");
            setError(""); // Limpiar cualquier error previo
        } catch (error) {
            setSuccessMessage(""); // Limpiar cualquier mensaje de éxito previo
            setError("Hubo un error al asignar el bastón. Intenta de nuevo.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Asignar Bastón</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                    >
                        <option value="">Selecciona un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Bastón:</label>
                    <select
                        value={bastonId}
                        onChange={(e) => setBastonId(e.target.value)}
                    >
                        <option value="">Selecciona un bastón</option>
                        {bastones.map((baston) => (
                            <option key={baston.id} value={baston.id}>
                                {baston.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Asignar Bastón</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
    );
};

export default AsignarBaston;
=======
import { useState, useEffect } from 'react';
import axios from "axios";

const AsignarBaston = () => {
    const [usuarioId, setUsuarioId] = useState("");
    const [bastonId, setBastonId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [bastones, setBastones] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Cargar usuarios y bastones cuando el componente se monte
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get("https://3.143.223.115/usuario/obtener", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si es necesario, incluir el token
                    }
                });
                setUsuarios(response.data); // Guardamos los usuarios
            } catch (error) {
                setError("Error al obtener los usuarios.");
                console.error(error);
            }
        };

        const fetchBastones = async () => {
            try {
                const response = await axios.get("https://3.143.223.115/bastones/bastones", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si es necesario, incluir el token
                    }
                });
                setBastones(response.data); // Guardamos los bastones
            } catch (error) {
                setError("Error al obtener los bastones.");
                console.error(error);
            }
        };

        fetchUsuarios();
        fetchBastones();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!usuarioId || !bastonId) {
            setError("Debe seleccionar un usuario y un bastón.");
            return;
        }

        const data = {
            usuario_id: usuarioId,
            baston_id: bastonId
        };

        try {
            await axios.post("https://3.143.223.115/bastones/asignar_baston", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,  // Si necesitas token de autorización
                }
            });
            
            setSuccessMessage("Bastón asignado con éxito.");
            setError(""); // Limpiar cualquier error previo
        } catch (error) {
            setSuccessMessage(""); // Limpiar cualquier mensaje de éxito previo
            setError("Hubo un error al asignar el bastón. Intenta de nuevo.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Asignar Bastón</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                    >
                        <option value="">Selecciona un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Bastón:</label>
                    <select
                        value={bastonId}
                        onChange={(e) => setBastonId(e.target.value)}
                    >
                        <option value="">Selecciona un bastón</option>
                        {bastones.map((baston) => (
                            <option key={baston.id} value={baston.id}>
                                {baston.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Asignar Bastón</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
    );
};

export default AsignarBaston;
>>>>>>> d24a0203579124947a8d8f238529584af7054bc2
