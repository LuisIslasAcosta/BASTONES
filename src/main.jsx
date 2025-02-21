import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/login/register";
import Login from './components/login/login';
import LoginAdmin from './components/loginadmin/login-admin';
import DashboardAdmin from './components/Dashborn/DashboardAdmin'
import Welcome from "./components/Principal/Welcome";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register/:id" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loginadmin" element={<LoginAdmin />} />
      <Route path="/dashboard" element={<DashboardAdmin />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  </BrowserRouter>
);
