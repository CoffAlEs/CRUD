// src/components/CrearCliente.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/crearcliente.css';
import { useNavigate } from 'react-router-dom';

const CrearCliente = () => {
    const [newCliente, setNewCliente] = useState({
        expediente: '',
        tipoRegistro: '',
        denominacion: '',
        fechaIngresoSolicitud: '',
        fechaPublicacionSolicitud: '',
        archivoFonetico: '',
        concesion: '',
        vigencia: '',
        observaciones: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        edad: 0,
        curp: '',
        localidad: '',
        origen: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateCurp = (curp) => {
        return curp.length === 18;
    };

    const handleCreateCliente = async () => {
        if (!validateCurp(newCliente.curp)) {
            setError('El CURP debe tener exactamente 18 caracteres.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/clientes', newCliente, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating cliente:', error);
        }
    };

    return (
        <div className="crear-cliente">
            <h2>Crear Cliente</h2>
            <form>
                {Object.keys(newCliente).map(key => (
                    <div key={key} className="form-group">
                        <label>{key}</label>
                        <input
                            type={key === 'fechaIngresoSolicitud' || key === 'fechaPublicacionSolicitud' || key === 'fechaNacimiento' ? 'date' : (key === 'edad' ? 'number' : 'text')}
                            value={newCliente[key]}
                            onChange={(e) => setNewCliente({ ...newCliente, [key]: e.target.value })}
                        />
                    </div>
                ))}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="button" onClick={handleCreateCliente}>Guardar</button>
                <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
            </form>
        </div>
    );
};

export default CrearCliente;
