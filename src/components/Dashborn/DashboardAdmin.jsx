import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../style/dashboard-admin.css";
import UsuariosGrafico from "./UsuariosGrafico";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faWalking, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

const DashboardAdmin = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = () => {
        axios.get("https://3.143.223.115/usuario/obtener")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Error al obtener usuarios:", error));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
    };

    return (
        <div className="dashboard-container">
            {/* Barra lateral */}
            <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
                <button onClick={closeSidebar} className="close-btn">X</button>
                <div></div><div></div>
                <div className="menu-item">
                    <button onClick={() => navigate("/usuarios")}>
                        <FontAwesomeIcon icon={faUsers} /> Usuarios
                    </button>
                </div>
                <div className="menu-item">
                    <button onClick={() => navigate("/bastones")}>
                        <FontAwesomeIcon icon={faWalking} /> Bastones
                    </button>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                </button>
            </div>

            {/* Contenido principal */}
            <div className={`main-content ${sidebarVisible ? "shifted" : ""}`}>
                <button onClick={toggleSidebar} className="toggle-btn">
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <header className="dashboard-header">
                    <h1 className="dashboard-title">Panel de Administración</h1>
                </header>

                <div className="dashboard-cards-container">
                    <div className="card usuarios-card">
                        <h2 className="card-title">Usuarios</h2>
                        <button onClick={() => navigate("/usuarios")} className="navigate-btn">Ver Usuarios</button>
                    </div>

                    <div className="card bastones-card">
                        <h1>Bastones</h1>
                        <button onClick={() => navigate("/bastones")} className="navigate-btn">Ver Bastones</button>
                    </div>
                </div>

                {/* Mostrar gráfico de usuarios */}
                <div className="grafico-container">
                    <h2>Gráfico de Usuarios</h2>
                    <UsuariosGrafico usuarios={usuarios} /> {/* Pasar los usuarios al gráfico */}
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
