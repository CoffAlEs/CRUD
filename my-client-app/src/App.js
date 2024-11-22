import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClienteForm from './components/ClienteForm';
import EditarCliente from './components/EditarCliente';
import CrearCliente from './components/CrearCliente';
import './App.css';
import logo from './logo.png';

function Welcome() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="App-logo" />
        <h1>Base de datos - Alteza</h1>
        {!isLoginPage && (
          <Link to="/login">
            <button className="App-button">Ir al Login</button>
          </Link>
        )}
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cliente/nuevo" element={<ClienteForm />} />
          <Route path="/editar-cliente/:expediente" element={<EditarCliente />} />
          <Route path="/crear-cliente" element={<CrearCliente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
