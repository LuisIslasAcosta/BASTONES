import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UsuariosEdit = () => {
    const { id } = useParams(); // Obtener el ID del usuario de la URL
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token'); // Obtener el token JWT de localStorage

    useEffect(() => {
        // Obtener los datos del usuario
        axios.get(`https://3.143.223.115/usuario/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error("Error al obtener los datos del usuario:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://3.143.223.115/usuario/${id}`, user, {
            headers: {
                Authorization: `Bearer ${token}` // Enviar el token JWT en las cabeceras
            }
        })
        .then(() => {
            navigate("/DashboardAdmin"); // Redirigir a la lista de usuarios después de editar
        })
        .catch(error => {
            console.error("Error al actualizar el usuario:", error);
            alert("No autorizado. Por favor, inicia sesión nuevamente.");
        });
    };

    if (!user) return <p>Cargando...</p>;

    return (
        <div>
            <h1>Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={user.telefono}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Rol</label>
                    <input
                        type="text"
                        name="rol_id"
                        value={user.rol_id}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
};

export default UsuariosEdit;