import { useNavigate } from "react-router-dom";
import "../../style/style.css";

const DashboardAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
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

            <div className="logout-container">
                <button onClick={handleLogout} className="logout-btn">
                    <span>🚪</span> Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default DashboardAdmin;
