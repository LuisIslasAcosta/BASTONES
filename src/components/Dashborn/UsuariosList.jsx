import { useState, useEffect } from "react";
import axios from "axios";
import "../../style/asignacionBaston.css";
import * as XLSX from "xlsx";

const Asignaciones = () => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        obtenerAsignaciones();
    }, []);

    const obtenerAsignaciones = () => {
        axios.get("https://3.143.223.115/bastones/bastones_usuarios")
            .then(response => setAsignaciones(response.data))
            .catch(error => console.error("Error al obtener asignaciones:", error));
    };

    const filteredAsignaciones = asignaciones.filter(asignacion =>
        asignacion.usuario_id.toString().includes(searchTerm) ||
        asignacion.baston_id.toString().includes(searchTerm)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAsignaciones = filteredAsignaciones.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAsignaciones.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(asignaciones);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Asignaciones");
        XLSX.writeFile(workbook, "asignaciones.xlsx");
    };

    return (
        <div className="asignaciones-container">
            <h1 className="asignaciones-title">Asignaciones de Bastones</h1>
            <div className="asignaciones-actions">
                <input
                    type="text"
                    placeholder="Buscar por ID de usuario o bastón"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={exportToExcel} className="export-btn">Descargar en Excel</button>
            </div>

            <div className="asignaciones-table-container">
                {filteredAsignaciones.length > 0 ? (
                    <table className="asignaciones-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Bastón</th>
                                <th>Fecha de Asignación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAsignaciones.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.usuario_nombre} (ID: {item.usuario_id})</td>
                                    <td>{item.baston_nombre} (ID: {item.baston_id})</td>
                                    <td>{new Date(item.fecha_asignacion).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data">No hay asignaciones registradas.</p>
                )}
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Asignaciones;
