import PropTypes from 'prop-types';  // Importa PropTypes
import { Navigate } from "react-router-dom";  

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};


// Añadir validación de propiedades
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,  // 'children' puede ser cualquier tipo de nodo React (componente, texto, etc.)
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired  // 'allowedRoles' es un arreglo de strings
};

export default ProtectedRoute;


