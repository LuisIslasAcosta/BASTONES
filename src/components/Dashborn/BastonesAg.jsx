import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/style.css";

const AgregarBaston = () => {
    const navigate = useNavigate();
    const [usuarioId, setUsuarioId] = useState("");
    const [modelo, setModelo] = useState("");
    const [fechaAsignacion, setFechaAsignacion] = useState("");
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos
        if (!usuarioId || !modelo || !fechaAsignacion) {
            setError("Todos los campos son obligatorios");
            return;
        }

        // Obtener el token del localStorage
        const token = localStorage.getItem("token");

        // Verificar si hay un token
        if (!token) {
            setError("No se ha encontrado un token válido. Inicie sesión.");
            return;
        }

        // Enviar solicitud POST para crear el bastón
        axios.post("http://localhost:3000/api/bastones", {
            usuario_id: usuarioId,
            modelo: modelo,
            fecha_asignacion: fechaAsignacion
        }, {
            headers: {
                Authorization: `Bearer ${token}`  // Agregar el token al header
            }
        })
        .then(response => {
            console.log("Bastón creado:", response.data);
            navigate("/bastones"); // Redirigir a la lista de bastones
        })
        .catch(error => {
            console.error("Error al crear el bastón:", error);
            setError("Hubo un error al crear el bastón");
        });
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Regresar a Menu" : "Agregar un Baston"}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <h1>Agregar Bastón</h1>
                    {error && <p className="error">{error}</p>}
                    <div>
                        <label htmlFor="usuarioId">Usuario ID</label>
                        <input
                            type="text"
                            id="usuarioId"
                            value={usuarioId}
                            onChange={(e) => setUsuarioId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="modelo">Modelo</label>
                        <input
                            type="text"
                            id="modelo"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaAsignacion">Fecha de Asignación</label>
                        <input
                            type="date"
                            id="fechaAsignacion"
                            value={fechaAsignacion}
                            onChange={(e) => setFechaAsignacion(e.target.value)}
                        />
                    </div>
                    <button type="submit">Agregar Bastón</button>
                    
                </form>
                
            )}
            
        </div>
    );
};

export default AgregarBaston;
