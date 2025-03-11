import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AgregarBastones from "./BastonesAg";
import "../../style/style.css";

const Bastones = () => {
    const [bastones, setBastones] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBastones();
    }, []);

    const fetchBastones = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/bastones/tod", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setBastones(response.data);
        } catch (error) {
            setError("Hubo un error al obtener los bastones.");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Eliminar bastón
            await axios.delete(`http://localhost:3000/api/bastones/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Si es necesario, pasa el token
                },
            });
            fetchBastones(); // Actualizamos la lista después de eliminar
        } catch (error) {
            setError("Hubo un error al eliminar el bastón.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Bastones</h1>
            {error && <p className="error">{error}</p>}
            
            <div className="card bastones-card">
                    <h2>Agregar Bastones</h2>
                    <AgregarBastones />
                </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario ID</th>
                        <th>Modelo</th>
                        <th>Fecha Asignación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bastones.map((baston) => (
                        <tr key={baston.id}>
                            <td>{baston.id}</td>
                            <td>{baston.usuario_id}</td>
                            <td>{baston.modelo}</td>
                            <td>{baston.fecha_asignacion}</td>
                            <td>
                                <button onClick={() => navigate(`/editar-baston/${baston.id}`)}>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(baston.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate("/DashboardAdmin")} className="back-btn">Regresar</button>
            
        </div>
        
        
    );
};

export default Bastones;
