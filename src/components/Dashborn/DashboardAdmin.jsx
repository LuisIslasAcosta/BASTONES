import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/style.css";

const Login = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/usuarios/")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Error al obtener usuarios:", error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            {usuarios.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.telefono}</td>
                                <td>{user.rol_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay usuarios registrados.</p>
            )}

            <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
        </div>
    );
};

export default Login;
