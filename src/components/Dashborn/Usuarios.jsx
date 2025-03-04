import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/style.css";
import * as XLSX from 'xlsx'; 

const Usuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [usersPerPage] = useState(5); 
    const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

    const obtenerUsuarios = () => {
        axios.get("http://localhost:3000/api/usuarios/")  
            .then(response => {
                setUsuarios(response.data);
                setMostrarUsuarios(true);
            })
            .catch(error => console.error("Error al obtener usuarios:", error));
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(usuarios.length / usersPerPage);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(usuarios); 
        const workbook = XLSX.utils.book_new(); 
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
        XLSX.writeFile(workbook, "usuarios.xlsx");
    };

    const regresar = () => {
        setMostrarUsuarios(false);
    };

    const irAEditar = (id) => {
        navigate(`/usuarios/editar/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/usuarios/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Si es necesario un token de autenticación
            },
            })
            .then((response) => {
            console.log('Usuario eliminado:', response.data);
            // Refresca la lista de usuarios después de eliminar
            obtenerUsuarios();
            })
            .catch((error) => {
            console.error('Error al eliminar el usuario:', error);
            alert('Error al eliminar el usuario');
            });
        };
        

    return (
        <div>
            {!mostrarUsuarios ? (
                <div>
                    <button onClick={obtenerUsuarios} className="load-users-btn">Cargar Usuarios</button>
                </div>
            ) : (
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
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.telefono}</td>
                                        <td>{user.rol_id}</td>
                                        <td>
                                            <button onClick={() => irAEditar(user.id)} className="edit-btn">Editar</button>
                                            <button onClick={() => handleDelete(user.id)} className="delete-btn">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay usuarios registrados.</p>
                    )}

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
                    <button onClick={exportToExcel} className="export-btn">Descargar en Excel</button>
                    <button onClick={regresar} className="back-btn">Regresar</button>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
