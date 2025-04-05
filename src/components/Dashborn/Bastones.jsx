import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AgregarBastones from "./BastonesAg";
import Asignaciones from "./UsuariosList";
import "../../style/bastones.css";
import AsignarBaston from "./AsignarBaston";

const Bastones = () => {
    const [bastones, setBastones] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBastones();
    }, []);

    const fetchBastones = async () => {
        try {
            const response = await axios.get("https://3.143.223.115/bastones/bastones", {
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
            await axios.delete(`https://3.143.223.115/bastones/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                        <th>Nombre del Bastón</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bastones.map((baston) => (
                        <tr key={baston.id}>
                        <td>{baston.id}</td>
                        <td>{baston.nombre}</td>
                        <td>
                            <button onClick={() => navigate(`/editar-baston/${baston.id}`)}>Editar</button>
                            <button onClick={() => handleDelete(baston.id)}>Eliminar</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <div className="card bastones-card">
                <h2>Asignar Bastones a Usuarios</h2>
                <AsignarBaston />
            </div>
            <div className="card bastones-card">
                <h2>Bastones Asignados a Usuarios</h2>
                <Asignaciones />
            </div>
            <button onClick={() => navigate("/DashboardAdmin")} className="back-btn">
                Regresar
            </button>
        </div>
    );
};

export default Bastones;
