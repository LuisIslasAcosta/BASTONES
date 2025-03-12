import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/login/register";
import Login from './components/login/login';
import ProtectedRoute from "./components/loginadmin/ProtectedRoute"; 
import DashboardAdmin from './components/Dashborn/DashboardAdmin'
import Welcome from "./components/Principal/Welcome";
import UsuariosEdit from "./components/Dashborn/UsuariosEdit";
import Bastones from "./components/Dashborn/Bastones";
import Usuarios from "./components/Dashborn/Usuarios"; 
import Ubicaciones from "./components/Principal/Ubicaciones";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register/:id" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/usuarios/editar/:id" element={<UsuariosEdit />} />
      <Route path="/bastones" element={<Bastones />} />
      <Route path="/usuarios" element={<Usuarios />} /> {/* Nueva ruta para Usuarios */}
      <Route path="/DashboardAdmin" element={
        <ProtectedRoute>
          <DashboardAdmin /> 
        </ProtectedRoute>
      } />
      <Route path="/Welcome" element={
        <ProtectedRoute>
          <Welcome />  
          <Ubicaciones />
        </ProtectedRoute>
      } />
    </Routes>
  </BrowserRouter>
);
