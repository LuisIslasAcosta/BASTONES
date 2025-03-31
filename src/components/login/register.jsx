import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/style.css";
import * as XLSX from "xlsx";

const Usuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = () => {
        axios.get("https://3.143.223.115/usuario/obtener")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Error al obtener usuarios:", error));
    };

    // Filtrar usuarios por nombre
    const filteredUsuarios = usuarios.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por nombre
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsuarios.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredUsuarios.length / usersPerPage);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(usuarios);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
        XLSX.writeFile(workbook, "usuarios.xlsx");
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
            console.log("📂 Datos leídos del Excel:", jsonData);
    
            axios.post("http://localhost:3000/api/importacion", { usuarios: jsonData }) // Enviar como objeto con clave 'usuarios'
                .then(response => {
                    console.log("✅ Usuarios guardados:", response.data);
                    obtenerUsuarios();
                })
                .catch(error => {
                    console.error("❌ Error al guardar los usuarios:", error.response?.data || error);
                    alert("Error al guardar los usuarios.");
                });
        };
        reader.readAsArrayBuffer(file);
    };
    

    const irAEditar = (id) => navigate(`/usuarios/editar/${id}`);

    const handleDelete = (id) => {
        axios.delete(`https://3.143.223.115/usuario/obtener${id}`)
            .then(() => obtenerUsuarios())
            .catch(error => {
                console.error("Error al eliminar el usuario:", error);
                alert("Error al eliminar el usuario.");
            });
    };

    return (
        <div className="usuarios-container">
            <h1 className="usuarios-title">Lista de Usuarios</h1>
            <div className="usuarios-actions">
                <input 
                    type="text" 
                    placeholder="Buscar por nombre" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
                    className="search-input" 
                />
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="upload-excel-btn" />
                <button onClick={exportToExcel} className="export-btn">Descargar en Excel</button>
            </div>
            {filteredUsuarios.length > 0 ? (
                <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.id || index}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
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
                <p className="no-users">No hay usuarios registrados.</p>
            )}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <button onClick={() => navigate("/DashboardAdmin")} className="back-btn">Regresar</button>
        </div>
    );
};

export default Usuarios;
