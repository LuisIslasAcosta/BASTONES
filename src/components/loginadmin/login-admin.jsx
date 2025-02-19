import { useState } from "react";
import axios from "axios";

const LoginAdmin = () => {
    const [usuario, setUsuario] = useState({ email: "", password: "" });

    const handleChange = (e) => setUsuario({ ...usuario, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/usuarios/", usuario)
            .then(() => alert("Alumno registrado"))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login de Administrador</h1>
                <input type="email" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={usuario.password} onChange={handleChange} required />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default LoginAdmin;
