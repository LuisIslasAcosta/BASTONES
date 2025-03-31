import { useState } from "react";
import axios from "axios";
import "../../style/style.css";

const AgregarBaston = () => {
    const [nombre, setNombre] = useState(""); 
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [showForm, setShowForm] = useState(false);  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre) {
            setError("El nombre del bastón es obligatorio");
            return;
        }

        axios.post("http://localhost:5000/bastones/create_baston", {
            nombre: nombre 
        }, {
            headers: {
            }
        })
        .then(response => {
            console.log("Bastón creado:", response.data);
            setMensajeExito("¡Bastón creado con éxito!");
            
            setTimeout(() => {
                window.location.reload(); 
            }, 2000);  
        })
        .catch(error => {
            console.error("Error al crear el bastón:", error);
            setError("Hubo un error al crear el bastón");
        });
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Regresar a Menu" : "Agregar un Bastón"}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <h1>Agregar Bastón</h1>
                    {error && <p className="error">{error}</p>}
                    {mensajeExito && <p className="exito">{mensajeExito}</p>}  
                    <div>
                        <label htmlFor="nombre">Nombre del Bastón</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                    </div>
                    <button type="submit">Agregar Bastón</button>
                </form>
            )}
        </div>
    );
};

export default AgregarBaston;
