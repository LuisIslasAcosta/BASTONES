import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/login/register";
import Login from './components/login/login';
import ProtectedRoute from "./components/loginadmin/ProtectedRoute"; 
import LoginAdmin from './components/loginadmin/login-admin';
import DashboardAdmin from './components/Dashborn/DashboardAdmin'
import Welcome from "./components/Principal/Welcome";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register/:id" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/DashboardAdmin" element={
        <ProtectedRoute>
          <DashboardAdmin /> 
        </ProtectedRoute>
      } />
      <Route path="/Welcome" element={
        <ProtectedRoute>
          <Welcome />  
        </ProtectedRoute>
      } />
    </Routes>
  </BrowserRouter>
);
