import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../logo.png'; // Importa el logo aquí

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <h2 className="login-title">Ingresemos</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
