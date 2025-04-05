import { useState, useEffect } from 'react';
import axios from "axios";
import "../../style/asignarBaston.css";

const AsignarBaston = () => {
    const [usuarioId, setUsuarioId] = useState("");
    const [bastonId, setBastonId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [bastones, setBastones] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get("https://3.12.166.140/usuario/obtener", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setUsuarios(response.data);
            } catch (error) {
                setError("Error al obtener los usuarios.");
                console.error(error);
            }
        };

        const fetchBastones = async () => {
            try {
                const response = await axios.get("https://3.12.166.140/bastones/bastones", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setBastones(response.data);
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
            await axios.post("https://3.12.166.140/bastones/asignar_baston", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            
            setSuccessMessage("✅ Bastón asignado con éxito.");
            setError("");
        } catch (error) {
            setSuccessMessage("");
            setError("❌ Hubo un error al asignar el bastón. Intenta de nuevo.");
            console.error(error);
        }
    };

    return (
        <div className="asignar-container">
            <h2 className="asignar-title">Asignar Bastón</h2>
            <form onSubmit={handleSubmit} className="asignar-form">
                <div className="form-group">
                    <label>Usuario:</label>
                    <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
                        <option value="">Selecciona un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Bastón:</label>
                    <select value={bastonId} onChange={(e) => setBastonId(e.target.value)}>
                        <option value="">Selecciona un bastón</option>
                        {bastones.map((baston) => (
                            <option key={baston.id} value={baston.id}>
                                {baston.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="asignar-btn">Asignar Bastón</button>
            </form>
            {error && <p className="mensaje error">{error}</p>}
            {successMessage && <p className="mensaje success">{successMessage}</p>}
        </div>
    );
};

export default AsignarBaston;
